const { Router } = require('express')
const { createCompany, authenticateCompany, retrieveCompanies, retrieveCompany, retrieveCompanyCategory, retrieveCompanyName, editCompany, createPrice, retrievePrice} = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('avarus-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, (req, res) => { 
    debugger
    const { body: { name, description, risk, market, category, dependency, image, stocks } } = req

    try {
        createCompany(name, description, risk, market, category, dependency, image, stocks)
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
    
    const { body: { name, risk, category } } = req
    debugger

    try {
        authenticateCompany(name, risk, category )
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

    // '/:id'
    // const {params: { id } } = req
    // id
    
    try { debugger

        retrieveCompanies()
            .then(companies => res.json( companies ))
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

router.get('/company/:id', tokenVerifier, (req, res) => {
    
    try {
        const { id } = req

        retrieveCompany(id)
            .then(company => res.json({ company }))
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


router.get('/category/:category',jsonBodyParser, (req, res) => {


    try { 
        const { params: { category } } = req

        retrieveCompanyCategory(category)
            .then(company => res.json( company ))
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

router.get('/name/:query',jsonBodyParser, (req, res) => {

    try { 
        const { params: { query } } = req

        retrieveCompanyName(query)
            .then(company => res.json(company))
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
        const { params: { id }, body: { company: { name, description, risk, market, category, dependency, image, stocks}}} = req

        editCompany(id, name, description, risk, market, category, dependency, image, stocks)
            .then(() => res.status(200).end())
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

router.post('/:id/price', tokenVerifier, jsonBodyParser, (req, res) => {

    try {
        const { params: { id }, body: { price }} = req

        createPrice(id, price)
            .then(() => res.status(200).end())
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


router.get('/:id/price', tokenVerifier, jsonBodyParser, (req, res) => {

    try {
        const { params: { id }} = req

        retrievePrice(id)
            .then((stocks) => res.json({stocks}))
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


module.exports = router