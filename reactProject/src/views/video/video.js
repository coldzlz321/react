import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import SearchBar from "@/components/SearchBar/SearchBar.js";

export default class VideoHome extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <>
                <SearchBar />
            </>
        )
    }
}