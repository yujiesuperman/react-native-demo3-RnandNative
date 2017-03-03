'use strict';
// 这一个是全局的store，
//你需要将store或store的某个值绑定到界面，这样更新store的时候，该页面可以监听到值的更新，然后进行一些页面更新操作/跳转操作等
// store 是跟app壳子对接的一个入口，因为在壳子入口那里发现了store
import { applyMiddleware, createStore } from 'redux';
// 引入异步操作
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// 因为reducers控制的store，所以把reducers引入进来，同样也体现了状态集合；
// 是用于维护状态的容器
import reducers from '../reducers';

// 自定义log中间件，该中间件的目的是打印出当前的触发的action以及出发后的state变化。
const logger = store => next => action => {
	if(typeof action === 'function') console.log('dispatching a function');
	else console.log('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
}

let middlewares = [
	logger,
	thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);

// 配置store信息
export default function configureStore(onComplete: ()=>void){
    {/* 将reducer组合起来*/}
	const store = autoRehydrate()(createAppStore)(reducers);
	let opt = {
		storage: AsyncStorage,
		transform: [],
		//whitelist: ['userStore'],
	};
{/*  使用了redux-persist这个第三方插件来将store对象存储到本地，以及从本地恢复数据到store中，比如说保存登录信息，下次打开应用可以直接跳过登录界面。*/}
	persistStore(store, opt, onComplete);
	return store;
}


