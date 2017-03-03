package com.thirdrnandnativeapp;

import android.app.Activity;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

import static android.R.attr.width;

/**
 * Created by yujie on 2017/2/24.
 * 这是第一个要添加的类
 * 1、首先必须要重写getName方法
 * 2、一个原生模块是一个继承了ReactContextBaseJavaModule的Java类，它可以实现一些JavaScript所需的功能。
 * 我们这里的目标是可以在JavaScript里写ToastAndroid.show('这个弹窗来自Android', ToastAndroid.SHORT);，来调起一个Toast通知。
 * 3、回调的话也是在这内部添加
 */

public class CustomToastModule extends ReactContextBaseJavaModule {
//    时间长短的常量
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    public CustomToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeToastAndroid";
    }
//    一个可选的方法getContants返回了需要导出给JavaScript使用的常量。
//    它并不一定需要实现，但在定义一些可以被JavaScript同步访问到的预定义的值时非常有用。
//    这样的话，JavaScript写SHORT或者LONG这边就能对应替换了
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
//    Boolean -> Bool
//    Integer -> Number
//    Double -> Number
//    Float -> Number
//    String -> String
//    Callback -> function
//    ReadableMap -> Object
//    ReadableArray -> Array
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }
    @ReactMethod
    public void dataToJS(Callback successBack, Callback errorBack){
        try{
            String result = "这数据来自Android Native";
            if (TextUtils.isEmpty(result)){
                result = "没有数据";
            }
            successBack.invoke(result);
        }catch (Exception e){
            errorBack.invoke(e.getMessage());
        }
    }
}
