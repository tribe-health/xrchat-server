import getScene from '../../hooks/get-scene'
import * as commonHooks from "feathers-hooks-common";

// Don't remove this comment. It's needed to format import lines nicely.

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
    get: [getScene()],
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
