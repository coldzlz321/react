import React,{Component} from 'react';
import Picker from "react-native-picker";
import {View,Text,StyleSheet,Modal} from "react-native"
import { setSize, setSizeText } from '@/utils/common/scale';
import Touchable from "@/components/Touchable/Touchable";

export default class ModalSwipeOut extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            currentDate:this._getCurrentDate()
        }
        this._hideModal.bind(this);
        this._showModal.bind(this);
        this._getCurrentDate.bind(this);
        this._createDateData.bind(this);
        this._showDatePicker.bind(this)
    }

    _showModal(){
        this.setState({showModal:true})
    }

    _hideModal(){
        this.setState({showModal:false})
    }
    _getCurrentDate(){
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = (currDate.getMonth()+1).toString()
        month = month.padStart(2,'0')
        var dateDay = currDate.getDate().toString()
        dateDay = dateDay.padStart(2,'0')
        let time = year+'-'+month+'-'+dateDay
        return time;
      }
      //组装日期数据
      _createDateData(){
        let date = [];
        var currDate = new Date()
        var year = currDate.getFullYear()
        var month = currDate.getMonth()+1
        for(let i=1970;i<=year;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
      }
      //打开日期选择 视图
      _showDatePicker() {
        // var year = ''
        // var month = ''
        // var day = ''
        // var dateStr = this.state.currentDate
        // //console.log('dateStr',dateStr)
        // year = dateStr.substring(0,4)
        // month = parseInt(dateStr.substring(5,7))
        // day = parseInt(dateStr.substring(8,10))
        // Picker.init({
        //   pickerTitleText:'时间选择',
        //   pickerCancelBtnText:'取消',
        //   pickerConfirmBtnText:'确定',
        //   selectedValue:[year+'年',month+'月',day+'日'],
        //   pickerBg:[255,255,255,1],
        //   pickerData: this._createDateData(),
        //   pickerFontColor: [33, 33 ,33, 1],
        //   onPickerConfirm: (pickedValue, pickedIndex) => {
        //       var year = pickedValue[0].substring(0,pickedValue[0].length-1)
        //       var month = pickedValue[1].substring(0,pickedValue[1].length-1)
        //       month = month.padStart(2,'0')
        //       var day = pickedValue[2].substring(0,pickedValue[2].length-1)
        //       day = day.padStart(2,'0')
        //       let str = year+'-'+month+'-'+day
        //       this.setState({
        //         currentDate:str,
        //       })
        //   },
        //   onPickerCancel: (pickedValue, pickedIndex) => {
        //       console.log('date', pickedValue, pickedIndex);
        //   },
        //   onPickerSelect: (pickedValue, pickedIndex) => {
        //       console.log('date', pickedValue, pickedIndex);
        //   }
        // });
        let data = ["身份证","人民警察证","营业执照","驾驶证","组织机构代码证","事业单位法人证","其他证件"]

        let arr = [{
            证件类型:data
        }];
        

      
        
           
        Picker.init({
              pickerTitleText:'证件类型',
              pickerCancelBtnText:'取消',
              pickerConfirmBtnText:'确定',
              selectedValue:["证件类型","身份证"],
              pickerBg:[255,255,255,1],
              pickerData: arr,
              pickerFontColor: [33, 33 ,33, 1],
              pickerTextEllipsisLen:14,
              onPickerConfirm: (pickedValue, pickedIndex) => {
                    let typeStr = pickedValue.toString().substring(5)
                  this.setState({
                    currentDate:typeStr,
                  })
              },
              onPickerCancel: (pickedValue, pickedIndex) => {
                  
              },
              onPickerSelect: (pickedValue, pickedIndex) => {
                  
              }
            });
        Picker.show();
      }
    
   
    render(){
        // let btnLeft = {text:"清空",type:"delete",onPress:() => console.log(1)}
        return (
        <Modal
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this._hideModal()}
        >
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    {/* <SwipeOut 
                    
                    >
                        <View style={styles.swipeContent}>
                            <Text>具体内容</Text>
                        </View>
                    </SwipeOut> */}
                    <Touchable onPress={() => this._showDatePicker()}>
                            <Text style={{fontSize:setSizeText(42)}}>{this.state.currentDate}</Text>
                    </Touchable>
                </View>
            </View>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.4)",
        position:"relative"
    },
    cardContainer:{
        width:setSize(600),
        height:setSize(500),
        borderRadius:setSize(15),
        position:"absolute",
        left:"50%",
        top:"50%",
        marginLeft:setSize(-300),
        marginTop:setSize(-250),
        backgroundColor:"#fff",
        overflow:"hidden",
        alignItems:"center",
        justifyContent:"center"
        
    },
    swipeContent:{
        height:setSize(100),
        width:setSize(600),
        alignItems:"center",
        justifyContent:"center"
    }
})
