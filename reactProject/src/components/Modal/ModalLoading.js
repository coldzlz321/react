import React ,{Component} from 'react';
import {Text,View,StyleSheet,Image,Modal,ActivityIndicator} from "react-native";
import { setSize } from '@/utils/common/scale';

export default class ModalLoading extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false
        }
        this._showModal.bind(this);
        this._hideModal.bind(this)
    }

    _showModal(){
        this.setState({showModal:true})
    }

    _hideModal(){
        this.setState({showModal:false})
    }

    render(){
        return (
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.state.showModal}
            >
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingCard}>
                        <ActivityIndicator size="large" />
                        <Text style={styles.loadingText}>正在努力加载中...</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer:{
        position:"relative",
        flex:1,
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    loadingCard:{
        position:"absolute",
        left:"50%",
        top:"50%",
        marginLeft:setSize(-200),
        marginTop:setSize(-150),
        width:setSize(400),
        height:setSize(300),
        borderRadius:setSize(10),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    loadingText:{
        marginTop:setSize(30),
    }
})