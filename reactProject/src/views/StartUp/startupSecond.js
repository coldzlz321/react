import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';

import {View,Text,Image,StyleSheet} from 'react-native';

const imgSource = require("@/img/startup/lbxxS.jpg")

export default class StartUpSecond extends Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return (
            <View style={styles.container}>
                <Animatable.View style={{flex:1,alignItems:'center'}}
                    animation="fadeIn"
                >
                    <Image style={styles.imgWrapper} resizeMode="cover" source={imgSource} />
                </Animatable.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:"#fff"
    },
    imgWrapper:{
        flex:1,

    }
})