import React,{Component} from 'react';
import { View,Text,Image,StyleSheet,ScrollView,FlatList} from "react-native";
import SearchBar from "@/components/SearchBar/SearchBar"
import Touchable from "@/components/Touchable/Touchable"
import { setSize } from '@/utils/common/scale';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import ModalSwipeOut from "@/components/Modal/ModalSwipeOut"


const itemImg = require("@/img/startup/lbxx.jpg");

export default class PersonalHome extends Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            halfWidth:0,
            canScroll:true,
            data:[{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},
            {time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"},{time:"2020-10-07 10:33",user:"老王"}]
        }
        this._renderItem.bind(this)
        this._changeCanScroll.bind(this);
    }

    _renderItem(item,index){
        return (
            <View style={[styles.itemContainer,{width:this.state.halfWidth}]}>
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

    _changeCanScroll(event,index){
        let top = event.nativeEvent.contentOffset.y
        if(index == 1){
            if(top >= setSize(72)){
                this.setState({canScroll:false})
            }else{
                this.setState({canScroll:true})
            }
        }else{
            // if(event.nativeEvent.contentOffset.y <= 0){
                
            //     this.setState({canScroll:true})
            // }else{
            //     this.setState({canScroll:false})
            // }
            if(top <= 0){
                this.setState({canScroll:true})
            }
        }
        
    }

    render(){
        let {navigation} = this.props
        return (
            <View style={styles.container}>
                <ScrollView
                nestedScrollEnabled={true}
                onScroll={(event) => this._changeCanScroll(event,1)}
            
                scrollEnabled={this.state.canScroll}
                showsVerticalScrollIndicator={false}
                style={{flex:1}} onLayout={({nativeEvent:{layout:{width:x}}})=> this.setState({halfWidth:x/2})}>
                  
                        <Touchable onPress={() => navigation.navigate("video")}>
                            <View>
                                <SearchBar editable={false} autoFocus={false} showCancel={false} />
                            </View>
                        </Touchable>
                        <Touchable onPress={() => this.model._showModal()}>
                            <View>
                                <Text style={{flex:1,height:setSize(50),textAlign:"center",textAlignVertical:"center",fontSize:setSize(32)}}>打开弹框</Text>
                            </View>
                        </Touchable>
                         <ModalSwipeOut ref={(ref) => this.model = ref} />
                    {/* <View style={styles.scrollTab}>
                        <ScrollableTabBar>

                        </ScrollableTabBar>
                    </View> */}
                    <View style={{marginTop:50,height:setSize(1200)}}>
                        <FlatList
                        onScroll={(event) => this._changeCanScroll(event)}
                        numColumns={2}
                        keyExtractor={(item,index) => index.toString()}
                        data={this.state.data}
                        
                        renderItem={(item,index) => this._renderItem(item,index)}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:setSize(20),
       paddingTop:setSize(50)
    },
   itemContainer:{
       height:setSize(300),
       
       borderRadius:setSize(10),
       backgroundColor:"rgba(255,0,0,1)",
       marginBottom:setSize(20),
   },
   itemImgRow:{
    flex:1,
    height:setSize(150)
   },
   itemImg:{
    flex:1,
    
    marginRight:setSize(20)
       
       
   },
   itemContentRow:{
       
   }
})