const { Router } = require('express')
const { createCompany, deleteCompany } = require('../../logic')
// const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
// const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('avarus-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

//CREATE Company
router.post('/', jsonBodyParser, (req, res) => {
    const { body: { level, gender, numberOfTeams, date, time } } = req

    try {
        createCompany(level, gender, numberOfTeams, date, time)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//DELETE Company
router.delete('/:id', (req, res) => {
    try {
        const { params: { id } } = req

        deleteCompany(id)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

module.exports = router