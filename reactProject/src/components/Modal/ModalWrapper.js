import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { setSize, setSizeText } from "@/utils/common/scale"
import Touchable from "@/components/Touchable/Touchable"

export default class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.showModal.bind(this);
        this.hideModal.bind(this);
    }

    showModal() {
        this.setState({ showModal: true })
    }

    hideModal() {
        this.setState({ showModal: false })
    }

    render() {
        return (
            //    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}>
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => this._hideModal()}
                visible={this.state.showModal}
                hardwareAccelerated={true}

            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <View
                        style={styles.ModalWrapper}
                    >
                        <Text style={styles.modalTitle}>通知</Text>
                        <View
                            style={styles.ModalContent}
                        >

                        </View>
                        <Touchable onPress={() => this.hideModal()} TouchComponent={TouchableOpacity} style={styles.modalBottom} activeOpacity={0.8}>
                            <Text style={styles.modalBottomText}>我知道了</Text>
                        </Touchable>
                    </View>

                </View>
            </Modal>
            // </View>

        )
    }
}

const styles = StyleSheet.create({
    ModalWrapper: {
        width: setSize(600),
        height: setSize(500),
        position: "absolute",
        backgroundColor: "#fff",
        top: "50%",
        left: "50%",
        borderRadius: setSize(20),
        marginLeft: setSize(-300),
        marginTop: setSize(-250),
        overflow: "hidden",
        shadowColor:"rgba(255,0,0,1)",
        shadowOffset:{
            width:0,
            height:0
        },
        shadowRadius:setSize(300),
        shadowOpacity:1
    },
    modalTitle: {
        width: setSize(600),
        height: setSize(100),
        textAlign: "center",
        textAlignVertical: "center",
        borderBottomColor: "#dcdcdc",
        borderBottomWidth: 1,
        color: "#34495e"
    },
    ModalContent: {
        width: setSize(600),
        height: setSize(300),
        // borderBottomColor: "#dcdcdc",
        // borderBottomWidth: 1
    },
    modalBottom: {
        flex: 1

    },
    modalBottomText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#3498db",
        color: "#fff",
        fontSize: setSize(40)
    }

})