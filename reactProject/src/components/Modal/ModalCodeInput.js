import React,{Component} from "react";
import {View,Text,StyleSheet,TextInput, Modal} from "react-native"
import { setSize, setSizeText } from "@/utils/common/scale";
import TimerMixin from "react-timer-mixin";
import { toastB, toastC } from "@/utils/common/toast";

const codeArr = Array(6).fill("");

export default class ModalCodeInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            countDonwSecond:60,
            showGetBtn:false,
            codeArray:codeArr,
            activeIndex:0
        }
        this._showModal.bind(this);
        this._hideModal.bind(this);
        this._setCountDown.bind(this);
        this._handleKeyPress.bind(this)
        this.codeRefs = []
    }

    componentDidMount(){
        this._setCountDown()
    }

   componentWillUnmount(){
       this.timer && TimerMixin.clearInterval(this.timer)
   }

    _showModal(){
       let {modalShow} = this.props;
        modalShow(true)
    }

    _hideModal(){
        let {modalShow} = this.props;
        modalShow(false)
    }

    _handleKeyPress({ nativeEvent: { key: keyValue } },index){
        let reg = /[0-9]|Backspace/g
        if(!reg.test(keyValue))return;
        let arr = this.state.codeArray.slice(0)
        if(keyValue == "Backspace"){
            if(index == codeArr.length - 1){
                arr[index] = ""
            }else if(index == 0){
                this._hideModal()
            }
            --index
            if(index < 0) return;
            arr[index] = ""
            this.setState({activeIndex:index,codeArray:arr},() => {
                this.codeRefs[index].focus();
            })

            return;
        }
        arr[index] = keyValue;
        let cur = index;
        index == (codeArr.length -1) ? index : ++index
        this.setState({activeIndex:index,codeArray:arr},()=>{
            if(cur == (codeArr.length -1)){
                this.codeRefs[cur].blur();
                let codeStr = this.state.codeArray.join("");
                toastC(codeStr);
                return
            }
            this.codeRefs[++cur].focus();
        });
    }

    _setCountDown(){
        
        this.setState({countDonwSecond:60,showGetBtn:false},() =>{
            this.timer = TimerMixin.setInterval(() => {
                let rest = --this.state.countDonwSecond
                if(rest < 0){
                    TimerMixin.clearInterval(this.timer)
                    this.setState({showGetBtn:true,countDonwSecond:60})
                    return
                }
                this.setState({countDonwSecond:rest,showGetBtn:false})
            },1000)
        });
        
    }

    render(){
        return (
            
            <Modal
            transparent={false}
        
            onRequestClose={() => {}}
            >
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.tipContainer}>
                            <Text style={{fontSize:setSize(42),fontWeight:"bold",marginBottom:setSize(30)}}>输入验证码</Text>
                        </View>
                        <View sytle={styles.phoneNumberContainer}>
                            <Text>验证码已发送至 +86 178 0000 0000</Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        {this.state.codeArray.map((item,index) => 
                        <View style={[styles.inputItem,{borderBottomColor: index <= this.state.activeIndex ? "#34495e" : "#eee"}]}>
                            <TextInput 
                            ref={(ref) => this.codeRefs[index] = ref}
                            style={styles.input}
                            maxLength={1}
                            // onBlur={() => {this.state.activeIndex == index && this.state.activeIndex != (codeArr.length - 1) ? this.codeRefs[index].focus() : ""}}
                            selectionColor="#ddd"
                            onChangeText={(value) => {let reg =/[0-9]/g ;if(!reg.test(value)) this.codeRefs[index].clear()}}
                            keyboardType="number-pad"
                            editable={index == this.state.activeIndex ? true : false}
                            autoFocus={index == 0 ? true : false}
                            onFocus={() => this.setState({activeIndex:index})}
                            onKeyPress={(event) => this._handleKeyPress(event,index)}
                            value={this.state.codeArray[index]}
                            />
                        </View>
                        )}
                    </View>
                    <View style={styles.countDownContainer}>
                        {this.state.showGetBtn ?
                             <Text style={styles.getText} onPress={() => this._setCountDown()}>重新获取验证码</Text>
                             :
                            <Text>{this.state.countDonwSecond}s后重新获取验证码</Text>}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:"relative",
        paddingHorizontal:setSize(40),
        paddingTop:setSize(200)
    },
    inputContainer:{
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        marginVertical:setSize(60)
    },
    inputItem:{      
        borderBottomWidth:1,
        width:setSize(50),
        height:setSize(50)
    },
    input:{
        paddingVertical:0,
        textAlign:"center",
        color:"#34495e",
        fontSize:setSizeText(42),
        fontWeight:"bold"
    },
    getText:{
        color:"#59b8fa"
    }
})