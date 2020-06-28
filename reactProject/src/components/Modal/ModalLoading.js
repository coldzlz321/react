import React ,{Component} from 'react';
import {Text,View,StyleSheet,Image,Modal,ActivityIndicator} from "react-native";
import { setSize } from '@/utils/common/scale';
import Touchable from "@/components/Touchable/Touchable"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as CommonAction from "@/actions/common"

class ModalLoading extends Component{
    constructor(props){
        super(props);
        this._showModal.bind(this);
        this._hideModal.bind(this)
    }

    _showModal(){
        let {CommonAction } = this.props;
        CommonAction.showLoading()
    }

    _hideModal(){
        let {CommonAction } = this.props;
        CommonAction.hideLoading()
    }

    render(){
        let {loading} = this.props;
        return (
            <Modal 
                animationType="fade"
                transparent={true}
                onRequestClose={() => this._hideModal()}
                visible={loading}
            >
            <Touchable onPress={() => this._hideModal()}>
                <View style={styles.loadingContainer}>
                    <Touchable onPress={() => {return true}}>
                        <View style={styles.loadingCard}>
                            <ActivityIndicator size="large" />
                            <Text style={styles.loadingText}>正在努力加载中...</Text>
                        </View>
                    </Touchable>
                </View>
            </Touchable>
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

export default connect((state,props) => ({
    loading:state.loading
}),(dispatch) => ({
    CommonAction:bindActionCreators(CommonAction,dispatch)
}))(ModalLoading)