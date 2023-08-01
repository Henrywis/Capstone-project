import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password'
  },
  // New fields
  status: {
    type: DataTypes.ENUM('Student', 'Not a student'),
    allowNull: false,
    field: 'status'
  },
  raceEthnicity: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: 'raceEthnicity'
  },
  genderSexuality: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    field: 'genderSexuality'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
  }
});
