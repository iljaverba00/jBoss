import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import XHR from '../XHR';

export class Header extends Component {

    render(){
        return (
            <div className="user_bar clear_fix">
                <Title/>
                <UserInfo/>
            </div>
        );
    }

}



export class Title extends Component {

    render(){
        return <div className="title">GSEE WMS Cache Renderer</div>
    }

}



export class UserInfo extends Component {

    constructor(props){
        super(props);
        this.state = { logined: true };
    }

    componentWillMount(){
        this.checkLogin( data => {
            this.setLogined(data);
        });
    }

    setLogined(data){
        if(data.login){
            this.setState({
                models: data.login.mms,
                logined: false
            });
        }else if(data.user){
            this.setState({
                logined: true,
                userInfo: {
                    user: data.user,
                    model: data.umm
                }
            })
        }else{
            if(this.state.models){
                this.setState({
                    logined: false,
                    models: this.state.models
                });
            }else{
                this.checkLogin( data => {
                    data.login && this.setLogined(data);
                });
            }
        }
    }

    doLogin(e){
        e.preventDefault();

        var user = ReactDOM.findDOMNode(this.refs.user).value;
        var password = ReactDOM.findDOMNode(this.refs.password).value;
        var model = ReactDOM.findDOMNode(this.refs.model).value;

        Promise.all([
			this.login(model, user, password),
			this.loginWMS(model, user, password)
		]).then( data => this.setLogined(data[0]) );


    }

    doExit(e){
        e.preventDefault();
        this.exit( data => {
            this.setLogined(data);
        });
    }

    render(){

        let models = this.state.models || [];
        let modelsOptionsList = models.map( model => {
            return <option value={model.value} key={model.value}>{model.name}</option>
        });


        var userInfo = this.state.userInfo || {};

        return this.state.logined ? (
            <div className="fl_r">
                <span>{userInfo.model}</span> - <span>{userInfo.user}</span> <button onClick={this.doExit.bind(this)}>Выход</button>
            </div>
        ) : (
            <div className="login_layout">
                <div className="login_container">
                    <div className="title">Вход в систему</div>
                    <div className="content">
                        <form>
                            <table>
                                <tbody>
                                <tr><td>Модель:</td><td><select ref="model">{modelsOptionsList}</select></td></tr>
                                <tr><td>Логин:</td><td><input type="text" ref="user"/></td></tr>
                                <tr><td>Пароль:</td><td><input type="password" ref="password"/></td></tr>
                                <tr><td> </td><td><button onClick={this.doLogin.bind(this)} className="fl_r">Войти</button></td></tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        );
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
            url: '/ActionServlet?action=wl_tiles&mode=login'
        }).then(callback);
    }

    exit(callback){
        return XHR.ajax({
            url: '/ActionServlet?action=wl_tiles&mode=exit'
        }).then(callback);
    }

}