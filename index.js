const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv/config");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected.");
    server.listen({ port: 5000 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  });
