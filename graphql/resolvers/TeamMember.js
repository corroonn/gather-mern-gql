const { AuthenticationError, UserInputError } = require("apollo-server");

const { validateTeamMemberInputs } = require("../../util/validators");
const TeamMember = require("../../models/TeamMember");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getTeamMembers(_, args, context) {
      const user = checkAuth(context);

      console.log(user.id);
      try {
        const teamMember = await TeamMember.find({ user: user.id }).sort({
          createdAt: -1,
        });

        console.log(teamMember.length);

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
      const { errors, valid } = validateTeamMemberInputs(
        name,
        title,
        description
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
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
