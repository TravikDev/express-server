const express = require('express')
const exphbs = require('express-handlebars')
const fortune = require('./lib/fortune')
const app = express()
const port = process.env.PORT || 3000
const dateServerStarted = performance.now()


app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    
    res.render('about', {fortune:fortune.getFortune()})
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send(`404 - Page not found \n Server started at ${dateServerStarted}`)
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server network error')
})

app.listen(port, () => console.log(
    `Express started without any problem on http://localhost:${port} \n` + 
    `Push the Ctrl+C to close server`
))