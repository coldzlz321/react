import {createStackNavigator} from '@react-navigation/stack';
import StartUp from '@/views/StartUp/startup.js';
import StartUpSecond from '@/views/StartUp/startupSecond.js'

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import React,{Component} from 'react'

import {View,Text,StyleSheet} from 'react-native'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


function home(){
    return (
      <View style={styles.container}>
          <Text style={styles.textWrapper}>home</Text>
      </View>
    )
}

function personal(){
  return (
    <View style={styles.container}>
        <Text style={styles.textWrapper}>personal</Text>
    </View>
  )
}

function video(){
  return (
    <View style={styles.container}>
        <Text style={styles.textWrapper}>video</Text>
    </View>
  )
}

function tab(){
  return (
    <Tab.Navigator>
        <Tab.Screen name="home" component={home} />
        <Tab.Screen name="video" component={video} />
        <Tab.Screen name="personal" component={personal} />
    </Tab.Navigator>
  )
}

export default class AppContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="StartUpOne">
                <Stack.Screen name="StartUpOne" component={StartUp}
                    options={{
                        
                        headerShown:false
                      }}
                />
                <Stack.Screen name="StartUpTwo" component={StartUpSecond}
                     options={{
                       
                        headerShown:false
                      }}
                />
                 <Stack.Screen name="AppStack" component={tab}
                     options={{
                       
                        headerShown:false
                      }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  textWrapper:{
    fontSize:32,
    width:100,
    height:100,
   lineHeight:100,
   textAlign:"center"  
  }
})