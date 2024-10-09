/**
 * Main entry point for the Express server.
 * This script sets up middleware, connects to the database, and starts the server on port 3001.
 */

const express = require('express');
const app = express(); // Initialize Express app
const cors = require('cors'); // Import CORS middleware for cross-origin resource sharing

// Middleware setup
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Enable CORS to allow requests from different origins

// Database connection
const db = require('./models'); // Import Sequelize models

// Routers
const postRouter = require('./routes/Posts'); // Import the posts router
app.use("/posts", postRouter); // Use the posts router for routes starting with '/posts'

const commentsRouter = require('./routes/Comments'); // Import the comments router
app.use("/comments", commentsRouter); // Use the comments router for routes starting with '/comments'

// Sync the Sequelize models with the database and start the server
db.sequelize.sync().then(() => {
    /**
     * Once the database is synced, the server starts listening on port 3001.
     * The server is ready to handle requests once this function is called.
     */
    app.listen(3001, () => {
        console.log("Server running on port 3001"); // Log to indicate the server is up and running
    });
});
