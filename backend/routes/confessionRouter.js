const express = require('express');
const { getConfession, createConfession, likeConfession, reactToConfession } = require('../controllers/confessionController');
const Confession = require("../models/confession");

const confessionRouter = express.Router();

//This router is used to get all the confessions
confessionRouter.get("/", getConfession);

//This router is used to post all the confessions
confessionRouter.post("/", createConfession);

//This router is used to like a confession
confessionRouter.patch("/:id/like", likeConfession); 

//This router is used to emojis
confessionRouter.patch("/:id/react/:type", reactToConfession);

//This router is used to sort the trending one
confessionRouter.get("/trending", async (req, res) => {
  try {
    const trending = await Confession.find()
      .sort({ likes: -1 })
      .limit(20);

    res.json(trending);
  } catch (error) {
    console.error("Trending fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch trending confessions"
    });
  }
});

module.exports = confessionRouter;