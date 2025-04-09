const forceDatabaseRefresh = false; // Set true to DROP and recreate tables every time
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));
// Middleware to parse incoming JSON data
app.use(express.json());
// Use defined routes
app.use(routes);
// Connect to the database and start the server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
