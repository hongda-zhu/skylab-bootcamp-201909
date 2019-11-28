const { Router } = require('express')
const { createWish, listWishes, modifyWish, deleteWish, saveWishImage, loadWishImage } = require('../../logic')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wishare-util')
const Busboy = require('busboy')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, tokenVerifier, (req, res) => {
    const { id, body: { title, link, price, description } } = req
    try {
        createWish(id, title, link, price, description)
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

router.get('/:id', (req, res) => {
    const { params: { id } } = req
    try {
        listWishes(id)
            .then(wishes => res.json(wishes))
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


router.patch('/:wishId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { wishId }, body: { title, link, price, description } } = req
        debugger
        modifyWish(id, wishId, title, link, price, description)
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

router.delete('/:wishId', tokenVerifier, (req, res) => {
    try {
        const { id, params: { wishId } } = req

        deleteWish(id, wishId)
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

//endpoint to save wishes images

router.post('/upload/:wishId', tokenVerifier, (req, res) => {
    
    const { id, params: { wishId } } = req
  
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = wishId

        await saveWishImage(id, wishId, file, filename)
        
        // let saveTo = path.join(__dirname, `../../data/users/${id}/` + filename +'.png')
        // file.pipe(fs.createWriteStream(saveTo))
    })

    busboy.on('finish', () => {
        res.end("That's all folks!")
    })

    return req.pipe(busboy)

})

//endpoint download wishes images

router.get('/wish/:wishId', tokenVerifier, async (req, res) => {

    const { id, params: { wishId } } = req

    const stream = await loadWishImage(id, wishId) 
    //let goTo = path.join(__dirname, `../../data/users/${id}/profile.png`)
    //stream = fs.createReadStream(goTo)

    res.setHeader('Content-Type', 'image/jpeg')

    return stream.pipe(res)
})


module.exports = router