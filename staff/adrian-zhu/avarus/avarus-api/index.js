require('dotenv').config()

const { argv: [, , port], env: { PORT = port || 8080, DB_URL } } = process
const cors = require('./utils/cors')

// MODULES
const express = require('express')
const { name, version } = require('./package.json')

// API
const { database } = require('avarus-data')
const api = express()

api.use(cors)

api.options('*', cors, (req, res) => {
    res.end()
})

//ROUTES
const { users, company } = require('./routes')

api.use('/users', users)
api.use('/company', company)

database
    .connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))