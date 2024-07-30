import 'core-js/fn/promise'
import 'core-js/fn/array/fill'
import 'core-js/fn/array/find'
import React, { Component } from 'react';
import { render } from 'react-dom';

import {Config} from './model/Config';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { Footer } from './components/Footer';


class App extends Component {

    render(){
        return (
            <div>
                <Header/>
                <Content config={this.props.config}/>
                <Footer/>
            </div>
        );
    }

}

let config = new Config();
render(<App config={config}/>, document.getElementById('wrapper'));