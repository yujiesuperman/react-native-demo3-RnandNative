package com.thirdrnandnativeapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by yujie on 2017/2/24.
 * 这是第二个要添加的类
 * 这一个类将这个方法暴露出去，让rn可以调用
 * 在应用的Package类的createNativeModules方法中添加这个模块。如果模块没有被注册，它也无法在JavaScript中被访问到。
 */

public class NativeToastAndroidReactPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
//        大概是有几个modules然后add几个
        modules.add(new CustomToastModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
//        返回的一个空的集合对象，省的返回null还需要特殊处理
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
