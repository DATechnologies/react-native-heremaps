import * as React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  NativeModules,
  requireNativeComponent
} from "react-native";

const MODULE_NAME = "HeremapsMapView";

const HereMaps = requireNativeComponent(MODULE_NAME);

interface MapViewProps {}

interface MapViewState {
  isReady: boolean | null;
}

const styles = StyleSheet.create({
  matchParent: { flex: 1 }
});

class MapView extends React.Component<MapViewProps, MapViewState> {
  constructor(props) {
    super(props, MODULE_NAME);

    this.state = {
      isReady: null
    };
  }

  _onLayout(e) {
    this.setState({
      isReady: true,
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  render() {
    return <View></View>;
  }
}

export default MapView;
