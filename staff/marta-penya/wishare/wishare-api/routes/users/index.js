const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, modifyUser, deleteUser, uploadUserImage } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wishare-util')
const Busboy = require('busboy')
const fs = require('fs')
const path = require('path')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, year, month, day, password, passwordconfirm } } = req

    try {
        registerUser(name, surname, email, year, month, day, password, passwordconfirm)
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
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
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
            .then(user => res.json(user))
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
        const { params: { id }, body: { year, month, day, password, description } } = req
        debugger
        modifyUser(id, year, month, day, password, description, imageURL)
            .then(() =>
                res.end()
            )
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

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})



router.post('/upload', tokenVerifier, (req, res) => {

    const { id } = req
  
    const busboy = new Busboy({ headers: req.headers })
    debugger
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        filename = id
        
        let saveTo = path.join(__dirname, 'images/' + filename +'.png')
        file.pipe(fs.createWriteStream(saveTo))
    });

    busboy.on('finish', () => {
        res.end("That's all folks!")
    });

    return req.pipe(busboy)

});

module.exports = router