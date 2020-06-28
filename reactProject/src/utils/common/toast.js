import React,{Component} from 'react';
import {ToastAndroid} from 'react-native'
import {Toast} from '@ant-design/react-native';

export const toastC = (content,duration = 300) => {
    // Toast.info(content,duration,onClose,mask);
    ToastAndroid.showWithGravity(content,duration,ToastAndroid.CENTER)
}

export const toastB = (content,duration = 300) => {
    // Toast.info(content,duration,onClose,mask);
    ToastAndroid.showWithGravity(content,duration,ToastAndroid.BOTTOM)
}

export const toastT = (content,duration = 300) =>  {
    ToastAndroid.showWithGravity(content,duration,ToastAndroid.TOP)
}

