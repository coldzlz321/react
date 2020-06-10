import {Toast} from '@ant-design/react-native';

export const toast = (content,duration = 0.6,onClose,mask = true) => {
    Toast.info(content,duration,onClose,mask);
}

