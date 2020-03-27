const { ApolloServer } = require('apollo-server-express');
const { createStore } = require('./utils');
const express = require("express")

const isEmail = require('isemail');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const EntryAPI = require('./datasources/entry');
const UserAPI = require('./datasources/user');
const internalEngineDemo = require('./engine-demo');

const store = createStore();

// const server = new ApolloServer({
//   context: async ({ req }) => {
//     // simple auth check on every request
//     const auth = (req.headers && req.headers.authorization) || '';
//     const email = Buffer.from(auth, 'base64').toString('ascii');
//     if (!isEmail.validate(email)) return { user: null };

//     // find a user by their email
//     const users = await store.users.findOrCreate({ where: { email } });
//     const user = (users && users[0]) || null;

//     return { user: { ...user.dataValues } };
//   },
//   dataSources: () => ({
//     entryAPI: new EntryAPI({ store }),
//     userAPI: new UserAPI({ store }),
//   }),
//   resolvers,
//   typeDefs,
//   engine: {
//     apiKey: process.env.ENGINE_API_KEY,
//     ...internalEngineDemo,
//   },
// });

const server = new ApolloServer({
  dataSources: () => ({
    entryAPI: new EntryAPI({ store }),
    userAPI: new UserAPI({ store }),
  }),
  typeDefs,
  resolvers,
  context: { store },
  playground: true
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

// server.use()

// server.use()

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});
