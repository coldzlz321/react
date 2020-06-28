import React,{Component} from 'react';
import { TouchableWithoutFeedback } from 'react-native';



const debounceMilliSecond = 500;


export default class Touchable extends Component{
    constructor(props,context){
        super(props,context);
        
    }

    debouncePress(){
        console.log(1)
        let { onPress } = this.props;
        const nowClickTime = Date.now();
        if((!this.lastClickTime || Math.abs(nowClickTime - this.lastClickTime) > debounceMilliSecond)){
            this.lastClickTime = nowClickTime;
            onPress && onPress();
        }
    }

    render(){
        const {TouchComponent = TouchableWithoutFeedback,children,onPress,...rest} = this.props
        return (
            <TouchComponent
                {...rest}
                onPress={this.debouncePress.bind(this)}
            >
                {children}
            </TouchComponent>
        )
    }
}