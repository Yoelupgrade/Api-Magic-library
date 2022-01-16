const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const malletSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    type: { type: String, trim: true },
    format_game: { type: String, trim: true },
    card: [{ type: Schema.Types.ObjectId, ref: "cards" }],
    dock: [{ type: Schema.Types.ObjectId, ref: "cards" }],
  },
  {
    timestamps: true,
  }
);

const mallets = mongoose.model("mallet", malletSchema);
module.exports = mallets;
