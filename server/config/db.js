const { Client } = require('pg')
const client = new Client({
    host: "localhost",
    port: "5432",
    user: "postgres",
    password: "0000",
    database: "movie_review_db"
})

client.connect()

module.exports = client