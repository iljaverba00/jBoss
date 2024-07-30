"use strict";

export class Event {
    constructor(type, handler, context){

        // TODO: сделать класс типа asserts обрабатывающий подобного рода ситуации
        if (typeof type == 'string') {
            this._type = type;
        }else{
            throw new TypeException('Expected [string]');
        }
        this._handler = handler;
        this._context = context || this;
    }

    /**
     * Запускает все обработчики данного события и передает им данные
     * @param data
     * */
    fireListener(data){
        let event = {type: this._type}; /*new window.Event(this._type);*/
        for (let key in data) {
            event[key] = data[key];
        }
        this._handler.call(this._context, event, data);
    }

    getType(){
        return this._type;
    }
}