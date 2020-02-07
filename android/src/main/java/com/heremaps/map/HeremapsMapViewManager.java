package com.heremaps.map;

import android.app.Activity;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.here.android.mpa.common.ApplicationContext;

import java.util.Map;

public class HeremapsMapViewManager extends SimpleViewManager {

  private static final String REACT_CLASS = "HeremapsMapView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected HeremapsMapView createViewInstance(ThemedReactContext context) {
    return new HeremapsMapView(context);
  }

}