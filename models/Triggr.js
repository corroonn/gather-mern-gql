const { model, Schema } = require("mongoose");

const triggrSchema = new Schema({
  name: String,
  count: Number,
  lastEventTime: String,
  lastLocation: String,
  url: String,
  status: Boolean,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Triggr", triggrSchema);
