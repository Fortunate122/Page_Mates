import { DataTypes, Model } from 'sequelize';
import { Book } from './book.js';
export class FavoriteBook extends Model {
}
export function FavoriteBookFactory(sequelize) {
    FavoriteBook.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: DataTypes.INTEGER,
        bookId: DataTypes.INTEGER,
    }, {
        tableName: 'favorite_books',
        sequelize,
    });
    FavoriteBook.belongsTo(Book, { foreignKey: 'bookId' });
    return FavoriteBook;
}
