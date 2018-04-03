'use strict'

export default class defaultIntent{
	constructor(type_){
		this.type_ = type_;
	}

	process(){
		let type_ = this.type_;
		return new Promise(function(resolve, reject){
			resolve(`Cant understand ${type_}`);
		});
	}
}
