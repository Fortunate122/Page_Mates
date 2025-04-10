import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { BookFactory } from './book.js';
import { FavoriteBookFactory } from './favoriteBook.js';
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL)
    : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
            decimalNumbers: true,
        },
    });
const User = UserFactory(sequelize);
const BookModel = BookFactory(sequelize);
const FavoriteBookModel = FavoriteBookFactory(sequelize);
User.belongsToMany(BookModel, { through: FavoriteBookModel, foreignKey: 'userId' });
BookModel.belongsToMany(User, { through: FavoriteBookModel, foreignKey: 'bookId' });
BookModel.hasMany(FavoriteBookModel, { foreignKey: 'bookId' });
FavoriteBookModel.belongsTo(BookModel, { foreignKey: 'bookId' });
export { sequelize, User, BookModel as Book, FavoriteBookModel as FavoriteBook };
