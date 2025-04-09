import { seedUsers } from './user-seeds.js';
import { seedBooks } from './book-seeds.js';
import { sequelize } from '../models/index.js';
/**
 * Seed all data into the database.
 * - First, sync database (drop and recreate tables).
 * - Then, seed users and books.
 */
const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\n----- DATABASE SYNCED -----\n');
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');
        await seedBooks();
        console.log('\n----- BOOKS SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
