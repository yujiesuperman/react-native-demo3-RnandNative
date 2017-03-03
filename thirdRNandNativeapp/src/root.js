
import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { connect } from 'react-redux';
import Router from './configs/router';
import { skipLogin, asyncSkipLogin } from './actions/user';

import LoginPage from './pages/login';
import MainPage from './pages/main';
//这个是有个初始化的页面，就是默认的页面，
// 这里的参数都是自己自定义的，反正是自己发自己收，
// name只是一个名字，而page，这里叫page，别的地方叫component，这个是最关键的，
// 真正有用的是component，别的没啥用
let initialRoute = {
    name: 'login-page',
    page: LoginPage,
}

class Root extends Component {
  constructor(props){
      super(props);
    {/*因为登陆的状态通过第三方插件保存到了本地，所以有可能一进入就给他弄成主页的状态，需要临时更改设置*/}
      if(props.isLoggedIn){
          initialRoute = {
              name: 'main-page',
              page: MainPage
          }
      }
  }
// 这个函数是最关键的，来看参数，
// 别的例子里面是直接传递route，然后route包含的是name和page
// navigator是里面有pop和push和jump等方法
// 
  renderScene({page, name, id, index, props}, navigator){
      {/*构造传入的navigator，在router中进行了pop和push等方法的封装*/}
      this.router = this.router || new Router(navigator);
      if(page){
      {/*这是在创建react组件，第一个参数必须是一个reactclass对象，第二个是新添加的参数*/}
      {/*如果一个组件定义了ref，那么使用this.refs可以访问到真正的组件，并且调用到组件内部的方法*/}
          return React.createElement(page, {
              ...props,
              ref: view => this[index] = view,
              router: this.router ,name,
              route: {
                  name,  id,  index
              }
          })
      }
  }
  // configureScene  这个函数是控制动画跳转的动画的，目前没啥用，
  configureScene(route){
      if(route.sceneConfig){
          return route.sceneConfig;
      }
      return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    return (<Navigator 
        ref={view => this.navigator=view}
        initialRoute={initialRoute}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
      />);
  }
}

/*
在末尾的select函数，
是将store中的某些值复制到当前组件的props中，
注意这里需要用connect函数进行绑定，否则store变化，
不会反馈到Root组件中。isLoggedIn这个变量便被复制到当前的Root组件中，
在Root内部方法中可以访问。
*/
function select(store){
  return {
    isLoggedIn: store.userStore.isLoggedIn
  }
}


export default connect(select)(Root);
