import React, { Component } from 'react';
import { Clipboard, View, Text, Image, StyleSheet, ScrollView, FlatList, RefreshControl, TimePickerAndroid, EventEmitter, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import SearchBar from "@/components/SearchBar/SearchBar"
import Touchable from "@/components/Touchable/Touchable"
import { setSize, setSizeText } from '@/utils/common/scale';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import ModalCodeInput from "@/components/Modal/ModalCodeInput"
import DateTimePicker from "@react-native-community/datetimepicker"
import Back from "@/components/higherOrderComponents/backHandler"
import { Menu, MenuOptions, MenuOption, renderers, MenuTrigger, MenuProvider } from "react-native-popup-menu"
import { toastB, toastC } from '@/utils/common/toast';
import Swiper from 'react-native-swiper'

const { Popover, SlideInMenu } = renderers

const searchIcon = require("@/img/search/icon-search.png")
const itemImg = require("@/img/startup/lbxx.jpg");
const btnS = ["通知", "扫一扫"]

@Back()
export default class PersonalHome extends Component {
    constructor(props) {
        super(props);


        this.state = {
            swiperItems: ["今夜大暴雨", "明天大雨", "后天晴朗", "后天晴朗2"],
            dateStr: new Date().toJSON().substring(0, 10),
            date: new Date(),
            mode: "date",
            showTime: false,
            refreshing: false,
            showModal: false,
            halfWidth: 0,
            canScroll: true,
            data: [{ time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" },
            { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }, { time: "2020-10-07 10:33", user: "老王" }]
        }
        this._renderItem.bind(this)
        this._changeCanScroll.bind(this);
        this._showTimePicker.bind(this)
        this._changeTime.bind(this)

    }

    _renderItem(item, index) {
        return (
            <View style={[styles.itemContainer, { width: this.state.halfWidth }]}>
                <View style={[styles.itemImgRow]}>
                    <Image resizeMode="cover" source={itemImg} style={styles.itemImg} />
                </View>
                <View style={styles.itemContentRow}>
                    <Text>{item.time}</Text>
                    <Text>{item.user}</Text>
                </View>
            </View>

        )
    }

    async showClipboard() {
        const str = await Clipboard.getString()
        toastC(str);
    }

    _changeModalShow(show) {
        this.setState({
            showModal: show
        })
    }

    _changeTime(event, selectedValue = new Date()) {

        this.setState({ date: selectedValue, showTime: false });
    }

    _showTimePicker() {
        this.setState({ showTime: true })
    }

    _changeCanScroll(event, index) {
        let top = event.nativeEvent.contentOffset.y
        if (index == 1) {
            if (top >= setSize(72)) {
                this.setState({ canScroll: false })
            } else {
                this.setState({ canScroll: true })
            }
        } else {
            // if(event.nativeEvent.contentOffset.y <= 0){

            //     this.setState({canScroll:true})
            // }else{
            //     this.setState({canScroll:false})
            // }
            if (top <= 0) {
                this.setState({ canScroll: true })
            }
        }

    }

    render() {
        let { navigation } = this.props
        return (
            <View style={styles.container}>
                <ScrollView
                    nestedScrollEnabled={true}
                    onScroll={(event) => this._changeCanScroll(event, 1)}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.setState({ refreshing: false })} />}
                    scrollEnabled={this.state.canScroll}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }} onLayout={({ nativeEvent: { layout: { width: x } } }) => this.setState({ halfWidth: x / 2 })}>

                    <Touchable onPress={() => navigation.navigate("video")}>
                        <View style={{ position: "relative" }}>
                            <View style={styles.swiper}>
                                <Swiper
                                    horizontal={false}
                                    autoplayTimeout={3}
                                    loop={true}
                                    borderRadius={10}
                                    bounces={true}
                                    showsVerticalScrollIndicator={false}
                                    autoplay={true}
                                    showsButtons={false}
                                    removeClippedSubviews={true}
                                    showsPagination={false}
                                >
                                    {
                                        this.state.swiperItems.map((item, index) =>

                                            <Text style={styles.swiperItem}>{item}</Text>

                                        )

                                    }
                                </Swiper>
                            </View>
                            <SearchBar editable={false} autoFocus={false} showCancel={false} placeHolder="" />
                        </View>
                    </Touchable>
                    <Touchable onPress={() => this._changeModalShow(true)}>
                        <View>
                            <Text style={{ flex: 1, height: setSize(50), textAlign: "center", textAlignVertical: "center", fontSize: setSize(32) }}>打开弹框</Text>
                        </View>
                    </Touchable>
                    {this.state.showModal && <ModalCodeInput ref={(ref) => this.model = ref} modalShow={this._changeModalShow.bind(this)} />}
                    {/* <View style={styles.scrollTab}>
                        <ScrollableTabBar>

                        </ScrollableTabBar>
                    </View> */}
                    {/* <View style={{marginTop:50,height:setSize(1200)}}>
                        <FlatList
                        onScroll={(event) => this._changeCanScroll(event)}
                        numColumns={2}
                        keyExtractor={(item,index) => index.toString()}
                        data={this.state.data}
                        
                        renderItem={(item,index) => this._renderItem(item,index)}
                        />
                </View> */}
                    <View style={{ padding: setSize(100) }}>
                        <View style={{ height: setSize(200), alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,0,0,1)" }}>
                            <MenuProvider>
                                <Menu ref={(ref) => this.menu = ref} renderer={Popover} rendererProps={{ placement: 'left', preferredPlacement: 'top' }}>
                                    <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity }} style={{ width: setSize(200), marginTop: setSize(50), padding: setSize(20), backgroundColor: "rgba(255,0,0,1)" }}>
                                        <Image source={searchIcon} resizeMode="cover" style={{
                                            width: setSize(32),
                                            height: setSize(32)
                                        }} />
                                    </MenuTrigger>
                                    <MenuOptions>
                                        {btnS.map((btn, index) =>
                                            <MenuOption
                                                key={index}
                                                style={{ padding: 0, backgroundColor: '#f9f9f9' }}
                                                text={btn}
                                                customStyles={{
                                                    optionText: styles.optionText,
                                                    OptionTouchableComponent: TouchableWithoutFeedback,
                                                    optionTouchable: {
                                                        onPressIn: () => { },
                                                        onPressOut: () => { },
                                                    }
                                                }}
                                            />

                                        )}
                                    </MenuOptions>

                                </Menu>
                            </MenuProvider>
                        </View>
                    </View>
                    <Touchable onLongPress={() => { Clipboard.setString("事件"); this.showClipboard() }}
                     onPress={() => this._showTimePicker()}>
                        <View style={styles.timeBtnRow}>
                            <Text  style={styles.timeBtn}>事件</Text>
                        </View>
                    </Touchable>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{this.state.date.toJSON().substring(0, 10)}</Text>
                    </View>
                    {this.state.showTime && <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="calendar"
                        onChange={(event, selectedValue) => this._changeTime(event, selectedValue)}

                    />}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: setSize(20),
        paddingTop: setSize(50)
    },
    itemContainer: {
        height: setSize(300),

        borderRadius: setSize(10),
        backgroundColor: "rgba(255,0,0,1)",
        marginBottom: setSize(20),
    },
    itemImgRow: {
        flex: 1,
        height: setSize(150)
    },
    itemImg: {
        flex: 1,

        marginRight: setSize(20)


    },
    itemContentRow: {

    },
    timeBtnRow: {
        height: setSize(100),
        width:setSize(200),
        alignItems: "center",
        justifyContent: "center",
        marginTop: setSize(40),
        borderColor: "#dcdcdc",
        borderWidth: 1,
        borderRadius: setSize(20),
        alignSelf:"center"
    },
    timeBtn: {
        flex:1,
        width:setSize(200),
        textAlign: "center",
        textAlignVertical: "center",
        
    },
    timeContainer: {
        height: setSize(100),
        alignItems: "center",
        justifyContent: "center",

    },
    timeText: {
        flex: 1,

        textAlign: "center",
        textAlignVertical: "center",

    },
    MenuOptions: {
        backgroundColor: '#fff',
        width: setSize(200),
    },
    optionText: {
        color: '#000',
        textAlign: 'center',
        paddingVertical: setSize(30),
        fontSize: setSizeText(26),
    },
    swiper: {
        width: setSize(400),
        height: setSize(72),
        position: "absolute",
        top: 0,
        left: setSize(72),
        zIndex: 100,

    },
    swiperItem: {
        color: "#999",
        width: setSize(400),
        height: setSize(72),
        textAlign: "left",
        textAlignVertical: "center"
    }
})