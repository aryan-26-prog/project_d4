const { text } = require('express');
const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    likes: {
      type: Number,
      default: 0
    },
    reactions: {
      shock: { type: Number, default: 0 },
      laugh: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      wow: { type: Number, default: 0 }
    },
    category: {
    type: String,
    enum: ["General", "Love", "College", "Career", "Family", "Mental Health"],
    default: "General"
  }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("confession", confessionSchema);