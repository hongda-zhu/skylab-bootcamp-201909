const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, retrieveBuyin, retrieveSellout, deleteUser, deleteStock, deleteBuyin, deleteSellout, modifyUser, buyIn, sellOut } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('../../../avarus-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password, budget = 5000} } = req

    try {
        registerUser(name, surname, email, username, password, budget)
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

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/', tokenVerifier, (req, res) => {

    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json({ user }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/:id', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { params: { id }, body: { name, surname, username, password} } = req

        modifyUser(id, name, surname, username, password)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.delete('/:id', tokenVerifier, (req, res) => {

    try {
        const { params: { id } } = req

        deleteUser(id)
            .then(() =>
                res.end()
            )
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

router.delete('/transaction/:transactionId', tokenVerifier, (req, res) => {

    try {
        const { id, params: { transactionId } } = req

        deleteStock(id, transactionId)
            .then(() =>
                res.end()
            )
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

router.post('/:id/buyin', jsonBodyParser, (req, res) => {
    debugger
    const { params: { id: userId } , body: {companyId, stockId, operation, quantity } } = req

    try {
        buyIn(userId, companyId, stockId, operation, quantity)
        // .then(() => res.status(201).end())
        .then(transaction => res.json({ transaction }))
            .catch(error => { debugger
                const { message } = error
                
                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.post('/:id/sellout', jsonBodyParser, tokenVerifier, (req, res) => {
    
    const { params: { id: userId } , body: {companyId, stockId, buyInTransactionId, operation, quantity } } = req

    try {
        sellOut(userId, companyId, stockId, buyInTransactionId, operation, quantity)
        .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/buyin/:id', (req, res) => {

    const { params: { id } } = req

    try {

        retrieveBuyin(id)
            .then(buyin => res.json({ buyin }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.get('/sellout/:id', (req, res) => {

    const { params: { id } } = req

    try {

        retrieveSellout(id)
            .then(sellouts => res.json({ sellouts }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.delete('/buyin/:id', (req, res) => {

    try {

        const { params: { id } } = req

        deleteBuyin(id)
            .then(res.end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.delete('/sellout/:id', (req, res) => {

    try {

        const { params: { id } } = req

        deleteSellout(id)
            .then(res.end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

module.exports = router