'use strict'

export default class messageHelper{
	constructor(){
		//nothing
	}

	static getLongLine(){
		return '*---------------------------------------------------------------------------------------------------*';
	}

	static getTimeString(){
		let date = new Date();
		let hour = date.getHours();
		let minutes = date.getMinutes();
		let suffix = 'am';
		if (hour>12){
			hour = hour-12;
			suffix = 'pm';
		}else if(hour===0){
			hour = 12;
			suffix = 'am';
		}

		let time_string = `${hour}:${minutes} ${suffix}`;
		return time_string
	}
}