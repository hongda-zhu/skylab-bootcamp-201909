const { Router } = require('express')
const { addFriend, deleteFriend, saveFriendWish, removeFriendWish } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wishare-util')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = Router()


router.post('/:friendId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { friendId } } = req

        addFriend(id, friendId)
            .then(friend => res.json(friend))
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

router.delete('/:friendId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { friendId } } = req
        deleteFriend(id, friendId)
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

router.post('/wish/:friendId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { friendId }, body: { wishId } } = req

        saveFriendWish(id, friendId, wishId)
            .then(wish => res.json(wish))
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

router.delete('/wish/:friendId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { friendId }, body: { wishId } } = req

        removeFriendWish(id, friendId, wishId)
            .then(wish => res.json(wish))
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