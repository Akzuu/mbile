const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
	res.render('index',  {
		title: 'mbile.fi',
		name: 'Team Tumppi vs *'
	})
})

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