import React, { Component } from "react"
import { View, Text, ScrollView, Modal, FlatList ,StyleSheet} from "react-native"
import SearchBar from "@/components/SearchBar/SearchBar"
import { setSize, setSizeText } from "@/utils/common/scale";
import Touchable from "../Touchable/Touchable";


const DATA = [1,2,3,4,56,4234,234,234,134,1255,1,2,3,4,56,4234,234,234,134,1255,1,2,3,4,56,4234,234,234,134,1255]

export default class ModalScroll extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        let {showModal} = this.props
        let right = (index) => {
            console.log(index)
            return ((index + 1) % 2 == 0 ? 0 : 30)
        }
        return (
            <Modal>
                <View style={styles.modalContainer}>
                    <Touchable onPress={() => showModal(false)}>
                    <View style={styles.closeContainer}> 
                        <Text style={styles.closeText}>关闭</Text>
                    </View>
                    </Touchable>
                    <ScrollView
                    style={{flex:1}}
                    
                    nestedScrollEnabled={true}
                    onTouchCancel={false}
                    showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.searchContainer}>
                            <SearchBar
                            editable={false}
                            showCancel={false}
                            />
                        </View>
                    
                        <FlatList 
                        data={DATA}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item,index}) =>
                    <View style={{height:setSize(200),flex:0.5,backgroundColor:"rgba(255,0,0,1)",marginBottom:setSize(40),marginRight:setSize(right(index))}}>
                        <Text style={{height:setSize(200),flex:1,textAlign:"center",textAlignVertical:"center",color:"#fff"}}>
                            你好
                        </Text>
                    </View>    
                    }
                        />
                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        position:"relative",
        paddingHorizontal:setSize(20)
    },
    searchContainer:{
        height:setSize(72),
    },
    closeContainer:{
        position:"absolute",
        right:setSize(50),
        top:setSize(50),
        width:setSize(100),
        height:setSize(100),
        zIndex:99
    },
    closeText:{
        width:setSize(100),
        height:setSize(100),
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:setSizeText(42)
    }
})