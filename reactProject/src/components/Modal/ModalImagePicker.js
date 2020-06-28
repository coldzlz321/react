import React, { Component } from "react";
import { View, Text, StyleSheet, Modal,Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import CropImagePicker from 'react-native-image-crop-picker';
import Touchable from "../Touchable/Touchable";
import { setSize } from "@/utils/common/scale";

export default class ModalImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            avatarSource:""
        }
        this._hideModal.bind(this);
        this._showModal.bind(this);
        this.onClickChoosePicture.bind(this)
    }

    _showModal(){
        this.setState({showModal:true})
    }

    _hideModal(){
        this.setState({showModal:false});
    }

    onClickChoosePicture = (index) => {
        const options = {
            title: '',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                this.setState({
                    avatarSource: source,
                });
                console.warn(this.state.avatarSource.uri);
            }
        });
        // CropImagePicker.openPicker({
        //     width: setSize(150),
        //     height: setSize(150),
        //     cropping: true,
        //   }).then((image) => {
        //       console.log(image.path)
        //     this.setState({avatarSource:image.path})
        //   });
    }


    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.showModal}
                onRequestClose={() => this._hideModal()}
            >
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <View>
                            <Touchable onPress={() => this.onClickChoosePicture()}>
                                <View style={styles.btnContainer}>
                                    <Text style={styles.btnText}>拍照</Text>
                                </View>
                            </Touchable>
                            <Touchable onPress={() => this.onClickChoosePicture(1)}>
                                <View style={styles.btnContainer}>
                                    <Text style={styles.btnText}>视频</Text>
                                </View>
                            </Touchable>
                        </View>
                        <Image source={this.state.avatarSource} style={styles.headStyle} />
                        
                    </View>
                    
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position:"relative",
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    cardContainer:{
        position:"absolute",
        top:"50%",
        left:"50%",
        width:setSize(600),
        height:setSize(500),
        borderRadius:setSize(15),
        backgroundColor:"#fff",
        marginLeft:setSize(-300),
        marginTop:setSize(-250),
        alignItems:"center",
        justifyContent:"center"
    },
    btnContainer:{
        width:setSize(100),
        height:setSize(100),
        borderRadius:setSize(100),
        borderWidth:1,
        borderColor:"#dcdcdc",
        marginBottom:setSize(40),
        overflow:"hidden"
    },
    btnText:{
        width:setSize(100),
        height:setSize(100),
        textAlign:"center",
        textAlignVertical:"center"
    },
    headStyle:{
        width:setSize(150),
        height:setSize(150),
        resizeMode:"cover"
    }
})