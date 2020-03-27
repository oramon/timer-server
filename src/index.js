const { ApolloServer } = require('apollo-server-express');
const { createStore } = require('./utils');
const express = require("express")

const isEmail = require('isemail');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const EntryAPI = require('./datasources/entry');
const UserAPI = require('./datasources/user');
// const internalEngineDemo = require('./engine-demo');

const store = createStore();

const server = new ApolloServer({
  dataSources: () => ({
    entryAPI: new EntryAPI({ store }),
    userAPI: new UserAPI({ store }),
  }),
  typeDefs,
  resolvers,
  context: { store },
  // TODO: The following needs to extracted to an env file instead of hardcoded values.
  playground: true,
  introspection:true
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});
