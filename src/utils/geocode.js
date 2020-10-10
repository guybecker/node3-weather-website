const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3V5YmVja2VyIiwiYSI6ImNrZzBldGZqZTBjM3Eyc3FiNzI1dW5pdjgifQ.qgtHIo2e5xup2z5lPnLHCw&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports=geocode