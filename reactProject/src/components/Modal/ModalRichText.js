import React,{Component} from "react";
import {View,Text,StyleSheet,Picker,Modal,Switch} from "react-native"
import { setSize } from "@/utils/common/scale";


export default class ModalRichText extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedValue:"java1",
            enableSwitch:false,
            showModal:false
        }
        this._hideModal.bind(this);
        this._showModal.bind(this);
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
                        <View style={styles.contentContainer}>
                            <View style={styles.switchContainer}>
                                <Switch
                                
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={this.state.enableSwitch ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.setState({enableSwitch:!this.state.enableSwitch})}
                                value={this.state.enableSwitch}
                                />
                                <Text style={{marginLeft:setSize(10),height:setSize(100),textAlign:"center",textAlignVertical:"center"}}>显示微解</Text>
                            </View>
                            <Picker style={styles.picker}
                                mode="dialog"
                                prompt="编程语言"
                                selectedValue={this.state.selectedValue}
                                onValueChange={(item,index) => this.setState({selectedValue:item})}
                            >
                                <Picker.Item label="java" value="java" ></Picker.Item>
                                <Picker.Item label="javascriptjavascriptjavascript" value="js"></Picker.Item>
                            </Picker>
                        </View>
                        <View style={styles.btnContainer}>
                            <Text style={[styles.btn,{borderRightWidth:1,borderRightColor:"#dcdcdc"}]}>取消</Text>
                            <Text style={styles.btn}>确定</Text>
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
        borderRadius:setSize(15),
        position:"absolute",
        top:"50%",
        left:"50%",
        marginLeft:setSize(-300),
        marginTop:setSize(-250),
        backgroundColor:"#fff",
        overflow:"hidden"
    },
    contentContainer:{
        width:setSize(600),
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    picker:{
        width:setSize(350),
        height:setSize(50),
        borderColor:"#34495e",
        borderWidth:1
    },
    btnContainer:{
        
        width:setSize(600),
        height:setSize(100),
        borderTopWidth:1,
        borderTopColor:"#dcdcdc",
        flexDirection:"row"
    },
    btn:{
        flex:1,
        height:setSize(100),
        textAlign:"center",
        textAlignVertical:"center"
    },
    switchContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        height:setSize(100)
    }
})