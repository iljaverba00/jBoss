import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import XHR from './XHR';

export class Login extends Component {

    constructor(props){
        super(props);
        this.state = { visible: false };
    }

    componentWillMount(){
        this.setState({});
        this.checkLogin( data => {
            if(data.login){
                this.setState({
                    models: data.login.mms,
                    visible: true
                });
            }
        });
    }

    doLogin(e){
        e.preventDefault();

        var user = ReactDOM.findDOMNode(this.refs.user).value;
        var password = ReactDOM.findDOMNode(this.refs.password).value;
        var model = ReactDOM.findDOMNode(this.refs.model).value;

        this.login(model, user, password, data => {
            if(!data.login){
				this.loginWMS(model, user, password);
                this.setState({
                    visible: false
                });
            }
        });

    }

    render(){

        let models = this.state.models || [];
        let modelsOptionsList = models.map( model => {
            return <option value={model.value} key={model.value}>{model.name}</option>
        });

        return this.state.visible ? (
            <div className="login_layout">
                <div className="login_container">
                    <div className="title">Вход в систему</div>
                    <div className="content">
                        <table>
                            <tbody>
                                <tr><td>Логин:</td><td><input type="text" ref="user"/></td></tr>
                                <tr><td>Пароль:</td><td><input type="password" ref="password"/></td></tr>
                                <tr><td>Логин:</td><td><select ref="model">{modelsOptionsList}</select></td></tr>
                                <tr><td></td><td><button onClick={this.doLogin.bind(this)} className="fl_r">Войти</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : null;
    }

    login(model, user, password, callback){
        return XHR.ajax({
            url: [
                '/ActionServlet?action=wl_tiles&mode=login',
                'j_gee_metamodel='+encodeURIComponent(model),
                'j_gee_username='+encodeURIComponent(user),
                'j_gee_password='+encodeURIComponent(password)
            ].join('&')
        }).then(callback);
    }

    loginWMS(model, user, password, callback){
        return XHR.ajax({
            url: [
                '/ows/OWSForm?SERVICE=wms',
                'j_gee_metamodel='+encodeURIComponent(model),
                'j_gee_username='+encodeURIComponent(user),
                'j_gee_password='+encodeURIComponent(password)
            ].join('&')
        }).then(callback);
    }

    checkLogin(callback){
        return XHR.ajax({
            url: '/ActionServlet?action=wl_tiles&mode=login',
            success: callback
        });
    }

}