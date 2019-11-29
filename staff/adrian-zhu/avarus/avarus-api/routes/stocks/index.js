const { Router } = require('express')
const { producePrice } = require('../../logic')
// const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
// const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('avarus-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/stock', jsonBodyParser, (req, res) => {
    const { body: {precio} } = req

    try {
        producePrice(precio)
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


module.exports = router