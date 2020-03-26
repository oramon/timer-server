module.exports = {
  Mutation: {
    addUpdateUser: async (_, { email, name, role }, { dataSources }) => {
      const user = await dataSources.userAPI.upsertUser({ email, name, role });
      return {
        success: !!user,
        message: 'whatever',
        user: user,
      };
    },
    removeUser: async (_, { id }, { dataSources }) => {
      const removed = await dataSources.userAPI.deleteUser({id});
      return {
        success: !!removed,
        message: 'whatever',
        user: null,
      };
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.getUserByEmail({ email });
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
      dataSources.userAPI.upsertUser(),
    users: async (_, __, { dataSources }) =>
      dataSources.userAPI.getAllUsers(),
    user: async (_, { email }, { dataSources }) =>
      dataSources.userAPI.getUserByEmail({ email })
  },
};
