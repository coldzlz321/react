import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableHighlightBase,Image,Alert } from 'react-native';
import SearchBar from "@/components/SearchBar/SearchBar.js";
import Touchable from "@/components/Touchable/Touchable.js";
import { ScrollView } from 'react-native-gesture-handler';
import { setSize, deviceWidth, setSizeText } from "@/utils/common/scale.js"


const delIcon = require("@/img/search/icon-search-del.png");
export default class VideoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpread: false,
            scrollWidth: 0
        }
        this._confirmClear.bind(this);

    }

    _confirmClear(){
        console.log(5)
        Alert.alert("",
        "是否清除历史记录",[
            {"text":"取消",onPress:() => {}},
            {"text":"确认",onPress:() => {}}
        ])   
    }




    render() {
        return (
            <View
                style={styles.container}>
                <SearchBar navigation={this.props.navigation} ref={(ref) => { this.searchBar = ref }} />
                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>热搜</Text>
                    </View>
                    <ScrollView
                        height={260}
                        alwaysBounceVertical={true}
                        onLayout={(event) => {
                            let { x, y, width, height } = event.nativeEvent.layout;
                            this.setState({
                                scrollWidth: width
                            })
                        }}
                    >
                        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                            {Array(10).fill("").map((item, index) => (
                                <Touchable onPress={() => this.searchBar.setInputText("你好")} key={index} style={styles.rankItem}>
                                    <View style={{
                                        width: this.state.scrollWidth / 2,
                                        height: setSize(70),
                                        flexDirection: "row",
                                        alignItems: "center",
                                        // backgroundColor:index %2 == 0 ? "#fff" :"rgba(255,0,0,1)"
                                    }}>
                                        <Text style={{ textAlign:"center",width:setSize(60),fontSize: setSizeText(32), fontWeight: index < 4 ? "bold" : "normal", color: index < 4 ? "#000" : "#999" }}>{index + 1}&nbsp;</Text>
                                        <Text style={{ fontSize: setSizeText(32) }}>老大</Text>
                                    </View>
                                </Touchable>
                            ))}
                        </View>
                    </ScrollView>

                </View>
                <View style={styles.section, { height: setSize(this.state.isSpread ? 550 : 360) }}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>搜索历史</Text>
                        <Text onPress={(text) => { var self = this;this.setState({ isSpread: !this.state.isSpread },() =>{!this.state.isSpread && self.histroyScroll.scrollTo({y:0,animated:false})}) }} style={styles.sectionTitleBtn}>{this.state.isSpread ? "收起" : "展开"}</Text>
                    </View>
                    <ScrollView
                        scrollEnabled={this.state.isSpread}
                        showsVerticalScrollIndicator={false}
                        ref={(ref) => this.histroyScroll = ref}
                        marginBottom={30}
                    >
                        <View ref={(ref) => this.historyContainer = ref} style={{
                            flexDirection: "row", flexWrap: "wrap"
                        }}>
                            {Array(40).fill("").map((item, index) => (
                                <Text onPress={() => this.searchBar.setInputText("你好")} key={index} numberOfLines={1} style={styles.historyItem}>点击了你好</Text>
                            ))
                            }
                        </View>
                    </ScrollView>
                    <Touchable  onPress={() => this._confirmClear()}>
                        <View style={styles.delContainer}>
                            <Image resizeMode="cover" source={delIcon} style={styles.delImg} />
                            <Text style={styles.delText}>清空历史记录</Text>
                        </View>
                    </Touchable>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: setSize(20),
        paddingTop: setSize(20)
    },
    sectionTitleRow: {
        flexDirection: "row",
        height: setSize(60),
        position: "relative",
        marginBottom: setSize(10)
    },
    sectionTitle: {
        position: "absolute",
        left: setSize(0),
        top: setSize(0),
        height: setSize(60),
        textAlign: "center",
        lineHeight: setSize(60),
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: setSizeText(28)
    },
    sectionTitleBtn: {
        position: "absolute",
        right: setSize(0),
        top: setSize(0),
        height: setSize(60),
        textAlign: "center",
        lineHeight: setSize(60),
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: setSizeText(28)
    },
    section: {

        height: setSize(450),
        flexDirection: "column",
        marginBottom: setSize(10),

    },
    rankItem: {

    },
    historyItem: {
        height: setSize(60),
        borderRadius: setSize(20),
        fontSize: setSize(32),
        margin: setSize(10),
        backgroundColor: "#eee",
        paddingHorizontal: setSize(20),
        color: "#999",
        textAlign: "center",
        textAlignVertical: "center"
    },
    delText:{
        height:setSize(60),
        textAlign:"center",
        textAlignVertical:"center",
        marginLeft:setSize(10),
        color:"#999"
    },
    delImg:{
        width:setSize(36),
        height:setSize(36),
        
    },
    delContainer:{
        height:setSize(60),
        backgroundColor:"rgba(255,0,0,1)",       
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    }
})