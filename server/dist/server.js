const forceDatabaseRefresh = false; // Set true to DROP and recreate tables every time
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to parse incoming JSON data
app.use(express.json());
// Use defined routes
app.use(routes);
// Serve static files from client/dist
app.use(express.static(path.resolve(__dirname, '../../client/dist')));
// Fallback for client-side routing (SPA)
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});
// Connect to the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
// const forceDatabaseRefresh = false; // Set true to DROP and recreate tables every time
// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import routes from './routes/index.js';
// import { sequelize } from './models/index.js';
// const app = express();
// const PORT = process.env.PORT || 3001;
// // Serves static files in the entire client's dist folder
// app.use(express.static('../client/dist'));
// // Middleware to parse incoming JSON data
// app.use(express.json());
// // Use defined routes
// app.use(routes);
// // Connect to the database and start the server
// sequelize.sync({force: forceDatabaseRefresh}).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });
