import { NativeModules,EventEmitter, DeviceEventEmitter} from 'react-native';

import Orientation from 'react-native-orientation'

var listeners = {};
const orientationDidChangeEvent = "orientationDidChange";
const specificOrientationDidChangeEvent = "specificOrientationDidChange";

var id = 0;
var META = "__listener_id";


function getKey(listener){
    if(!listener.hasOwnProperty(META)){
        if(!Object.isExtensible(listener)){
            return 'F';
        }

        Object.defineProperties(listener,META,{
            value:'L' + ++id
        });
    }
    return listener[META];
}

export default {
    getOrientation(cb){
        Orientation.getOrientation((error,orientation) => {
            cb(error,orientation)
        });
    },
    getSpecificOrientation(cb){
        Orientation.getSpecificOrientation((error,orientation) => {
            cb(error,orientation)
        })
    },
    lockToLandScape(cb){
        Orientation.lockToLandScape()
    },
    lockToPortrait(cb){
        Orientation.lockToPortrait()
    },
    lockToLandScapeRight(){
        Orientation.lockToLandScapeRight();
    },
    lockToLandScapeLeft(){
        Orientation.lockToLandScapeLeft();
    },
    unlockAllOrientations(){
        Orientation.unlockAllOrientations();
    },
    getInitialOrientation(){
        return Orientation.getInitialOrientation();
    },
    addOrientationListener(cb){
        var key = getKey(cb);
        listeners[key] = DeviceEventEmitter.addListener(orientationDidChangeEvent,
            (body) => {
                cb(body.orientation)
            })
    },
    removeOrientationListener(cb){
        var key = getKey(cb);

        if(!listeners[key]){
            return;
        }
        listeners[key].remove();
        listeners[key] = null;
    },
    addSpecificOrientationListener(cb){
        var key = getKey(cb);
        listeners[key] = DeviceEventEmitter.addListener(specificOrientationDidChangeEvent,
            (body) => {
                cb(body.orientation)
            })
    },
    removeSpecificOrientaitonListener(cb){
        var key = getKey(cb);
        if(!listeners[key]){
            return ;
        }

        listeners[key].remove();
        listeners[key] = null;
    }
}


