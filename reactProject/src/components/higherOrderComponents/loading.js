import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';

import Loading from "@/components/Modal/ModalLoading";

export default  withLoading = (isLoading) => (WrapperComponent) => class extends WrapperComponent{
    constructor(props){
        super(props);
        console.log(this.props.loading)
    }

    render(){
        return (
            <View style={styles.container}>
                <Loading loading={false} />
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