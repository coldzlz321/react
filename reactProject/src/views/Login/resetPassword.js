import React,{Component} from "react";
import {View,Text,Image,StyleSheet,TextInput,Picker} from "react-native";
import { setSize, setSizeText } from "@/utils/common/scale";




export default class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            canReset:false
        }
        this._renderVerify.bind(this);
        this._resetPassword.bind(this);
    }
    
    _renderVerify(){
        return (
        <View>
            <View style={styles.resetRow}>
                    <Text style={styles.rowLabel}>
                        手机号码
                    </Text>
                    <TextInput style={styles.input}  textContentType="telephoneNumber" />
                </View>
                <View style={styles.resetRow}>
                    
                    <TextInput style={styles.input} textContentType="creditCardNumber" />
                </View>
                <View style={styles.nextBtnRow}>
                    <Text style={styles.nextBtn} onPress={() => this.setState({canReset:true})}>
                        下一步
                    </Text>
                </View>
            </View>
        )
    }

    _resetPassword(){
        return (
            <View>
                <View style={styles.tipRow}>
                    <Text style={styles.tipText}>

                    </Text>
                </View>
                <View style={styles.codeRow}>
                    <TextInput />
                    <Text style={styles.codeCountDown}></Text>
                </View>
                <View style={styles.newPasswordRow}>
                    <Text style={styles.newPasswordLabel}>

                    </Text>
                    <TextInput />
                </View>
                <View style={styles.newPasswordRow}>
                    <Text style={styles.newPasswordLabel}>

                    </Text>
                    <TextInput />
                </View>
                <View style={styles.confirmBtnRow}>
                    <Text style={styles.confirmBtn}>
                        确定
                    </Text>
                </View>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                {!this.state.canReset ?
                this._renderVerify() :
                this._resetPassword()    
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:setSize(100),
        paddingHorizontal:setSize(20)
    },
    resetRow:{
        height:setSize(100),
        flexDirection:"row",
        borderBottomColor:"#dcdcdc",
        borderBottomWidth:1,
        marginBottom:setSize(40),
    },
    nextBtnRow:{
        height:setSize(120),

    },
    nextBtn:{
        height:setSize(120),
        textAlign:"center",
        textAlignVertical:"center",
        color:"#ccc",
        backgroundColor:"#3498db",
        fontSize:setSizeText(42),
        marginTop:setSize(40)
    },
    input:{
        flex:1,
        height:setSize(60),
        paddingVertical:0,
        marginTop:setSize(20),     
    },
    rowLabel:{
        height:setSize(100),
        textAlign:"center",
        textAlignVertical:"center",
        marginRight:setSize(20)
    },
    confirmBtnRow:{
        height:setSize(120),

    },
    confirmBtn:{
        height:setSize(120),
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:setSizeText(42),
        color:"#ccc",
        backgroundColor:"#3498db"
    }
})