
import { combineReducers } from 'redux';
import userReducer from './user';
//所以为啥说这个是入口文件，是因为一个是redux的组件，一个是调用的本文件夹下面写的那个
//带有两个功能的reducer


//这里只是做了登陆的功能，只有userReducer，如果功能复杂的话，需要保存很多应用和用户交互产生的信息


export default combineReducers({
	userStore: userReducer,
});
