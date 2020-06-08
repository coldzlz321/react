import AppContainer from '@/routers/appNavigator.js';

import React,{Component} from 'react'

export default class app extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <AppContainer></AppContainer>
        )
    }
} 