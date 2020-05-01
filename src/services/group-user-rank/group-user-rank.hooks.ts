import * as commonHooks from "feathers-hooks-common";

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
    create: [],
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
