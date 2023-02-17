const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const dateServerStarted = performance.now()

const fortunes = [
    "Победи свои страхи, или они победят тебя",
    "Рекам нужны истоки",
    "Не бойся неведомого",
    "Тебя ждёт приятный сюрприз",
    "Будь проще везде, где только можно"
]

app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})
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