const Sequelize = require("sequelize")

const connection = new Sequelize("guiaperguntas", "root", "Lulu1509", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection