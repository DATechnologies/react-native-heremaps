import { Animated, NativeModules, PermissionsAndroid } from "react-native";

//IMPORT COMPONENTS

import { isAndroid } from "./utils";
import MapView from "./components/MapView";

const HereMaps = { ...NativeModules.HereMaps };

// components

HereMaps.MapView = MapView;

export default HereMaps;
