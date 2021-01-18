const { model, Schema } = require("mongoose");

const teamMemberSchema = new Schema({
  name: String,
  title: String,
  description: String,
  username: String,
  createdAt: String,
  projects: [
    {
      name: String,
      link: String,
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("TeamMember", teamMemberSchema);
