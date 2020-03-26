const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * This method updates a user that exists or creates it if it's not found.
   * NOTE: sequelize's 'upsert' method doesn't return the upserted row, so that's why we need to look up for the row after upserted,
   * otherwise we can't return it.
   * @param {string} email User's email
   * @param {string} name  User's name
   * @param {string} role  User's role
   */
  async upsertUser({ email: emailArg, name: nameArg, role: roleArg } = {}) {
    const email = this.context && this.context.user ?
     this.context.user.email :
      emailArg;
    if (!email || !isEmail.validate(email)) return null;

    await this.store.users.upsert({email: email, name: nameArg, role:roleArg});
    const found = await this.store.users.findOne({where: { email }});
    return (found)? found.dataValues : null;
  }

  /**
   * TODO Still needs to be defined if this method fits here or needs to be moved to EntryAPI, which sounds more feasible.
   */
  async getEntriesByUser() {
    const userId = this.context.user.id;
    const found = await this.store.entries.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map(e => e.dataValues.id).filter(e => !!e)
      : [];
  }

  /**
   * Provides a list with all the existing users.
   */
  async getAllUsers() {
    const found = await this.store.users.findAll();
    return (found || []).map(e => e.dataValues);
  }

  /**
   * Given an email, returns the details from the user to which the email belongs.
   * @param {string} email Email from the user that we want to look up
   */
  async getUserByEmail({email: emailArg}) {
    const email = this.context && this.context.user ?
     this.context.user.email :
      emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOne(
      { 
        where: { email }, 
        });
    return users && users.dataValues ? users.dataValues : null;
  }

  /**
   * Deletes a user from DB.
   * @param {integer} id User's id
   */
  async deleteUser({id: id}) {
    const isDeleted = await this.store.users.destroy({where: {id}});
    return isDeleted;
  }
}

module.exports = UserAPI;
