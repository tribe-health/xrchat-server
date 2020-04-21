import express from 'express'
import { ServiceAddons } from '@feathersjs/feathers'
import multer from 'multer'
import StorageProvider from '../../storage/storageprovider'
import blobService from 'feathers-blob'

import { Application } from '../../declarations'
import { Upload } from './upload.class'
import hooks from './upload.hooks'
import createService from 'feathers-sequelize'

const multipartMiddleware = multer()

declare module '../../declarations' {
  interface ServiceTypes {
    'upload': Upload & ServiceAddons<any>
  }
}

export default (app: Application): void => {
  const provider = new StorageProvider()
  const paginate = app.get('paginate')

  const options = {
    name: 'upload',
    paginate
  }

  app.use('/upload',
    multipartMiddleware.single('file'),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (req?.feathers) {
        req.feathers.file = (req as any).file
        next()
      }
    },
    blobService({ Model: provider.getStorage() }),
    createService(options)
  )

  const service = app.service('upload')

  service.hooks(hooks)
}
