import { Sequelize } from 'sequelize'
import { Application } from './declarations'
// @ts-ignore
import seederConfig from './seeder-config'
// @ts-ignore
import seeder from 'feathers-seeder'
import { db } from './db-config'

console.log('db config:', db)

export default (app: Application): void => {
  const { forceRefresh } = db

  const sequelize = new Sequelize({
    ...db,
    logging: forceRefresh,
    define: {
      freezeTableName: true
    }
  })
  const oldSetup = app.setup

  app.set('sequelizeClient', sequelize)

  app.setup = function (...args: any) {
    // Sync to the database
    app.set('sequelizeSync',
      sequelize.sync({ force: forceRefresh })
        .then(() => {
          // @ts-ignore
          app.configure(seeder(seederConfig)).seed()
        })
        .catch(console.error)
    )
    return oldSetup.apply(this, args)
  }
}
