
import * as authentication from '@feathersjs/authentication'
import * as commonHooks from 'feathers-hooks-common'

const { authenticate } = authentication.hooks

const isAction = (...params: any): any => {
  const args = Array.from(params)
  return (hook: any) => args.includes(hook.data.action)
}

export default {
  before: {
    all: [
      commonHooks.iff(
        process.env.SERVER_MODE === 'media' || process.env.SERVER_MODE === 'realtime',
        commonHooks.disallow('external')
      )
    ],
    find: [],
    get: [],
    create: [
      commonHooks.iff(
        isAction('passwordChange', 'identityChange'),
        authenticate('jwt')
      )
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
