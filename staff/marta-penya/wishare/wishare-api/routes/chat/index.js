const { Router } = require('express')
const { createChat, retrieveChat, sendMessage } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wishare-util')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', tokenVerifier, (req, res) => {    
    try {
        const { id } = req
        createChat(id)
            .then(chatId =>{ 
                res.status(201)
                res.json({ chatId }).end()
            })
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

router.get('/:chatId',tokenVerifier, (req, res) => {    
    try {
        const { params: { chatId } } = req
        retrieveChat(chatId)
            .then(chat =>{ 
                res.status(201)
                res.json({ chat }).end()
            })
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

router.post('/:chatId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { text }, params: { chatId } } = req

        sendMessage(chatId, id, text)
            .then(id => res.status(201).json({ id }))
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