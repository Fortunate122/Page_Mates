import { DataTypes, Model } from 'sequelize';
/**
 * Book model definition extending Sequelize Model.
 */
export class Book extends Model {
}
/**
 * BookFactory function initializes the Book model with Sequelize.
 */
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
        tableName: 'books', // Table name in database
        sequelize,
        timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
    });
    return Book;
}
