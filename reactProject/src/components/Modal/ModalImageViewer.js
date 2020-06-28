import React,{Component} from "react";
import {View,Text,StyleSheet,Modal} from "react-native"
import ImageViewer from "react-native-image-zoom-viewer";

const imgs = [{
    url:"",
    props:{
        source:require("@/img/startup/lbxx.jpg")
        }
    },{
        url:"",
        props:{
            source:require("@/img/startup/lbxxS.jpg")
            }
        }]

export default class ModalImageViewer extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false
        }
        this._showModal.bind(this);
        this._hideModal.bind(this);
    }

    _showModal(){
        this.setState({showModal:true})
    }

    _hideModal(){
        this.setState({showModal:false})
    }

    render(){
        return (
            <Modal
            visible={this.state.showModal}
            transparent={false}
            >
                <ImageViewer 
                    imageUrls={imgs}
                />
            </Modal>
        )
    }
}