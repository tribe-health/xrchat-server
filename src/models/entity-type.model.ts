import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../declarations'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const entityType = sequelizeClient.define('entity_type', {
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

  (entityType as any).assocate = (models: any) => {
    (entityType as any).hasMany(models.entity, { foreignKey: 'type' })
  }
  return entityType
}
