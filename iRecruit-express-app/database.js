import { Sequelize } from 'sequelize';
import memcache from './memcache';
import { User } from './models';

export const sequelize = new Sequelize('capstone', 'henrywis', '@Henrywis1', {
  host: 'localhost',
  dialect: 'postgres'
});


// Constant for 5 minutes in milliseconds
const FIVE_MINUTES = 5 * 60 * 1000;

export async function fetchUserDataFromDatabase(userId) {
  // Check if data is in cache
  const cachedData = memcache.get(`user:${userId}`);

  if (cachedData) {
    // Data found in cache, return it
    return Promise.resolve(cachedData);
  }

  try {
    // Fetch user data from the database using Sequelize
    const userData = await User.findOne({ where: { id: userId } });

    if (!userData) {
      return Promise.reject(new Error('User not found'));
    }

    // Cache the fetched data with an expiration (5 minutes)
    memcache.set(`user:${userId}`, userData, Date.now() + FIVE_MINUTES);

    return Promise.resolve(userData);
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error('Error fetching user data'));
  }
}