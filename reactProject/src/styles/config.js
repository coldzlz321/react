import {Platform,NativeModules,Dimensions} from 'react-native';

let {width,height} = Dimensions.get("window");

let { StatusBarManager } = NativeModules

export default styleConfig = {
    screen_width:width,
    screen_height:height,
    status_height:Platform.OS == "ios" ? 20 : StatusBarManager.HEIGHT
}