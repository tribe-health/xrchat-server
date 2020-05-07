// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize'
import { Application } from '../declarations'
import generateShortId from '../util/generate-short-id'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const project = sequelizeClient.define('project', {
    project_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    project_sid: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: () => generateShortId(8),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by_account_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    project_owned_file_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    thumbnail_owned_file_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    scene_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_scene_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_scene_listing_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount (options: any) {
        options.raw = true
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  (project as any).associate = (models: any) => {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    (project as any).belongsTo(models.user, { foreignKey: 'created_by_account_id' });
    (project as any).belongsToMany(models.asset, { foreignKey: 'project_id', through: models.project_asset });

    (project as any).belongsTo(models.owned_file, { foreignKey: 'project_owned_file_id', targetKey: 'owned_file_id', as: 'project_owned_file' });
    (project as any).belongsTo(models.owned_file, { foreignKey: 'thumbnail_owned_file_id', targetKey: 'owned_file_id', as: 'thumbnail_owned_file' });
    (project as any).belongsTo(models.scene, { foreignKey: 'scene_id' });
    (project as any).belongsTo(models.scene, { foreignKey: 'parent_scene_id', targetKey: 'scene_id', as: 'parent_scene' });
    (project as any).belongsTo(models.scene_listing, { foreignKey: 'parent_scene_listing_id', targetKey: 'scene_listing_id' })
  }

  return project
}
