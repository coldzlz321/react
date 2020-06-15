import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { setSize, setSizeText } from '@/utils/common/scale';
import Touchable from "@/components/Touchable/Touchable";
import { BoxShadow } from "react-native-shadow"
import Loading from "@/components/higherOrderComponents/loading";
import TimerMixin from 'react-timer-mixin';
import loading from '@/components/higherOrderComponents/loading';
import { defaultProps } from '@ant-design/react-native/lib/search-bar/PropsType';


const userIcon = require("@/img/login/icon-login-user.png");
const passwordIcon = require("@/img/login/icon-login-password.png");


@loading(state => state.loading)
class LoginIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showShadow: false,
            btnWidth: 100,
            activeTabIndex: 0,
            tabArr: ["短信验证码", "用户密码"],
            loading:true
        }
        

        
    }

    static defaultProps = {
          loading:false
    }
    componentDidMount(){
        
        TimerMixin.setTimeout(() => {defaultProps.loading = false;this.setState({loading:false});},5)
    
        
    }




    render() {
        let { navigation } = this.props;
        const shadowOpt = {
            width: this.state.btnWidth,
            height: setSize(120),
            color: this.state.showShadow ? "#000" : "#fff",
            border: 5,
            radius: 5,
            opacity: 0.12,
            x: 0,
            y: 0

        }
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.loginTitleRow}>
                        <Text
                            style={styles.loginTitle}
                        >
                            欢迎登录
                    </Text>
                    </View>
                    <View style={styles.loginContentRow}>
                        <View style={styles.loginTabRow}>
                            {
                                this.state.tabArr.map((item, index) =>
                                    <Text 
                                    onPress={() => this.setState({activeTabIndex:index})}
                                    key={index} style={[styles.loginTabItem,
                                        {marginRight:index == 0 ? 50 : 0,borderBottomWidth:index == this.state.activeTabIndex ? 1 : 0,
                                        borderBottomColor:"#59b8fa" ,color: index == this.state.activeTabIndex ? "#59b8fa" : "#34495e"}]}>{this.state.tabArr[index]}</Text>
                                )

                            }
                        </View>
                        <View style={styles.loginInputRow}
                            onLayout={(event) => {
                                console.log(setSize(event.nativeEvent.layout.height), 2);
                                this.setState({ btnWidth: event.nativeEvent.layout.width })
                            }}
                        >
                            <Image source={userIcon} style={styles.loginImg} />
                            <TextInput textContentType="username" placeholderTextColor="#999" placeholder="请输入用户名" ref={(ref) => this.user = ref} style={styles.loginInput} />
                        </View>
                        {
                            this.state.activeTabIndex == 1 ?
                                <View style={[styles.loginInputRow, { marginBottom: setSize(80) }]}>
                                    <Image source={passwordIcon} style={styles.loginImg} />
                                    <TextInput secureTextEntry={true} textContentType="password" placeholder="请输入密码" placeholderTextColor="#999" ref={(ref) => this.password = ref} style={styles.loginInput} />
                                </View>
                                :
                                <View style={[styles.loginInputRow, { marginBottom: setSize(80) }]}>
                                    <Image source={passwordIcon} style={styles.loginImg} />
                                    <TextInput textContentType="password" placeholder="请输入验证码" placeholderTextColor="#999" ref={(ref) => this.password = ref} style={styles.loginInput} />
                                    <Text style={styles.getCode}>获取验证码</Text>
                                </View>
                        }
                        <BoxShadow setting={shadowOpt} >
                            <Touchable onPressIn={() => { this.setState({ showShadow: true }) }}
                                onPressOut={() => { this.setState({ showShadow: false }) }}
                                style={styles.loginBtn} >
                                <Text style={[styles.loginBtn, { width: this.state.btnWidth }]}  >
                                    登录
                                </Text>
                            </Touchable>
                        </BoxShadow>
                    </View>
                    <View style={styles.loginFooterRow}>
                        <Text onPress={() => navigation.navigate("resetPassword")} style={styles.forgetText}>忘记密码?</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: setSize(60),
        alignContent: "center",
        justifyContent: "center"
    },
    loginTitleRow: {
        height: setSize(60),
        marginBottom: setSize(60)
    },
    loginTitle: {
        height: setSize(60),
        fontSize: setSizeText(42),
        textAlign: "center",
        textAlignVertical: "center"
    },

    loginImg: {
        width: setSize(60),
        height: setSize(60),
        marginTop: setSize(50),
        marginRight: setSize(20),
        resizeMode: "cover",

    },
    loginInputRow: {
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        flexDirection: "row",
        height: setSize(160)
    },
    loginInput: {
        height: setSize(60),
        marginTop: setSize(50),
        flex: 1,
        paddingVertical: 0,

    },
    loginBtnRow: {

        height: setSize(120),
        marginTop: setSize(60),
        alignItems: "center",
        justifyContent: "center",
    },
    loginBtn: {
        height: setSize(120),
        textAlign: "center",
        textAlignVertical: "center",
        color: "#ccc",
        fontSize: setSizeText(42),
        backgroundColor: "#3498db",
        borderRadius: setSize(8)
    },
    loginFooterRow: {
        position: "relative",
        marginTop: setSize(60),
        height: setSize(60),
    },
    forgetText: {
        position: "absolute",
        right: 0,
        top: 0,
        fontSize: setSizeText(28),
        height: setSize(60),
        color: "#999",
        textAlign: "center",
        textAlignVertical: "center"
    },
    getCode: {
        height: setSize(160),
        textAlign: "center",
        textAlignVertical: "center",
        color: "#59b8fa",
        fontSize: setSize(32),
        marginLeft: setSize(40),
        fontWeight:"bold"
    },
    loginTabRow:{
        height:setSize(80),
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center"
    },
    loginTabItem:{
        height:setSize(80),
        textAlign:"center",
        textAlignVertical:"center",
        lineHeight:setSize(80),
       
    }
})

export default LoginIndex;