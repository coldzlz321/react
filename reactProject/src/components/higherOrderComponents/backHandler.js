import React,{Component} from 'react';
import {View,Text,BackHandler} from 'react-native';
import { toastC } from '@/utils/common/toast';

export default backHandler = (params = {}) => (wrapperComponent) => class extends wrapperComponent{
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        
        super.ComponentDidMount && super.ComponentDidMount()
        console.log(10)
        BackHandler.removeEventListener("hardwareBackPress")
        BackHandler.addEventListener("hardwareBackPress",() => {
            let now = new Date().getTime()
            if(this.lastTime && (now - this.lastTime) < 1000){
                    BackHandler.exitApp();
                    return true;
            }
            toastC("双击退出")
            this.lastTime = now;
            return true
        })
    }

    componentWillUnMount(){
        super.ComponentDidMount && super.ComponentWillUnMount();
        BackHandler.removeEventListener("hardwareBackPress")
    }

    render(){
        return (
            <View style={{flex:1}}>
                {super.render()}
            </View>
        )
    }
}

