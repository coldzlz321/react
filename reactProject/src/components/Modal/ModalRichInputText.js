import React,{Component} from "react";
import {View,Text,StyleSheet,Modal} from "react-native";
import RichTextEditor from "react-native-zss-rich-text-editor";
import { setSize } from "@/utils/common/scale";

export default class ModalRichInputText extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }

        this._showModal.bind(this)
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
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this._hideModal()}
            >
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <RichTextEditor 
                        
                        
                        />
                        <View style={styles.btnContainer}>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.4)",
        position:"relative"
    },
    cardContainer:{
        width:setSize(600),
        height:setSize(500),
        position:"absolute",
        left:"50%",
        top:"50%",
        backgroundColor:"#fff",
        borderRadius:setSize(15),
        marginLeft:setSize(-300),
        marginTop:setSize(-250)
    },
    btnContainer:{

    }
})