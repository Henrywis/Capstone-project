import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('capstone', 'henrywis', '@Henrywis1', {
  host: 'localhost',
  dialect: 'postgres'
});