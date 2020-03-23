const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: SQL.STRING(100),
    name: SQL.STRING(50),
    role: SQL.STRING(20),
  });

  const entries = db.define('entry', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    entryDate: SQL.DATE,
    startHour: SQL.STRING,
    endHour: SQL.STRING,
    user: {
      type: SQL.INTEGER,
      references: {
        model: users,
        key: 'ID',
        deferrable: SQL.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    creationDate: SQL.STRING,
    modificationDate: SQL.STRING,
  });

  return { entries, users };
};
