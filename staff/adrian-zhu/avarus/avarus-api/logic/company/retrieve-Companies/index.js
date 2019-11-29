const { errors: { NotFoundError } } = require('avarus-util')
const { models: { Company } } = require('avarus-data')

module.exports = function () {


    return (async () => {

        if (!Company) throw new NotFoundError(`Module with name ${Company} does not exist`)

        const company = await Company.find()

        return company
    })()

}