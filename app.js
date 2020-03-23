const chalk = require('chalk');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const errorTile = chalk.bgRed('ERROR');



let selectedLocation = process.argv[2];

if (!selectedLocation) {
    return console.log(`${errorTile} Please provide a location.`)
} else {

    geocode(selectedLocation,
        (error, { longitude, latitude, location }) => {

            if (error) {
                return console.log(`${errorTile} ${error}`);
            }

            forecast(longitude, latitude, (error, { dailySummary, currentTemperature, currentPrecipProbabilty }) => {
                if (error) {
                    return console.log(`${errorTile} ${error}`)
                }
                console.log(`${chalk.bold(`Weather forecast for ${chalk.green(location)}:`)}`);
                console.log(`${dailySummary} It is currently ${currentTemperature} degrees, with ${currentPrecipProbabilty} % chance of rain.`);
            })

        })
}








