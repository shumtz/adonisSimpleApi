'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

class UnAuthorizedException extends LogicalException {
  async handle(error, {
    response,
    session
  }) {
    if (error.name === 'InvalidSessionException') {
        response.send(view.route('login'))

        return
    }
  }
}

module.exports = UnAuthorizedException
