import React,{Component} from 'react';
import { View,Text,Image,StyleSheet} from "react-native";
import ModalWrapper from "@/components/Modal/ModalWrapper"


export default class PersonalHome extends Component{
    constructor(props){
        super(props);
        
        
    }

    

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.centerText} onPress={() => this._modal.showModal()}>你好</Text>
                <ModalWrapper ref={(ref) => this._modal = ref} />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    centerText:{
        width:500,
        height:500,
        textAlign:"center",
        textAlignVertical:"center"
    }
})