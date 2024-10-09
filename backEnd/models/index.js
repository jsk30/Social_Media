'use strict';

/**
 * This script sets up Sequelize to connect to the database, load all models in the current directory,
 * and handle model associations. It is typically used as the main entry point for Sequelize in a project.
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename); // The name of the current file
const env = process.env.NODE_ENV || 'development'; // Get the current environment (defaults to 'development')
const config = require(__dirname + '/../config/config.json')[env]; // Load the config based on environment
const db = {}; // Object to hold the models and Sequelize instance

let sequelize;

// Initializes a Sequelize instance based on environment configuration
if (config.use_env_variable) {
  /**
   * If an environment variable is set in the config, use that to initialize Sequelize.
   * The environment variable should hold the connection string.
   */

  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  /**
   * Otherwise, initialize Sequelize with the database, username, and password defined in the config file.
   */
  
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory (models) and import them into Sequelize
fs
  .readdirSync(__dirname) // Reads all files in the current directory
  .filter(file => {
    // Filter to include only .js files, exclude hidden files, and ignore this file itself
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files (starting with '.')
      file !== basename && // Ignore this file (index.js)
      file.slice(-3) === '.js' && // Include only .js files
      file.indexOf('.test.js') === -1 // Exclude test files
    );
  })
  .forEach(file => {
    /**
     * For each valid file, import the model and add it to the `db` object.
     * Models are initialized by calling the exported function and passing in Sequelize and DataTypes.
     */
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Add the model to the `db` object, keyed by its name
  });

// Handle model associations (if defined)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    /**
     * If a model has an associate function, call it to define relationships between models.
     * This ensures associations (e.g., `hasMany`, `belongsTo`) are established after all models are loaded.
     */
    db[modelName].associate(db);
  }
});

// Export the Sequelize instance and all models
db.sequelize = sequelize; // Sequelize instance for database connection
db.Sequelize = Sequelize; // Sequelize library (useful for things like Sequelize.Op)

module.exports = db;
