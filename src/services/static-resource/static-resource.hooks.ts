import { HookContext } from '@feathersjs/feathers'
import dauria from 'dauria'
import removeRelatedResources from '../../hooks/remove-related-resources'
import addAssociations from '../../hooks/add-associations'
import * as commonHooks from "feathers-hooks-common";

export default {
  before: {
    all: [
      commonHooks.iff(
          process.env.SERVER_MODE === 'media' || process.env.SERVER_MODE === 'realtime',
          commonHooks.disallow('external')
      )
    ],
    find: [addAssociations({
      models: [
        {
          model: 'attribution',
          as: 'attribution'
        }
      ]
    })],
    get: [],
    create: [
      (context: HookContext) => {
        if (!context.data.uri && context.params.file) {
          const file = context.params.file
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype)
          const mimeType = context.data.mime_type ?? file.mimetype
          const name = context.data.name ?? file.name
          context.data = { uri: uri, mimeType: mimeType, name: name }
        }
        return context
      }
    ],
    update: [],
    patch: [],
    remove: [removeRelatedResources()]
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
