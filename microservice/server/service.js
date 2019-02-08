'use strict'


const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

function getKeys(){
	const fs = require('fs');
	let rawdata = fs.readFileSync('microservice/tokens.json');  
	let data = JSON.parse(rawdata); 

	return {
		geo_key: data.googleAPIGEOKey, 
		time_key: data.googleAPITimeKey, 
		weather_key:data.WeatherAPIKey
	};
}
const keys = getKeys();
const google_maps_geo_key = keys.geo_key;
const google_maps_time_key = keys.time_key;
const open_weather_key = keys.weather_key;

//time
//https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=AIzaSyAY0_wfkZa9Or-BoUcNDRul25-KM5EBhrg


//geo
//https://maps.googleapis.com/maps/api/geocode/json?address=&key=AIzaSyCrJi5GZabZ0In0XsinQ1e52abYQoDsLvI

//time microservice
service.get('/service/time/:location', (req, res, next) => {
	//console.log('GET called ');
	request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req.params.location+'&key='+google_maps_geo_key, 
		(err, response) => {
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}

			const location = response.body.results[0].geometry.location;
			//+ is for integer return, X is for unix timestamp
			const timestamp = +moment().format('X');

			request.get('https://maps.googleapis.com/maps/api/timezone/json?location='+location.lat+','+location.lng+'&timestamp='+timestamp+'&key='+google_maps_time_key,
				(err, response) => {
					if(err){
						console.log(err);
						return res.sendStatus(500);
					}

					const result = response.body;
					const timeString = moment.unix(timestamp+result.dstOffset+result.rawOffset).utc()
					.format('dddd,MMMM Do YYYY,h:mm:ss a');

					let result_obj = {
						day: timeString.split(',')[0],
						date: timeString.split(',')[1],
						time: timeString.split(',')[2]
					}

					res.json({result: result_obj});
				});

			
		});
});

//weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=71a4ca1270b35d826b45948fa3e08af7


//weather microservice
service.get('/service/weather/:location', (req, res, next) => {
	request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req.params.location+'&key='+google_maps_geo_key, 
		(err, response) => {
			if(err){
				console.log(err);
				return res.sendStatus(500);
			}

			const location = response.body.results[0].geometry.location;

			request.get('http://api.openweathermap.org/data/2.5/weather?lat='+location.lat+'&lon='+location.lng+'&appid='+open_weather_key, 
				(err, response) => {
					if(err){
						console.log(err);
						return res.sendStatus(500);
					}

					const result = response.body;

					const weather = result.weather[0].main;
					const descr = result.weather[0].description;
					const temp = Math.floor(result.main.temp - 273.15);//in celsius
					const pressure = result.main.pressure; //in millibars
					const humidity = result.main.humidity; // in %
					const wind = Math.floor(result.wind.speed/0.44704); //in mph

					console.log(result);

					const final_weather = 'approximately as follows: \n'
					+'weather: '+weather+'\n'
					+'description: '+descr+'\n'
					+'temperature: '+temp+' degrees celsius\n'
					+'pressure: '+pressure+' mb\n'
					+'humidity: '+humidity+'% \n'
					+'wind: '+wind+' mph\n';

					res.json({result: final_weather});
				});
			

			
		});
});

module.exports = service;


