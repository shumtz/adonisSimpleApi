const User = use('App/Models/User');

const {
  validateAll,
} = use('Validator');

class UserController {
  async login({
    auth,
    request,
    response,
  }) {
    try {
      const validation = await validateAll(request.all(), {
        email: 'required',
        password: 'required',
      });

      if (validation.fails()) {
        return response.redirect('login');
      }

      const {
        email,
        password,
      } = request.all();
      const login = await auth.attempt(email, password);

      if (login) {
        return response.status(200).redirect('/dashboard');
      }
    } catch (error) {
      return response.status(500).send({
        error: `${error}`,
      });
    }
  }

  async create({
    request,
    response,
  }) {
    const data = request.only(['username', 'email', 'password']);
    await User.create(data);

    return response.status(200).redirect('/login');
  }

  async show({
    auth,
    params,
    response,
  }) {
    try {
      if (auth.user.id !== Number(params.id)) {
        return response.status(401).json({
          status: 401,
          message: 'Unauthorized',
        });
      }

      return response.json({
        Username: auth.user.username,
        Email: auth.user.email,
        Created: auth.user.created_at,
      });
    } catch (error) {
      response.status('500').send(`error in ${error}`);
    }
  }
}

module.exports = UserController;
