import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Post } from './models/index.js';
import { sequelize } from './database.js';
import { Application } from './models/application.js';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/users.json'), 'utf8'));
const applicationData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/applications.json'), 'utf8'));

export const seedDatabase = async (category) => {
  try {

    console.log('Seeding database...');
    // Sync all models that aren't already in the database
    await sequelize.sync({ alter: true });

    // Fetch the posts data from the API
    const response = await fetch(`https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=${category}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f',
        'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com',
      },
    });
    const data = await response.json();
    const postData = data.data;

    // Then seed the User and Post data
    await User.bulkCreate(userData);
    console.log('User data has been seeded!');

    await Post.bulkCreate(postData);
    console.log('Post data has been seeded!');

    await Application.bulkCreate(applicationData);
    console.log('Application data has been seeded!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
    console.log('Seeding completed.');
  }
};