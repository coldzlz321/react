import React, { Component } from 'react';

import {  Image, View, Text, StyleSheet, ScrollView } from 'react-native'

import { setSize, setSizeText } from '@/utils/common/scale'

import Swiper from 'react-native-swiper';


import Config from '@/styles/config.js'


import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

const imgs = [require("@/img/startup/lbxx.jpg"), require("@/img/startup/lbxxS.jpg")]

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            activeTab: 0,
            layout: []
        }
        this._renderTab.bind(this)
        this._tabClick.bind(this)
        this._layout.bind(this);
    }

    _tabClick(event, index) {

        this.setState({ activeTab: index },
            () => {
                this.tableView.goToPage(index);

                this.scrollContainer.scrollTo({ x: this.state.layout[index], y: 0, animated: true })
            })
    }
    _layout(event, index) {
        let { x, y, width, height } = event.nativeEvent.layout;
        let arr = this.state.layout.slice(0);
        arr[index] = Math.round(x)

        this.setState({ layout: arr });
    }

    _renderTab() {
        return (
            <View style={{ height: setSize(60) }}>
                <ScrollView ref={(el) => this.scrollContainer = el} horizontal={true} style={{ backgroundColor: "rgba(0,255,0,1)" }}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.state.tabItem.map((item, index) => (

                        <Text onLayout={(event) => this._layout(event, index)} key={index} onPress={(event) => this._tabClick(event, index)}
                            style={{ color: "#fff", fontSize: this.state.activeTab == index ? setSizeText(40) : setSizeText(32), backgroundColor: this.state.activeTab == index ? "rgba(255,0,0,1)" : "rgba(0,0,0,1)", flex: 1, paddingHorizontal: 10, textAlign: "center", textAlignVertical: "center", overflow: "scroll" }}>{"tab" + item}</Text>

                    ))}

                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <>
                <View style={styles.swiper}>
                    <Swiper
                        horizontal={true}

                        showsPagination={true}
                        paginationStyle={{ bottom: setSize(10) }}
                        autoplay={true}
                        removeClippedSubviews={false}
                        autoplayTimeout={3}
                        loop={true}
                        borderRadius={10}
                        bounces={true}
                        borderRadius={setSize(20)}
                        dot={<View style={{    //未选中的圆点样式
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            width: setSize(70),
                            height: setSize(12),
                            borderRadius: setSize(6),
                            marginLeft: setSize(3),
                            marginRight: setSize(3),
                            marginTop: setSize(9),
                            marginBottom: setSize(9),
                        }}
                        />}
                        activeDot={<View style={{    //选中的圆点样式'#007aff'
                            backgroundColor: "#fff",
                            width: setSize(70),
                            height: setSize(12),
                            borderRadius: setSize(6),
                            marginLeft: setSize(3),
                            marginRight: setSize(3),
                            marginTop: setSize(9),
                            marginBottom: setSize(9),
                        }}
                        />}>
                        <Image style={styles.swipeImg} resizeMode="cover" source={imgs[0]} />
                        <Image style={styles.swipeImg} resizeMode="cover" source={imgs[1]} />
                    </Swiper>
                </View>
                <ScrollableTabView
                    ref={(el) => this.tableView = el}
                    style={styles.container}
                    tabBarPosition="top"
                    renderTabBar={() => this._renderTab()}
                    onChangeTab={(obj) => {
                        this.setState({ activeTab: obj.i }, () => {
                            this.scrollContainer.scrollTo({ x: this.state.layout[obj.i], y: 0, animated: true })
                        }
                        )

                    }}
                >
                    {this.state.tabItem.map((item, index) => (
                        <View tabLable={"tab" + index} style={{ height: setSize(400), backgroundColor: "rgba(255,0,0,1)", justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: "center" }} key={index} tabLable={"tab " + item}>{"Tab" + item} </Text>
                        </View>
                    ))}


                </ScrollableTabView>



            </>


        )
    }
}

const styles = StyleSheet.create({
    swiper: {
        paddingHorizontal: setSize(40),
        height: setSize(300),
        overflow: "hidden",
        marginTop: Config.status_height,
    },
    container: {
        marginHorizontal: setSize(40),
        backgroundColor: "rgba(255,0,0,1)",
        height: setSize(200)
    },
    swipeImg: {
        flex: 1,

    }
})