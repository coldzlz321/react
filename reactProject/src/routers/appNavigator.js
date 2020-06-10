import {createStackNavigator} from '@react-navigation/stack';
import StartUp from '@/views/StartUp/startup.js';
import StartUpSecond from '@/views/StartUp/startupSecond.js'

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import React,{Component} from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'

import Touchable from '@/components/Touchable/Touchable.js'



const labels = ["主页","视频","我的"];

const imgs = [[require("@/img/tab/icon-tab-home.png"),require("@/img/tab/icon-tab-home-active.png")],
[require("@/img/tab/icon-tab-video.png"),require('@/img/tab/icon-tab-video-active.png')],
[require("@/img/tab/icon-tab-personal.png"),require("@/img/tab/icon-tab-personal-active.png")]]

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = labels[index]
        const isFocused = state.index === index;
        if(isFocused){
          var  tabImg = imgs[index][1]
        }else{
          var tabImg = imgs[index][0]
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
         

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Touchable
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 ,height:50,alignItems:'center',justifyContent:'center'}}
          >
            <View style={{ flex: 1,alignItems:'center',justifyContent:'center',height:50}}>
              <Image style={{width:20,height:20}}  source={tabImg}/>
              <Text style={{ color: isFocused ? '#3498db' : '#333' ,marginTop:5}}>
                {label}
              </Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
}
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
    <Tab.Navigator tabBar={MyTabBar}>
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
  tabContainer:{ 
    flexDirection: 'row', 
    justifyContent:"center",
    alignItems:'center',
    borderTopWidth:1,
    borderStyle:'solid',
    borderTopColor:'#ccc'
  },
  textWrapper:{
    fontSize:32,
    width:100,
    height:100,
   lineHeight:100,
   textAlign:"center"  
  }
})