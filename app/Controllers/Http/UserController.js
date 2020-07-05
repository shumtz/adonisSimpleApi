'use strict'

const User = use('App/Models/User')

const {
    validateAll
} = use('Validator')

class UserController {
    async login({
        auth,
        request,
        response
    }) {
        try {

            const validation = await validateAll(request.all(), {
                email: 'required',
                password: 'required'
            })

            if (validation.fails()) {
                return response.status(401).send({
                    message: validation.messages()
                })
            }

            const {
                email,
                password
            } = request.all()
            const login = await auth.attempt(email, password)


            await auth.check()


            if (login) {
                return response.status(200).redirect('/dashboard')
            }

        } catch (e) {
            return response.status(500).send({
                error: `${e}`
            });;
        }
    }

    async create({
        request,
        response,
        auth
    }) {
        const data = request.only(["username", "email", "password"])
        const create = await User.create(data)

        return 'Registered successfully'

        return response.json({
            "status": 200,
            "message": "Usuario criado"
        })
    }

    async show({
        auth,
        params,
        response
    }) {
        try {

            if (auth.user.id !== Number(params.id)) {
                return response.status(401).json({
                    "status": 401,
                    "message": "Unauthorized"
                })
            }

            return response.json({
                "Username": auth.user.username,
                "E-mail": auth.user.email,
                "Created": auth.user.created_at
            })
            return auth.user
        } catch (e) {
            response.send(e)
        }
    }
}

module.exports = UserController