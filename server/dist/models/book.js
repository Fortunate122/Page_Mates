import { DataTypes, Model } from 'sequelize';
export class Book extends Model {
}
export function BookFactory(sequelize) {
    Book.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authors: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        googleBookId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'books',
        sequelize,
        timestamps: true,
    });
    return Book;
}
