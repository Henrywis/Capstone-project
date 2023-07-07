import bcrypt from 'bcrypt';
import { User }from './user.js'; 

async function migrateUsers() {
  try {
    const users = await User.findAll(); // Retrieve all users from the database

    for (const user of users) {
      // Hash the user's existing plain-text password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Update the user's password entry with the hashed value
      await user.update({ password: hashedPassword });
    }

    console.log('User migration completed successfully.');
  } catch (error) {
    console.error('User migration failed:', error);
  }
}

migrateUsers(); // Execute the migration script