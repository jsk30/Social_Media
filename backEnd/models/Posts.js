/**
 * Defines the Posts model for Sequelize.
 * This model represents a table in the database that stores user posts.
 *
 * @param {Object} sequelize - The Sequelize instance.
 * @param {Object} DataTypes - The data types provided by Sequelize to define model fields.
 * @returns {Object} The Posts model.
 */
module.exports = (sequelize, DataTypes) => {

    /**
     * Defines the structure of the "Posts" table.
     * Each post contains a title, post text, and the username of the poster.
     */
    const Posts = sequelize.define("Posts", {

        /**
         * @property {String} title - The title of the post.
         * This field is required and cannot be null.
         */
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        /**
         * @property {String} postText - The main content of the post.
         * This field is required and cannot be null.
         */
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },

        /**
         * @property {String} userName - The name of the user who created the post.
         * This field is required and cannot be null.
         */
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },

    });
    
    /**
     * Defines the associations for the Posts model.
     * A post can have many comments, and if a post is deleted, all associated comments are also deleted (cascade delete).
     *
     * @param {Object} models - The other models in the Sequelize instance (used to define relationships).
     */
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    };

    return Posts
};