const teamMemberResolvers = require("./TeamMember");
const userResolvers = require("./Users");
const triggrResolvers = require("./Triggr");

module.exports = {
  Query: {
    ...teamMemberResolvers.Query,
    ...triggrResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...teamMemberResolvers.Mutation,
    ...triggrResolvers.Mutation,
  },
};
