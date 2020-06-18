import AppContainer from '@/routers/appNavigator.js';

import React,{Component} from 'react'
import {Provider} from 'react-redux'
import store from '@/store/store';

export default class app extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <Provider store={store}>
            <AppContainer></AppContainer>
        </Provider>
        )
    }
} 