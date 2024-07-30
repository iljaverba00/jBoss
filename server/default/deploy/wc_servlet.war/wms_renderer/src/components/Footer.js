import {observer} from 'mobx-react';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { LoggerController } from '../controllers/LoggerController';
import { RenderController } from '../controllers/RenderController';


export class Footer extends Component {

    render(){
        return (
            <div className="status_bar">
                <Progress renderCtrl={new RenderController} />
                <Logger logCtrl={new LoggerController} />
            </div>
        );
    }

}


@observer
export class Progress extends Component {

    render(){

        let renderCtrl = this.props.renderCtrl;

        return (
            <table className="status_bar__table">
                <tbody>
                    <tr><td>Конфиг:</td><td>{renderCtrl.configName}</td><td>{renderCtrl.configsPassed}/{renderCtrl.configsCount}</td></tr>
                    <tr><td>Слой:</td><td>{renderCtrl.currentLayer}</td><td>({renderCtrl.layersPassed}/{renderCtrl.layersCount})</td></tr>
                    <tr><td>Масштаб:</td><td>{renderCtrl.currentZoom}</td><td>({renderCtrl.zoomsPassed}/{renderCtrl.zoomsCount})</td></tr>
                    <tr><td>Тайл:</td><td></td><td>({renderCtrl.tilesPassed}/{renderCtrl.tilesCount})</td></tr>
                </tbody>
            </table>
        );
    }

}


@observer
export class Logger extends Component {

    /*constructor(props){
        super(props);
        this.state = {
            log: ''
        };
    }*/

    autoScroll(){
        let logElement = ReactDOM.findDOMNode(this.refs.log);
        if (logElement) {
            logElement.scrollTop = logElement.scrollHeight;
        }
    }

    render(){
        var logCtrl = this.props.logCtrl;

        return (
            <div className="status_bar__log">
                <div className="log_header">
                    <span>Лог: </span>
                    <span className="log_buttons">
                        <button onClick={e => logCtrl.clear()} ref="clear_button">Очистить</button>
                    </span>
                </div>
                <div>
                    <textarea rows="15" ref="log" className="status_bar_log" wrap="off" value={logCtrl.logText}></textarea>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        this.autoScroll();
    }

}