import { DataTypes, Sequelize, Model } from 'sequelize';

/**
 * FavoriteBook model links Users and Books for saved favorites.
 */
export class FavoriteBook extends Model {}

export function FavoriteBookFactory(sequelize: Sequelize): typeof FavoriteBook {
  FavoriteBook.init(
    {
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
    },
    {
      tableName: 'favorite_books', // Table name in database
      sequelize,
      timestamps: false, // No createdAt/updatedAt needed
    }
  );

  return FavoriteBook;
}
