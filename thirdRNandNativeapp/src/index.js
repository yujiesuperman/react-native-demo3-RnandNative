'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

//配置store进来，
import configureStore from './store/index';

let store = configureStore();

import Root from './root'; 


export default class App extends Component{
	constructor(){
		super();
		this.state = {
			isLoading: true,
			store: configureStore(()=>{this.setState({isLoading: false})})
		}
	}
	render(){
		if(this.state.isLoading){
			console.log('loading app');
			return null;
		}
		{/*将store作为参数传给provider组件里*/}
		return (
			<Provider store={this.state.store}>
				<Root />
			</Provider>
		)
	}
}

