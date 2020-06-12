import React, { Component } from 'react';
import { View, Text, StyleSheet,KeyboardAvoidingView } from 'react-native';
import SearchBar from "@/components/SearchBar/SearchBar.js";
import Touchable from "@/components/Touchable/Touchable.js";
import { ScrollView } from 'react-native-gesture-handler';
import { setSize,deviceWidth, setSizeText } from "@/utils/common/scale.js"



export default class VideoHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpread: false,
            scrollWidth:0
     
        }
      
    }

    render() {
        return (
            <View
            
            style={styles.container}>
                <SearchBar />
                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>热搜</Text>
                    </View>
                    <ScrollView
                        height={300}
                        onLayout={(event) => {
                            let { x, y, width, height } = event.nativeEvent.layout;
                            this.setState({
                                scrollWidth:width
                            })
                        }}
                        
                    >
                        <View style={{  flexWrap: "wrap",flexDirection:"row" }}>
                            {Array(10).fill("").map((item, index) => (
                                <Touchable key={index} style={styles.rankItem}>
                                    <View style={{
                                        
                                        width:this.state.scrollWidth / 2,
                                        height:setSize(70),
                                        flexDirection: "row",
                                        alignItems:"center",
                                        // backgroundColor:index %2 == 0 ? "#fff" :"rgba(255,0,0,1)"
                                    }}>
                                        <Text style={{fontSize:setSizeText(32),fontWeight:index < 4 ? "bold" : "normal",color:index < 4 ? "#000" : "#999"}}>{index + 1}&nbsp;</Text>
                                        <Text style={{fontSize:setSizeText(32)}}>老大</Text>
                                    </View>
                                </Touchable>

                            )

                            )


                            }
                        </View>
                    </ScrollView>

                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitleRow}>
                        <Text style={styles.sectionTitle}>搜索历史</Text>
                        <Text style={styles.sectionTitleBtn}>{this.state.isSpread ? "收起" : "展开"}</Text>
                    </View>
                    <ScrollView>
                        <Touchable>
                            <Text></Text>
                        </Touchable>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal:setSize(20),
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
        flex:1,
        height:setSize(800),
        flexDirection: "column",
        marginBottom: setSize(10),
        
    },
    rankItem: {     

    }
})