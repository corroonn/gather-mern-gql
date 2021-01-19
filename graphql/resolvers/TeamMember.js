const { AuthenticationError } = require("apollo-server");

const TeamMember = require("../../models/TeamMember");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getTeamMembers() {
      try {
        const teamMember = await TeamMember.find().sort({ createdAt: -1 });
        return teamMember;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getTeamMember(_, { teamMemberId }) {
      try {
        const teamMember = await TeamMember.findById(teamMemberId);
        if (teamMember) {
          return teamMember;
        } else {
          throw new Error("Team member not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTeamMember(_, { name, title, description }, context) {
      const user = checkAuth(context);

      if (args.body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newTeamMember = new TeamMember({
        name,
        title,
        description,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const teamMember = await newTeamMember.save();

      return teamMember;
    },

    async deleteTeamMember(_, { teamMemberId }, context) {
      const user = checkAuth(context);

      try {
        const teamMember = await TeamMember.findById(teamMemberId);
        if (user.username === teamMember.username) {
          await teamMember.delete();
          return "Team Member removed.";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
