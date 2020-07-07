const Task = use('App/Models/Task');
const { validateAll } = use('Validator');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller
 for interacting with lists
 */
class ListController {
  async index() {
    const task = Task.all();
    return task;
  }

  async create({ request, response }) {
    try {
      const validation = await validateAll(request.all(), {
        task: 'required',
      });

      if (validation.fails()) {
        return response.status(401).send({ message: validation.messages() });
      }

      const taskCreate = request.only(['task']);
      const create = await Task.create(taskCreate);

      return create;
    } catch (err) {
      return response.status(500).send({ error: `${err}` });
    }
  }

  async show({
    params,
  }) {
    const taskUpdate = await Task.query().where('id', params.id).firstOrFail();

    return taskUpdate;
  }

  async destroy({ params, response }) {
    const taskDelete = await Task.query().where('id', params.id).firstOrFail();

    await taskDelete.delete();

    return response.json({
      status: 'sucess',
      message: 'Task delete',
      data: taskDelete,
    });
  }
}

module.exports = ListController;
