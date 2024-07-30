import {observable} from 'mobx';
import FileSaver from 'file-saver';

import XHR from '../XHR';

export class Config {

	@observable config = {};

	constructor(url){
		this.url = url;
		this.pending = false;
	}

	load(callback){
		this.pending = true;
		return new Promise( (resolve, reject) => {
			XHR.get(this.url).then( data => {
				let configFunction = new Function(`return (${data})`);
				this.config = configFunction();
				this.pending = false;
				resolve(this.config);
			}, error => reject(error) );
		}).then(callback);
	}

	/**
	 * @overload
	 * */
	set = function(){
		let _this = this;

		function setConfig(config){
			_this.config = config;
		}

		function setByKey(key, value){
			_this.config[key] = value;
		}

		return function(){
			switch (arguments.length){
				case 1: return setConfig.apply(_this, arguments);
				case 2: return setByKey.apply(_this, arguments);
				default: throw new Error('Invalid arguments list!');
			}
		};
	}();

	get(){
		return this.config;
	}

	uploadFiles(files, callback){
		let promises = [];
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			Array.prototype.forEach.call(files, file => promises.push(this.readFile(file)) );
		}else{
			alert('Ваш браузер не поддерживает FileAPI!');
		}
		return Promise.all(promises).then(callback);
	}

	readFile(file, callback){
		return new Promise( (resolve, reject) => {
			var reader = new FileReader();
			reader.onload = function(e){
				var text = e.target.result;
				text = text.replace(/↵/g, '\n');
				try {
					let cfgList = [];
					let config = JSON.parse(text);
					if(Array.isArray(config)){
						cfgList = config.map( (cfg, index) => {
							cfg.title = cfg.title || file.name + `(${index})`;
							return cfg;
						});
					}else{
						config.title = config.title || file.name;
						cfgList.push(config);
					}
					resolve(cfgList);
				} catch (e) {
					let msg = 'Файл настроек поврежден и не будет добавлен в очередь!';
					console.error(msg);
					reject(msg);
				}
			};
			reader.readAsText(file);
		}).then(callback);
	}

	downloadFile(json, fileName = 'config'){
		let file = new Blob([JSON.stringify(json, null, '\t')]);
		FileSaver.saveAs(file, fileName + '.json');
	}

}