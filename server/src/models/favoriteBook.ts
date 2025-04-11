// server/src/models/favoriteBook.ts
import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import type { Book } from './book.js'; // 👈 safe type-only import to avoid circular dependency

interface FavoriteBookAttributes {
  id: number;
  userId: number;
  bookId: number;
}

interface FavoriteBookCreationAttributes extends Optional<FavoriteBookAttributes, 'id'> {}

export class FavoriteBook extends Model<
  FavoriteBookAttributes,
  FavoriteBookCreationAttributes
> implements FavoriteBookAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public Book?: Book; // for eager loading
}

export function FavoriteBookFactory(sequelize: Sequelize): typeof FavoriteBook {
  FavoriteBook.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'favorite_books',
      sequelize,
      modelName: 'FavoriteBook',
      name: {
        singular: 'favoriteBook',
        plural: 'favoriteBooks',
      },
    }
  );

  return FavoriteBook;
}





// import { DataTypes, Sequelize, Model } from 'sequelize';

// /**
//  * FavoriteBook model links Users and Books for saved favorites.
//  */
// export class FavoriteBook extends Model {}

// export function FavoriteBookFactory(sequelize: Sequelize): typeof FavoriteBook {
//   FavoriteBook.init(
//     {
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       bookId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//     },
//     {
//       tableName: 'favorite_books', // Table name in database
//       sequelize,
//       timestamps: false, // No createdAt/updatedAt needed
//     }
//   );

//   return FavoriteBook;
// }
