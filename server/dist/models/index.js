import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { BookFactory } from './book.js';
import { FavoriteBookFactory } from './favoriteBook.js';
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserFactory(sequelize);
const Book = BookFactory(sequelize);
const FavoriteBook = FavoriteBookFactory(sequelize);
User.belongsToMany(Book, { through: FavoriteBook, foreignKey: 'userId' });
Book.belongsToMany(User, { through: FavoriteBook, foreignKey: 'bookId' });
export { sequelize, User, Book, FavoriteBook };
