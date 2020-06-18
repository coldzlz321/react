import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import  CommonAction from "@/actions/common"

import Loading from "@/components/Modal/ModalLoading";
import TimerMixin from 'react-timer-mixin';

export default withLoading = (isLoading) => (WrapperComponent) => class extends WrapperComponent{
    constructor(props){
        super(props);
    }


    render(){
        let { loading } = this.props;
        return (
            <View style={styles.container}>
                <Loading loading={loading} />
                {super.render()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    }
})

