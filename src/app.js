const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Guy Becker'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Guy Becker'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpMsg: 'Would you like help in any topic?',
        title: 'Help',
        name: 'Guy Becker'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={}) => {
        if (error) {
           return res.send({
               error: error
           }) 
        }

        forecast(latitude,longitude,(error, forecastData)=> {
            if (error) {
                return res.send( {
                    error: error
                })
            }

            res.send( {
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', { 
        errMsg: 'Help article not found',
        title: '404',
        name: 'Guy Becker'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errMsg: 'Page not found.',
        title: '404',
        name: 'Guy Becker'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})