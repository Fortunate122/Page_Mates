import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.bulkCreate([
        {
            username: 'JollyGuru',
            email: 'jollyguru@example.com', // ✅ Added email
            password: 'password'
        },
        {
            username: 'SunnyScribe',
            email: 'sunnyscribe@example.com', // ✅ Added email
            password: 'password'
        },
        {
            username: 'RadiantComet',
            email: 'radiantcomet@example.com', // ✅ Added email
            password: 'password'
        },
    ], { individualHooks: true });
};
