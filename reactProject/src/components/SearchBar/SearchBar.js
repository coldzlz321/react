import React,{Component} from 'react';
import {View,Text,TextInput,Image,StyleSheet,Keyboard} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Touchable from "@/components/Touchable/Touchable.js";
import {setSize,setSizeText} from "@/utils/common/scale.js"
import {trim} from "@/utils/common/trim.js";

const searchIcon = require("@/img/search/icon-search.png");
const delIcon = require("@/img/search/icon-search-clear.png");


export default class CustomSearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showClearBtn:false,
            text:"",
            showLabel:false,
            labelText:"你好"
        }
        this._goBack.bind(this);
        this._textChange.bind(this);
        this._clearInput.bind(this);
        this.setInputText.bind(this)
    }

    _goBack(){
        let { navigation } = this.props;
        this.setState({text:"",showClearBtn:false,showLabel:false,labelText:""},() =>{Keyboard.dismiss();navigation.goBack()});
    }  

    _textChange(text){
        if(trim(text) == ""){
            this.setState({showClearBtn:false});
            return;
        }
        this.setState({text:text,showClearBtn:true})
    }

    _clearInput(){
        this.input.clear()
        this.setState({text:"",showClearBtn:false})
            
    }

    

    setInputText(text){
        if(trim(text) == ""){
            this._clearInput();
            return;
        }
        this.setState({text:text,showLabel:true,showClearBtn:true,labelText:text})
    }

    render(){
        let { placeHolder = "请输入关键字" } = this.props;
        placeHolder = this.state.showLabel ? "" : placeHolder
        return (
            <View style={{flexDirection:"row",height:setSize(72),marginTop:setSize(50),marginBottom:setSize(40)}}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        returnKeyType="search"
                        ref={(ref) => this.input = ref}
                        placeholder={placeHolder}
                        placeholderTextColor="#999"
                        onSubmitEditing={() => {}}
                        value={this.state.text}
                        editable
                        onFocus={() => this.setState({showLabel:false,labelText:""})}
                        autoFocus={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this._textChange(text)}
                        style={styles.searchInput}
                    />
                    {this.state.showLabel &&
                    
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelText}>{this.state.labelText}</Text>
                            <Touchable onPress={() => this.setState({showLabel:false,labelText:"",text:"",showClearBtn:false},() => this.input.focus())}>
                                <Image source={delIcon} style={styles.labelImg} />
                            </Touchable>
                        </View>
                    
                    }
                    <Image source={searchIcon} style={styles.searchImg} />
                {!this.state.showLabel && this.state.showClearBtn && 
                <Touchable onPress={() => this._clearInput()}>
                    <Image source={delIcon} style={styles.delImg} />
                </Touchable>
                }
                </View>
            
                <Text onPress={() => this._goBack()} style={styles.cancelBtn}>取消</Text>
            
            </View>
        )
    }
}


const styles = StyleSheet.create({
    searchInput:{
        
        height:setSize(62),
        paddingVertical:0,
        marginTop:setSize(5),
        fontSize:setSizeText(32),
        color:"#000"
    },
    inputWrapper:{
        height:setSize(72),
        flex:1,
        borderRadius:setSize(36),
        paddingHorizontal:setSize(72),
        position:'relative',
        backgroundColor:"#eee"
    },
    delImg:{
        width:setSize(36),
        height:setSize(36),
        position:"absolute",
        // backgroundColor:"rgb(255,0,0)",
        right:setSize(18),
        top:setSize(18)
    },
    searchImg:{
        width:setSize(36),
        height:setSize(36),
        position:"absolute",
        left:setSize(18),
        top:setSize(18)
    },
    cancelBtn:{
        marginLeft:setSize(20),
        fontSize:setSizeText(32),
        height:setSize(72),
        textAlign:'center',
        textAlignVertical:"center",
        color:"#3498db"
    },
    labelText:{
        height:setSize(60),
        textAlign:"center",
        textAlignVertical:"center"
    },
    labelContainer:{
        paddingLeft:setSize(20),
        paddingRight:setSize(60),
        minWidth:setSize(70),
        backgroundColor:"#ccc",
        position:"absolute",
        left:setSize(72),
        top:setSize(6),
        borderRadius:setSize(32),
        color:"#999"
    },
    labelImg:{
        width:setSize(32),
        height:setSize(32),
        position:"absolute",
        right:setSize(10),
        top:setSize(14)
    }
})