const { RESTDataSource } = require('apollo-datasource-rest');

class EntryAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getAllEntries() {
    const response = await this.get('entries');
    return Array.isArray(response) ? response.map(entry => entry) : [];
  }

  async getUserEntries({ userId }) {
    const response = await this.get('entries');
    return Array.isArray(response) ? response.map(entry => entry) : [];
  }

  async getEntryById({ entryId }) {
    const response = await this.get('entries', { id: entryId });
    return response[0];
  }
}

module.exports = EntryAPI;
