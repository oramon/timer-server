const SQL = require('sequelize');
const path = require('path');

const sequelize = new SQL({
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite'),
});

const users = sequelize.define('user', {
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

const entries = sequelize.define('entry', {
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


users.sync({ force: true }).then(() => {
  console.log(process.argv[2]);
  if (process.argv[2] === 'dev') {
  // Now the `users` table in the database corresponds to the model definition
    users.create({
      email: 'John@Son.com',
      name: 'Hancock',
      role: 'COMMON'
    });

    users.create({
      email: 'kevin@mccallister.com',
      name: 'Kevin',
      role: 'COMMON'
    });

    users.create({
      email: 'admin@tanzarian.com',
      name: 'Admin',
      role: 'ADMIN'
    });

    users.create({
      email: 'ro_admin@tanzarian.com',
      name: 'Read only Admin',
      role: 'RO_ADMIN'
    });
  }
});

