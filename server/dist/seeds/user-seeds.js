import { User } from '../models/user.js';
/**
 * Seed initial users into the database.
 * Passwords will be hashed automatically if you have hooks set up in your User model.
 */
export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
    ], { individualHooks: true }); // ✅ This ensures each password is hashed individually
};
