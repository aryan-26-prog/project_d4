const { json } = require("express");
const confession = require("../models/confession");
const Confession = require("../models/confession");

const BadWordsFilter = require("bad-words");

const filter = new BadWordsFilter();

// This is used to handle to get request
exports.getConfession = async(req, res) => {
  try{
    const confessions = await Confession.find().sort({createdAt: -1});
    return res.status(200).json(confessions);
  }
  catch(error) {
    console.error("Fetch Error", error);
    return res.status(500).json({
      error: "Unable to fetch confession"
    });
  }
};


//This is used to handle post request 
exports.createConfession = async (req, res) => {
  try{
    const { text, category = "General" } = req.body;

    if(!text || text.trim().length === 0) {
      return res.status(400).json({
        error: "Confession text is required"
      });
    }

    // used to Validate category
    const allowedCategories = ["General", "Love", "College", "Career", "Family", "Mental Health"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        error: "Invalid category"
      });
    }

    if(filter.isProfane(text)) {
      return res.status(400).json({
        error: "The confession contains inappropriate content"
      });
    }

    const newConfession = await Confession.create({
      text: text.trim(),
      category: category 
    });

    // Used socket.io for realtime updates
    req.io.emit("new_confession", newConfession);
    return res.status(201).json(newConfession);

  }
  catch(error) {
    console.error("Create confession error", error);
    return res.status(500).json({
      error: "Failed to create confession"
    });
  }
};


exports.likeConfession = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);

    if (!confession) {
      return res.status(404).json({
        error: "Confession not found"
      });
    }

    confession.likes += 1;
    const updatedConfession = await confession.save();

    const confessionData = {
      _id: updatedConfession._id.toString(), // Ensure ID is string
      text: updatedConfession.text,
      category: updatedConfession.category,
      likes: updatedConfession.likes,
      reactions: updatedConfession.reactions,
      createdAt: updatedConfession.createdAt,
      updatedAt: updatedConfession.updatedAt
    };

    req.io.emit("update_likes", confessionData);
    
    console.log('Emitting update_likes:', confessionData._id, 'likes:', confessionData.likes);
    
    return res.status(200).json(confessionData);
  }
  catch (error) {
    console.error("Like error", error);
    return res.status(500).json({
      error: "Failed to like confession"
    });
  }
};


//This is used to add emoji reactions
exports.reactToConfession = async (req, res) => {
  try{
    const {id, type} = req.params;

    const allowed = ["shock", "laugh", "sad", "wow"];
    if(!allowed.includes(type)) {
      return res.status(400).json({
        error: "Invalid reaction"
      });
    }

    const confession = await Confession.findById(id);
    if(!confession) {
      return res.status(404).json({
        error: "Confession not found"
      });
    }

    confession.reactions[type] += 1;
    await confession.save();

    req.io.emit("reaction_update", confession);
    res.json(confession);
  }
  catch(error) {
    console.error("Reaction error", error);
    res.status(500).json({
      error: "Failed to react"
    });
  }
};