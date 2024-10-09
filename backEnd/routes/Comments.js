/**
 * Express router for handling comment-related operations.
 * This router provides endpoints for fetching comments by post ID and creating new comments.
 */

const express = require('express');
const router = express.Router();
const { Comments } = require("../models");

/**
 * GET /:postID
 * Retrieves all comments associated with a specific post ID.
 * 
 * @param {string} postID - The ID of the post to retrieve comments for (from the URL parameter).
 * @returns {Array} - A JSON array of comments that belong to the specified post.
 */
router.get('/:postID', async (req, res) => {
    const postID = req.params.postID; // Get the postID from the URL
    const comments = await Comments.findAll({ where: { PostID: postID } }); // Find all comments with the given postID
    res.json(comments); // Return the comments in JSON format
});

/**
 * POST /
 * Creates a new comment.
 * 
 * @param {Object} req.body - The data for the new comment (contains the comment body and related post ID).
 * @returns {Object} - The newly created comment in JSON format.
 */
router.post("/", async (req, res) => {
    const comment = req.body; // Get the comment data from the request body
    await Comments.create(comment); // Create a new comment in the database
    res.json(comment); // Return the newly created comment as a JSON response
});

module.exports = router;
