const {seeder} = require("../seeders/seeder")

const seed = (router) => {
    router.use(async(req, res, next) => {
        let data = await seeder()
        let html = `<h2>${data.results.n} records inserted</h2>`
        res.send(html)
        next()
    })
}

module.exports = seed