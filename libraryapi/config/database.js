const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise')
require('dotenv').config();

const dbNome = process.env.DB_NAME;
const dbUsuario = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbSenha = process.env.DB_PASSWORD;
const dbPorta = process.env.DB_PORT;

const sequelize = new Sequelize(dbNome, dbUsuario, dbSenha, {
    host: dbHost,
    port: dbPorta,
    dialect: 'mysql'
});//admin usuario e admin senha apenas para testes

const iniciarDB = async()=>{
    try {
        const conexao = await mysql.createConnection({
            host: dbHost,
            user: dbUsuario,
            password: dbSenha
        })
        //await conexao.query(`CREATE DATABASE IF NOT EXISTS \`${dbNome}\` ;`)
        await conexao.end();
        await sequelize.authenticate();
    } catch (error) {
        console.log('Erro ao inicializar o banco de dados. Detalhes do erro: '+error)
        process.exit(1)
    }
}

module.exports = { sequelize, iniciarDB };