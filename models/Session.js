const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 24 * 60 * 60,
    },
  },
  { collection: "StreamTaLk" }
);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
