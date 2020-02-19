package com.heremaps;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.heremaps.map.HeremapsMapViewManager;

public class HeremapsPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new HeremapsModule(reactContext));
    }


    @Deprecated
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> managers = new ArrayList<>();

        // Components
        managers.add(new HeremapsMapViewManager());

        return managers;
    }
}
