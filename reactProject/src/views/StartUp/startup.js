import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native'

import Config from '@/styles/config.js'

import * as Animatable from 'react-native-animatable'

import TimerMixin from 'react-timer-mixin';


const startUpImg = require("@/img/startup/lbxx.jpg");

export default class StartUpPage extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            isLoaded:true,
            topTime:6
        }
               
    }
    
    componentDidMount(){
        let self = this;
        let {navigation} = this.props;
        this.timer = TimerMixin.setInterval(() => {
            var leftTime = self.state.topTime;
            if( leftTime == 0){
                TimerMixin.clearInterval(self.timer)
                navigation.navigate("StartUpTwo")
                return;
            }
            self.setState({topTime:--leftTime})
        } ,1000);
    }

    componentWillUnmount(){
        this.timer && TimerMixin.clearInterval(this.timer)
    }

    render(){
        return (
            <View  style={styles.startWrap}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" barStyle="dark-content" />
                <View style={styles.timeWrapper}
                >
                    <Text style={styles.timeText}>{this.state.topTime + "秒"}</Text>
                </View> 
                <Animatable.View style={{flex:1,alignItems:'center'}}
                    animation="fadeIn"
                >
                   
                    <Image style={styles.imgWrapper} source={startUpImg} />
                </Animatable.View>
               

            </View>
        )
    }
}

const styles = StyleSheet.create({
    startWrap:{
        flex: 1,

        alignItems:'center',
        backgroundColor:'#fff'
    },
    imgWrapper:{
        flex:1
        
    },
    timeWrapper:{       
        position:"absolute",
        top:Config.status_height + 10,
        right:10,
        width:40,
        height:30,
        borderRadius:15,
        backgroundColor:"rgba(0,0,0,0.2)",
        zIndex:100,
    },
    timeText:{
        
        textAlign:"center",
        width:40,
        height:30,
        lineHeight:30,
        color:"#fff"
    }
})