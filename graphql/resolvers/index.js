const teamMemberResolvers = require("./TeamMember");
const userResolvers = require("./Users");

module.exports = {
  Query: {
    ...teamMemberResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
