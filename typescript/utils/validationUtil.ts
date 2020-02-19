import {
  ViewPropTypes,
  View,
  NativeModules,
  findNodeHandle,
  Platform
} from "react-native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

function getAndroidManagerInstance(module) {
  const haveViewManagerConfig =
    NativeModules.UIManager && NativeModules.UIManager.getViewManagerConfig;
  return haveViewManagerConfig
    ? NativeModules.UIManager.getViewManagerConfig(module)
    : NativeModules.UIManager[module];
}

function getIosManagerInstance(module) {
  return NativeModules[getIOSModuleName(module)];
}

export function isAndroid() {
  return Platform.OS === "android";
}

export function existenceChange(cur, next) {
  if (!cur && !next) {
    return false;
  }
  return (!cur && next) || (cur && !next);
}

export function isFunction(fn) {
  return typeof fn === "function";
}

export function isNumber(num) {
  return typeof num === "number" && !Number.isNaN(num);
}

export function isUndefined(obj) {
  return typeof obj === "undefined";
}

export function isString(str) {
  return typeof str === "string";
}

export function isBoolean(bool) {
  return typeof bool === "boolean";
}

export function isPrimitive(value) {
  return isString(value) || isNumber(value) || isBoolean(value);
}

export function runNativeCommand(module, name, nativeRef, args = []) {
  const handle = findNodeHandle(nativeRef);
  if (!handle) {
    throw new Error(`Could not find handle for native ref ${module}.${name}`);
  }

  const managerInstance = isAndroid()
    ? getAndroidManagerInstance(module)
    : getIosManagerInstance(module);

  if (!managerInstance) {
    throw new Error(`Could not find ${module}`);
  }

  if (isAndroid()) {
    return NativeModules.UIManager.dispatchViewManagerCommand(
      handle,
      managerInstance.Commands[name],
      args
    );
  }

  return managerInstance[name](handle, ...args);
}

export function getIOSModuleName(moduleName) {
  if (moduleName.startsWith("RCT")) {
    return moduleName.substring(3);
  }
  return moduleName;
}
