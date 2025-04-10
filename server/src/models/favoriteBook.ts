import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Book } from './book.js';

interface FavoriteBookAttributes {
  id: number;
  userId: number;
  bookId: number;
}

interface FavoriteBookCreationAttributes extends Optional<FavoriteBookAttributes, 'id'> {}

export class FavoriteBook extends Model<FavoriteBookAttributes, FavoriteBookCreationAttributes>
  implements FavoriteBookAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;

  // ✅ Add associated Book type
  public Book?: Book;
}

export function FavoriteBookFactory(sequelize: Sequelize): typeof FavoriteBook {
  FavoriteBook.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {
      tableName: 'favorite_books',
      sequelize,
    }
  );

  // ✅ Define association
  FavoriteBook.belongsTo(Book, { foreignKey: 'bookId' });

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
