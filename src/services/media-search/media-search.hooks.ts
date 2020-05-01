import { disallow } from 'feathers-hooks-common'
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
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()]
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
