import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../declarations'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const collectionType = sequelizeClient.define('collection_type', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    }
  }, {
    hooks: {
      beforeCount (options: any) {
        options.raw = true
      }
    },
    timestamps: false
  });

  (collectionType as any).assocate = (models: any) => {
    (collectionType as any).hasMany(models.collection, { foreignKey: 'type' })
  }

  return collectionType
}
