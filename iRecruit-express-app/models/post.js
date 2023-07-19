import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postDate : {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// export const Post = sequelize.define('Post', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   categories: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false
//   },
//   numOfApplicants: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   recruiters: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false
//   }
// });