package com.heremaps;

import android.app.Activity;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.here.android.mpa.common.ApplicationContext;

import java.util.Map;

public class HeremapsMainManager extends SimpleViewManager {

  private static final String REACT_CLASS = "HeremapsMain";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected HeremapsMain createViewInstance(ThemedReactContext context) {
    return new HeremapsMain(context);
  }

}