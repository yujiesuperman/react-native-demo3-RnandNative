'use strict';

import { AlertIOS } from 'react-native';

import * as TYPES from './types';

// fake user data
let testUser = {
	'name': 'yujie',
	'age': '25',
};

// for skip user 
let skipUser = {
	'name': 'guest',
	'age': 33,
};

// login
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		let inner_get = fetch('http://www.baidu.com')
			.then((res)=>{
				  if (opt.name === 'yujie' && opt.password === '123') {
					 dispatch({'type': TYPES.LOGGED_IN, user: testUser});
				   }else{
				   	 alert("用户名或密码错误！");
				   	 dispatch({'type':TYPES.LOGGED_DATAERROR })
				}
			}).catch((e)=>{
				alert(e.message);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}



// skip login
export function skipLogin(){
	return {
		'type': TYPES.LOGGED_IN,
		'user': skipUser,
	}
}


// logout
export function logOut(){
	return {
		'type': TYPES.LOGGED_OUT
	}
}