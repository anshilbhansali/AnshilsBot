# Anshil's Slack Real Time Messaging Bot
### A Slack Bot that can answer *natural* questions relating to time and weather in any part of the world.

## Instructions to run:
* clone project
* cd into project
* run *npm start* to start slack bot
* cd microservice
* run *npm start* to start time and weather microservices
* slack channel - https://hackillinois2017.slack.com
* ...Working on building a web interface for this technology...

## Important
### Slack/Wit.ai tokens:
* Get and place these tokens in a new file slackBot/tokens.json, in the same format at slackBot/tokens_example.json:
* [Wit Token](https://wit.ai/)
* [Slack RTM API token](https://api.slack.com/rtm)

### Microservice tokens
* Get and place these tokens in a new file slackBot/microservice/tokens.json, in the same format at slackBot/microservice/tokens_example.json:
* [Google maps geocode api key](https://developers.google.com/maps/documentation/geocoding/intro)
* [Google maps time api key](https://developers.google.com/maps/documentation/timezone/intro)
* [Open Weather API key](https://openweathermap.org/api)


## Example Questions
* ![greeting](https://raw.githubusercontent.com/anshilbhansali/slackBot/master/greeting.png)
* ![time](https://raw.githubusercontent.com/anshilbhansali/slackBot/master/time_newyork.png)
* ![weather](https://raw.githubusercontent.com/anshilbhansali/slackBot/master/weather_india.png)
* ![both](https://raw.githubusercontent.com/anshilbhansali/slackBot/master/weather_time_dubai.png)






