const sequelize = require('./connection');

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    console.log('Database ready.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = initDb