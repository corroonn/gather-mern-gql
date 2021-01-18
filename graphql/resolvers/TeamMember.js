const TeamMember = require("../../models/TeamMember");

module.exports = {
  Query: {
    async getTeamMember() {
      try {
        const teamMember = await TeamMember.find();
        return teamMember;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
