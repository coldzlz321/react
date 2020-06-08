import React,{Component} from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import TimerMixin from 'react-timer-mixin';

export default class StartUpPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoaded:false
        }           
    }

    componentWillMount(){

    }
}