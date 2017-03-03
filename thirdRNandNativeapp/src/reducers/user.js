'use strict';

import * as TYPES from '../actions/types';

const initialState = {
	isLoggedIn: false,
	user: {},
	status: null,
};
//...state是把上面初始state的参数全都从数组里解析出来，然后当成参数，return出去
// 这些状态 除了null都在login那边有方法对应
export default function user(state=initialState, action){

	switch(action.type){
		case TYPES.LOGGED_DOING:
			return {

				...state,
				status: 'doing'
			};

		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			}
			
		case TYPES.LOGGED_DATAERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: 'done'
			}

		default: 
			return state;
	}

}