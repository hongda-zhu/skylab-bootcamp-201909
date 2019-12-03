const { validate,  errors: { NotFoundError } } = require('avarus-util')
const { models: { Sellout } } = require('avarus-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {

        const sellout = await Sellout.findById(id)

        if(!sellout) throw new NotFoundError(`we can't found sellout with id ${id}`)

        if (!Sellout) throw new NotFoundError(`Module with name ${Sellout} does not exist`)

        const sellouts = await Sellout.find({ operation: "sell-out" }).lean()

        sellouts.forEach(sellout => {

            sellout.id = sellout._id.toString()
            delete sellout._id
            delete sellout.__v
            
        })

        return sellouts
    })()

}