import greetingIntent from './intents/greetingIntent.js'
import timeIntent from './intents/timeIntent.js'
import weatherIntent from './intents/weatherIntent.js'
import defaultIntent from './intents/defaultIntent.js'

export default class IntentFactory{
	constructor(type, location_object){
		let location = '';
		if(location_object!=undefined)
				location = location_object[0].value;

		if(type==='hey'){
			let intent = new greetingIntent();
			return intent;
		}
		else if(type==='time'){
			let intent = new timeIntent(location);
			return intent;
		}
		else if(type==='weather'){
			let intent = new weatherIntent(location);
			return intent;
		}
		else{
			let intent = new defaultIntent(type);
			return intent;
		}
	}
}