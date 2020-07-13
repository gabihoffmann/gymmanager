const { Pool } = require('pg')

module.exports = new Pool({
    user: "home",
    password: "hji92",
    host: "localhost",
    port: "5432",
    database: "gymmanager"
})