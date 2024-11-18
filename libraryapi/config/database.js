const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('livraria', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
});//admin usuario e admin senha apenas para testes

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        // console.log('MySQL connected with Sequelize');
    } catch (error) {
        // console.error('Unable to connect to MySQL:', error);
    }
};

module.exports = { sequelize, connectDB };