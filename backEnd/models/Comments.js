/**
 * Defines the Comments model for Sequelize.
 * This model represents a table in the database that stores comments on posts.
 *
 * @param {Object} sequelize - The Sequelize instance.
 * @param {Object} DataTypes - The data types provided by Sequelize to define model fields.
 * @returns {Object} The Comments model.
 */
module.exports = (sequelize, DataTypes) => {

    /**
     * Defines the structure of the "Comments" table.
     * Each comment contains a comment body.
     */
    const Comments = sequelize.define("Comments", {
        /**
         * @property {String} commentBody - The content of the comment.
         * This field is required and cannot be null.
         */
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    
    return Comments;
};
