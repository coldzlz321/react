import {createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import StartUp from '@/views/StartUp/startup.js';
import StartUpSecond from '@/views/StartUp/startupSecond.js'
import VideoHome from "@/views/video/video.js";
import Personal from "@/views/personal/personal";
import LoginIndex from "@/views/Login/index";
import ResetPassword  from "@/views/Login/resetPassword";

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import home from '@/views/Home/home.js'

import React,{Component} from 'react'

import {View,Text,StyleSheet,Image,Easing,Animated} from 'react-native'


import Touchable from '@/components/Touchable/Touchable.js'
import { setSize,setSizeText} from "@/utils/common/scale.js"
import { createSwitchNavigator } from 'react-navigation';

const labels = ["主页","视频","我的"];

const imgs = [[require("@/img/tab/icon-tab-home.png"),require("@/img/tab/icon-tab-home-active.png")],
[require("@/img/tab/icon-tab-video.png"),require('@/img/tab/icon-tab-video-active.png')],
[require("@/img/tab/icon-tab-personal.png"),require("@/img/tab/icon-tab-personal-active.png")]]

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

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
            style={styles.tabItem}
          >
            <View style={styles.tabItemContainer}>
              <Image style={styles.tabImg}  source={tabImg}/>
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

function loginStack(){
  return (
  <Stack.Navigator initialRouteName="loginIndex">
    <Stack.Screen name="loginIndex" component={LoginIndex}
      options={
        {
          headerShown:false
        }
      }
    />
    <Stack.Screen name="resetPassword" component={ResetPassword}
      options={
        {
          title:"重置密码"
        }
      }
    />
  </Stack.Navigator>
  )
}


function tab(){
  // flag = false;
  return (
    <Tab.Navigator backBehavior="none" tabBar={MyTabBar}>
        <Tab.Screen   name="home" component={home} />
        <Tab.Screen backBehavior="none" name="video" component={VideoHome} />
        <Tab.Screen backBehavior="none" name="personal" component={Personal} />
    </Tab.Navigator>
  )
}

var flag = true;

export default class AppContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
      
      var animOption =() => ({
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 2450,
              easing: Easing.bezier(0.35, 0.39, 0, 1)
            }
          },
          close: {
            animation: 'timing',
            config: {
              duration: 2450,
              easing: Easing.bezier(0.35, 0.39, 0, 1)
            }
          }
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
        if(!!next){
          var num = JSON.stringify(next.progress)
          console.log(num,"ab")
          var item = new Animated.Value(num)
        
          item.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -layouts.screen.width * 0.3]
          })
        }else{
          var num = Number(JSON.stringify(current.progress))
          console.log(num,"aa")
          var item = new Animated.Value(num)
          
          item.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0]
          })
        }
        
         
         
          return {
            cardStyle: {
              transform: [
                {
                  translateX:item
                }
              ]
            }
          };
        }
      });
      
        return (
            <NavigationContainer>
              
              <Stack.Navigator 
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                animationEnabled:true
              }}
              
              initialRouteName="StartUpOne">
               
                  <Stack.Screen name="StartUpOne"  component={StartUp}
                      options={animOption}
                  />
                  <Stack.Screen name="StartUpTwo" component={StartUpSecond}
                      options={animOption}
                />
                <Stack.Screen name="loginStack"
                  component={loginStack}
                      options={{
                        headerShown:false
                      }}  
                />

                 <Stack.Screen name="AppStack" component={tab}
                     options={animOption}
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
    fontSize:setSizeText(32),
    height:setSize(120),
   lineHeight:setSize(120),
   textAlign:"center"  
  },
  tabItem:{ 
    flex: 1 ,
    height:setSize(100),
    alignItems:'center',
    justifyContent:'center'
  },
  tabImg:{
    width:setSize(54),
    height:setSize(54)
  },
  tabItemContainer:{ 
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    height:setSize(120)
}
})