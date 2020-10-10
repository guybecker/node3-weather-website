const request = require('postman-request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a31130e2d096e2b1c717640f5110d665&query=' + latitude + ',' + longitude + '&units=m'
    request({url, json:true}, (err, {body}) => {
        if (err) {
            callback('unable to connect to weather API',undefined)
        } else if (body.error) {
            callback('Unable to find location ',undefined)
        } else {
        const currentTemp = body.current.temperature
        const feelsLike = body.current.feelslike
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + currentTemp + ' degrees out. It feels like ' + feelsLike + ' degrees.')
        }
    })
}

module.exports=forecast