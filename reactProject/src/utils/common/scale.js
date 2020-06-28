import { Dimensions,PixelRatio} from 'react-native';
import Orientation from "@/utils/common/orientation.js";

const initial = Orientation.getInitialOrientation();

export const defaultPixel = 2;
export const defaultWidth = initial == "PORTRAIT" ? 1200 : 1960;
export const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const fontScale = Dimensions.get("window").fontScale;
export const pixelRatio = PixelRatio.get();

const LogicWidth = defaultWidth / pixelRatio ;
const scale = deviceWidth / LogicWidth;

export function setSizeText(size){
    size = Math.round((size * scale + 0.49 ) / fontScale);
    return size / defaultPixel;
}

export function setSize(size){
    size = Math.round(size * scale + 0.49);
    return size / defaultPixel;
}