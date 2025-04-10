import { DataTypes, Model } from 'sequelize';
import { FavoriteBook } from './favoriteBook.js';
export class Book extends Model {
}
export function BookFactory(sequelize) {
    Book.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: DataTypes.STRING,
        authors: DataTypes.STRING,
        description: DataTypes.TEXT,
        thumbnail: DataTypes.STRING,
        googleBookId: DataTypes.STRING,
    }, {
        tableName: 'books',
        sequelize,
    });
    Book.hasMany(FavoriteBook, { foreignKey: 'bookId' });
    return Book;
}
