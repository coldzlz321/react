import React,{Component} from 'react';
import {View,Text,TextInput,Image,StyleSheet} from 'react-native';
import Touchable from "@/components/Touchable/Touchable.js";
import {setSize,setSizeText} from "@/utils/common/scale.js"
import {trim} from "@/utils/common/trim.js";

const searchIcon = require("@/img/search/icon-search.png");
const delIcon = require("@/img/search/icon-search-del.png");

export default class CustomSearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            showClearBtn:false,
            text:""
        }
        this._goBack.bind(this);
        this._textChange.bind(this);
        this._clearInput.bind(this);
    }

    _goBack(){
        let { navigation } = this.props;
        navigation.pop();
    }  

    _textChange(text){
        if(trim(text) == ""){
            this.setState({showClearBtn:false});
            return;
        }
        this.setState({text:text,showClearBtn:true})
    }

    _clearInput(){
        console.log(5);
        this.input.clear()
        this.setState({text:"",showClearBtn:false})
            
    }

    render(){
        let { placeHolder = "请输入关键字" } = this.props;
        return (
            <View style={{flexDirection:"row",height:setSize(72),flex:1,marginTop:setSize(200)}}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={(ref) => this.input = ref}
                        placeholder={placeHolder}
                        placeholderTextColor="#999"
                        onSubmitEditing={() => {}}
                        editable
                        autoFocus={true}
                        onChangeText={(text) => this._textChange(text)}
                        style={styles.searchInput}
                    />
                    <Image source={searchIcon} style={styles.searchImg} />
                {this.state.showClearBtn && 
                <Touchable onPress={() => this._clearInput()}>
                    <Image onPress={() => this._clearInput()} source={delIcon} style={styles.delImg} />
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
    }
})