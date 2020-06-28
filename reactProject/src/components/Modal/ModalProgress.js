import React,{Component} from "react";
import {View,Text,StyleSheet,Modal, ProgressBarAndroid, Slider,TouchableHighlight,TouchableNativeFeedback} from 'react-native'
import { setSize } from "@/utils/common/scale";



export default class ModalProgress extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal:false
        }
        this._showModal.bind(this);
        this._hideModal.bind(this);
    }

    _showModal(){
        this.setState({showModal:true});
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
                        <ProgressBarAndroid styleAttr="Horizontal"
                            indeterminate={false}
                            width={setSize(400)}
                            color="#3498db"
                            animating={true}
                            progress={0.5} />

                        <Slider
                        thumbTintColor="#3498db"
                        minimumTrackTintColor="rgba(255,0,0,1)"
                        width={setSize(500)}
                        maximumValue={1}
                        onSlidingComplete={() => {}}
                        onValueChange={() => {}}
                        />
                        <TouchableHighlight onPress={() => {}}>
                            <View style={{backgroundColor:"#ddd",width:setSize(500),height:setSize(100)}}>
                                <Text style={{flex:1,textAlign:"center",textAlignVertical:"center"}}>高亮</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableNativeFeedback onPress={() => {}}>
                            <View style={{backgroundColor:"#ddd",width:setSize(500),height:setSize(100),marginTop:setSize(40)}}>
                                <Text style={{flex:1,textAlign:"center",textAlignVertical:"center"}}>高亮</Text>
                            </View>
                        </TouchableNativeFeedback>
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
        position:"absolute",
        width:setSize(600),
        height:setSize(500),
        borderRadius:setSize(15),
        backgroundColor:"#fff",
        left:"50%",
        top:"50%",
        marginLeft:setSize(-300),
        marginTop:setSize(-250),
        alignItems:"center",
        justifyContent:"center"
    }

})