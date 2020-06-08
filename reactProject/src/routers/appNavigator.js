import {createStackNavigator} from '@react-navigation/stack';
import StartUp from '@/views/StartUp/startup.js';
import StartUpSecond from '@/views/StartUp/startupSecond.js'

import {NavigationContainer} from '@react-navigation/native';

import React,{Component} from 'react'

const Stack = createStackNavigator();

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
              </Stack.Navigator>
            </NavigationContainer>
          );
    }
}
 
