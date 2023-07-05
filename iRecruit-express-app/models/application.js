import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Application = sequelize.define('Application', {
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});