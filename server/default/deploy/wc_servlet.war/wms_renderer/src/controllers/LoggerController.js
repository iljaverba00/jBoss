import { observable, computed, reaction, observe, intercept, when } from 'mobx';

import {RenderController} from './RenderController';


let logCtrl = null;

export class LoggerController {

    observes = [];

    @observable log_text = [];

    constructor(){
        if(logCtrl) return logCtrl;
        logCtrl = this;
    }

    start(){
        let render = new RenderController;

        this.hr().log('Начало работы скрипта');

        /*this.br().log('Текущие настройки: ');
        let keys = Object.keys(render.settings);
        keys.forEach( key => {
            let setting = render.settings[key];
            setting.name && this.log(setting.name + ': ' + setting.value);
        });*/

        this.observes.push(
        	observe(render, 'configName', configName => {
				this.br().log('Конфигурация: ' + configName + ' (' + render.configsPassed + '/' + render.configsCount + ')').br();
			}),
            observe(render, 'settings', settings => {
				this.log('Текущие настройки: ');
                for(let key in settings){
                	if(settings.hasOwnProperty(key)){
						let setting = render.settings[key];
						this.log(key + ': ' + setting);
					}
				}
            }),
            observe(render, 'currentLayer', layer => {
                if (layer.split(',').length > 1) {
                    this.br().log('Работаю с набором: ' + layer).br();
                }else{
                    this.br().log('Работаю со слоем: ' + layer).br();
                }
            }),
            observe(render, 'currentZoom', zoom => {
                this.log('Рисую в масштабе: ' + zoom + ' (' + render.tilesCount + ' тайлов)');
            }),
            observe(render, 'lastHttpError', lastHttpError => {
                this.err('Сетевая ошибка: ' + lastHttpError);
            })
        );
    }

    stop(stoppedByUser = false){
        this.observes.forEach( stopObserve => stopObserve() );
        if (!stoppedByUser) {
            this.br().log('Завершение').hr().br();
        }else{
            this.br().log('Прервано пользователем!').hr().br();
        }
    }

    write(msg){
        this.log_text.push(`${msg}`);
        return this;
    }

    log(msg){
        var time = new Date().toLocaleTimeString();
        return this.write(`${time} LOG : ${msg}`);
    }

    err(msg){
        var time = new Date().toLocaleTimeString();
        return this.write(`${time} ERR : ${msg}`);
    }

    hr(symbol = '-', length = 50){
        var arr = new Array(length).fill(symbol);
        return this.write(arr.join(''));
    }

    br(times = 1){
        var arr = new Array(times - 1).fill('\n');
        return this.write(arr.join(''));
    }

    clear(){
        this.log_text = [];
    }

    @computed get logText(){
        return this.log_text.join('\n');
    }

}


export default new LoggerController;