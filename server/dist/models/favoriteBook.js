import { DataTypes, Model } from 'sequelize';
export class FavoriteBook extends Model {
}
export function FavoriteBookFactory(sequelize) {
    FavoriteBook.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        tableName: 'favorite_books',
        sequelize,
        timestamps: false,
    });
    return FavoriteBook;
}
