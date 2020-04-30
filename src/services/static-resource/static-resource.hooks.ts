import { HookContext } from '@feathersjs/feathers'
import dauria from 'dauria'
import removeRelatedResources from '../../hooks/remove-related-resources'

export default {
  before: {
    all: [],
    find: [],
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