const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Import routers
const calendarRouter = require('./routers/calendar')
const moviesRouter = require('./routers/movies')


const app = express()
const port = process.env.PORT


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Render main page
app.get('', (req, res) => {
	res.render('index', {
		title: 'mbile.fi',
		name: 'Team Tumppi vs *'
	})
})

// Use routers
app.use(calendarRouter)
app.use(moviesRouter)


// 404 not found when page doesn't exist
app.get('*', (req, res) => {
	res.render('pageNotFound', {
		title: '404',
		text: 'Page not found!',
		name: 'Team Tumppi vs *'
	})
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})