// server/src/models/index.ts

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { BookFactory } from './book.js';
import { FavoriteBookFactory } from './favoriteBook.js';

// Initialize Sequelize
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

// Initialize models
const User = UserFactory(sequelize);
const Book = BookFactory(sequelize);
const FavoriteBook = FavoriteBookFactory(sequelize);

// Define relationships
User.belongsToMany(Book, {
  through: FavoriteBook,
  foreignKey: 'userId',
  otherKey: 'bookId',
});

Book.belongsToMany(User, {
  through: FavoriteBook,
  foreignKey: 'bookId',
  otherKey: 'userId',
});

// For eager loading with `include`
Book.hasMany(FavoriteBook, { foreignKey: 'bookId' });
FavoriteBook.belongsTo(Book, { foreignKey: 'bookId' });

// Export for use across app
export {
  sequelize,
  User,
  Book,
  FavoriteBook,
};





// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';
// import { UserFactory } from './user.js';
// import { BookFactory } from './book.js'; // ✅ Fixed: was TicketFactory, now BookFactory
// import { FavoriteBookFactory } from './favoriteBook.js'; // ✅ New import for favorite books

// // ✅ Setup Sequelize connection
// const sequelize = process.env.DATABASE_URL
//   ? new Sequelize(process.env.DATABASE_URL)
//   : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'postgres',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

// // ✅ Initialize models
// const User = UserFactory(sequelize);
// const Book = BookFactory(sequelize);
// const FavoriteBook = FavoriteBookFactory(sequelize);

// // ✅ Setup associations
// // Many-to-Many: A User can favorite many Books, and a Book can be favorited by many Users
// User.belongsToMany(Book, { through: FavoriteBook, foreignKey: 'userId' });
// Book.belongsToMany(User, { through: FavoriteBook, foreignKey: 'bookId' });

// // ✅ Export models
// export { sequelize, User, Book, FavoriteBook };
