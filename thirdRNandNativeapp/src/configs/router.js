'use strict';
import React from 'react';
import { Navigator } from 'react-native';
//1.const定义的变量不可以修改，而且必须初始化。
//2.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
// 3.let是块级作用域，函数内部使用let定义后，对函数外部无影响。

// Pages

import LoginPage from '../pages/login';
import MainPage from '../pages/main';



// Config，加载一个外部模块
const sceneConfig = require('./sceneConfig')

const customFloatFromRight = sceneConfig.customFloatFromRight;

//这个类也就是把navigator弄进来进行了下封装，原来的push方法中一定要传原来带的那些参数，route里面有
class Router {
    constructor(navigator) {
        this.navigator = navigator
    }

    push(props, route) {
    {/*获取当前栈里的路由，也就是push进来，没有pop掉的那些*/}
        let routesList = this.navigator.getCurrentRoutes()
        let nextIndex = routesList[routesList.length - 1].index + 1
        route.props = props
        route.index = nextIndex
        this.navigator.push(route)
    }


    pop() {
        this.navigator.pop()
    }

    toLogin(props){
        this.push(props, {
            page: LoginPage,
            name: 'login-page',
            sceneConfig: customFloatFromRight
        })
    }

    toMain(props){
        this.push(props, {
            page: MainPage,
            name: 'main-page',
            sceneConfig: customFloatFromRight
        })
    }

    
    /*Pop to the first scene in the stack, unmounting every other scene*/
    replaceWithHome() {
        this.navigator.popToTop()
    }

    resetToLogin(){
        this.navigator.resetTo({
            name: 'login-page',
            page: LoginPage,
            //sceneConfig: customFloatFromRight,
        })
    }


}

module.exports = Router

