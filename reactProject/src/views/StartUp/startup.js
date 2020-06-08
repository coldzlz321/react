import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native'

import TimerMixin from 'react-timer-mixin';

export default class StartUpPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded:true
        }           
    }

    componentWillMount(){

    }

    render(){
        return (
            <View >
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
                <Text>你好</Text>
            </View>
        )
    }
}