const SQL = require('sequelize');
const path = require('path');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'db.sqlite'),
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: SQL.STRING(100),
      unique: true,
      allowNull: false
    },
    name: {
      type: SQL.STRING(50),
      allowNull: false,
    },
    role: {
      type: SQL.STRING(20),
      allowNull: false,
    },
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
