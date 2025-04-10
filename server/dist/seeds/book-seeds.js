import { Book } from '../models/book.js';
export const seedBooks = async () => {
    await Book.bulkCreate([
        {
            title: 'Atomic Habits',
            authors: 'James Clear',
            description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.',
            thumbnail: 'https://example.com/atomic-habits.jpg',
            googleBookId: 'abcd1234',
        },
        {
            title: 'The Alchemist',
            authors: 'Paulo Coelho',
            description: 'A novel about pursuing your dreams.',
            thumbnail: 'https://example.com/the-alchemist.jpg',
            googleBookId: 'efgh5678',
        },
        {
            title: 'To Kill a Mockingbird',
            authors: 'Harper Lee',
            description: 'A novel about the serious issues of rape and racial inequality.',
            thumbnail: 'https://example.com/mockingbird.jpg',
            googleBookId: 'ijkl9012',
        },
        {
            title: '1984',
            authors: 'George Orwell',
            description: 'A dystopian social science fiction novel and cautionary tale.',
            thumbnail: 'https://example.com/1984.jpg',
            googleBookId: 'mnop3456',
        },
        {
            title: 'Sapiens: A Brief History of Humankind',
            authors: 'Yuval Noah Harari',
            description: 'Explores the history and impact of Homo sapiens.',
            thumbnail: 'https://example.com/sapiens.jpg',
            googleBookId: 'qrst7890',
        },
    ]);
};
