"use strict";

import { Event as MyEvent } from './Event';

export class EventEmitter {
    constructor(){
        this._events = {};

        /*this.constructor.prototype.addEventListener = EventTarget.prototype.addEventListener;
         this.constructor.prototype.removeEventListener = EventTarget.prototype.removeEventListener;
         this.constructor.prototype.dispatchEvent = EventTarget.prototype.dispatchEvent;*/
    }

    static implenetMethods(obj){
        obj._events = {};

        obj.constructor.prototype.addEventListener = EventEmitter.prototype.addEventListener;
        obj.constructor.prototype.removeEventListener = EventEmitter.prototype.removeEventListener;
        obj.constructor.prototype.dispatchEvent = EventEmitter.prototype.dispatchEvent;
    }

    /**
     * Добавляет слушателя к событию
     * @param {String} type
     * @param {Function} listener
     * @param context
     * @returns {Event}
     * */
    addEventListener(type, listener, context){
        let event = new MyEvent(type, listener, context);
        this._events[type] = this._events[type] || [];
        this._events[type].push(event);
        return event;
    }

    /**
     * Удаляет слушателя события
     * @param {Event} event
     * */
    removeEventListener(event){
        if(this._events[event.getType()]){
            let index = this._events[event.getType()].indexOf(event);
            if (index >= 0) {
                this._events[event.getType()].splice(index, 1);
            }
        }
    }

    /**
     * Испускает событие и передает данные обработчику
     * @param {String} type
     * @param {*=} data
     * */
    dispatchEvent(type, data){
        this._events[type] && this._events[type].forEach(function(event){
            event.fireListener(data);
        });
    }
}

export default EventEmitter;