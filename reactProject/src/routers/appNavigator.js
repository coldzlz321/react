import {createStackNavigator} from '@react-navigation/stack';
import StartUp from '@/views/StartUp/startup.js';
import StartUpSecond from '@/views/StartUp/startupSecond.js'
import VideoHome from "@/views/Video/video.js";

import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import home from '@/views/Home/home.js'

import React,{Component} from 'react'

import {View,Text,StyleSheet,Image} from 'react-native'

import Touchable from '@/components/Touchable/Touchable.js'
import { setSize,setSizeText} from "@/utils/common/scale.js"
import {toastC} from '@/utils/common/toast.js'

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
         toastC("你好")
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


function personal(){
  return (
    <View style={styles.container}>
        <Text style={styles.textWrapper}>personal</Text>
    </View>
  )
}



function tab(){
  return (
    <Tab.Navigator tabBar={MyTabBar}>
        <Tab.Screen name="home" component={home} />
        <Tab.Screen name="video" component={VideoHome} />
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