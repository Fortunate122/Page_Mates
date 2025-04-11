import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { FavoriteBook } from './favoriteBook.js';

interface BookAttributes {
  id: number;
  title: string;
  authors: string;
  description: string;
  thumbnail: string;
  googleBookId: string;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

export class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public authors!: string;
  public description!: string;
  public thumbnail!: string;
  public googleBookId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public FavoriteBooks?: FavoriteBook[]; // for eager loading
}

export function BookFactory(sequelize: Sequelize): typeof Book {
  Book.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: DataTypes.STRING,
      authors: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      googleBookId: DataTypes.STRING,
    },
    {
      tableName: 'books',
      sequelize,
      modelName: 'Book',
      name: {
        singular: 'book',
        plural: 'books',
      },
    }
  );

  // Book.hasMany(FavoriteBook, { foreignKey: 'bookId' });

  return Book;
}




// import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// /**
//  * BookAttributes interface defines the shape of the Book model.
//  */
// interface BookAttributes {
//   id: number;
//   title: string;
//   authors: string;
//   description: string;
//   thumbnail: string;
//   googleBookId: string;
// }

// /**
//  * BookCreationAttributes makes 'id' optional when creating a new Book instance.
//  */
// interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

// /**
//  * Book model definition extending Sequelize Model.
//  */
// export class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
//   public id!: number;
//   public title!: string;
//   public authors!: string;
//   public description!: string;
//   public thumbnail!: string;
//   public googleBookId!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// /**
//  * BookFactory function initializes the Book model with Sequelize.
//  */
// export function BookFactory(sequelize: Sequelize): typeof Book {
//   Book.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       authors: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       thumbnail: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       googleBookId: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     },
//     {
//       tableName: 'books', // Table name in database
//       sequelize,
//       timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
//     }
//   );

//   return Book;
// }
