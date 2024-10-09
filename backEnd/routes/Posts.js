/**
 * Express router for handling post-related operations.
 * This router provides endpoints for fetching all posts, fetching a post by ID, and creating new posts.
 */

const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

/**
 * GET /
 * Retrieves all posts from the database.
 * 
 * @returns {Array} - A JSON array of all posts.
 */
router.get("/", async (req, res) => {
    const listOfPosts = await Posts.findAll(); // Fetch all posts from the database
    res.json(listOfPosts); // Return the list of posts as a JSON response
});

/**
 * GET /byID:id
 * Retrieves a specific post by its ID.
 * 
 * @param {string} id - The ID of the post to retrieve (from the URL parameter).
 * @returns {Object} - A JSON object representing the post with the given ID.
 */
router.get('/byID:id', async (req, res) => {
    const id = req.params.id; // Extract the post ID from the URL parameters
    const post = await Posts.findByPk(id); // Fetch the post by primary key (ID)
    res.json(post); // Return the post as a JSON response
});

/**
 * POST /
 * Creates a new post.
 * 
 * @param {Object} req.body - The data for the new post (should include title, postText, userName).
 * @returns {Object} - The newly created post in JSON format.
 */
router.post("/", async (req, res) => {
    const p = req.body; // Get the post data from the request body
    await Posts.create(p); // Create a new post in the database
    res.json(p); // Return the newly created post as a JSON response
});

module.exports = router;
