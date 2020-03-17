module.exports = {
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64');
    },
  },
  Query: {
    entry: async (_, { id }, { dataSources }) =>
      dataSources.entryAPI.getEntryById({ entryId: id }),
    entries: async (_, __, { dataSources }) =>
      dataSources.entryAPI.getAllEntries(),
    userEntries: async (_, { id }, { dataSources }) =>
      dataSources.entryAPI.getUserEntries({ userId: id }),
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
  },
};
