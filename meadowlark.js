const express = require('express')
const exphbs = require('express-handlebars')
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const app = express()
const port = process.env.PORT || 3000
const dateServerStarted = performance.now()


app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

if(require.main === module) {
app.createServer().listen(port, () => { console.log(
    `Express started without any problem on http://localhost:${port} \n` + 
    `Push the Ctrl+C to close server`)
})} else {
    module.exports = app
}