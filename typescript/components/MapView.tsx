import * as React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  NativeModules,
  requireNativeComponent
} from "react-native";
import NativeBridgeComponent from "./NativeBridgeComponent";
import { isAndroid } from "../utils";

const MODULE_NAME = "HeremapsMapView";
const ANDROID_MODULE_NAME = "HereMapsAndroidMapView";

const HereMaps = requireNativeComponent(MODULE_NAME);

interface MapViewProps {}

interface MapViewState {
  isReady: boolean | null;
}

const styles = StyleSheet.create({
  matchParent: { flex: 1 }
});

/**
 * MapView backed by HereMaps
 */

class MapView extends NativeBridgeComponent(React.Component) {
  constructor(props) {
    super(props, MODULE_NAME);

    this.state = {
      isReady: null
    };
  }

  _setNativeRef(nativeRef) {
    this._nativeRef = nativeRef;
    super._runPendingNativeCommands(nativeRef);
  }

  _onLayout(e) {
    this.setState({
      isReady: true,
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  render() {
    const props = {
      ...this.props,
      style: styles.matchParent
    };

    const callbacks = {
      ref: nativeRef => this._setNativeRef(nativeRef)
    };

    let mapView = null;
    if (isAndroid() && !this.state.isReady) {
      mapView = (
        <HereMapsAndroidView {...props} {...callbacks}>
          {this.props.children}
        </HereMapsAndroidView>
      );
    } else if (this.state.isReady) {
      mapView = (
        <HereMapsView {...props} {...callbacks}>
          {this.props.children}
        </HereMapsView>
      );
    }
    return (
      <View onLayout={this._onLayout} style={this.props.style}>
        {mapView}
      </View>
    );
  }
}

const HereMapsView = requireNativeComponent(MODULE_NAME, MapView);

let HereMapsAndroidView;
if (isAndroid()) {
  HereMapsAndroidView = requireNativeComponent(ANDROID_MODULE_NAME, MapView);
}

export default MapView;
