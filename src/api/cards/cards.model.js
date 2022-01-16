const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    manna_cost: { type: String, trim: true },
    types: { type: String, trim: true },
    abilities: { type: String, trim: true },
    forceAndResistance: { type: String, trim: true },
    img: { type: String, trim: true },
    img_card: { type: String, trim: true}
  },
  {
    timestamps: true,
  }
);

const cards = mongoose.model("cards", cardsSchema);
module.exports = cards;
