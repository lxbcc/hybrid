import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    AsyncStorage,
    Button,
    FlatList,
    Image,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    BackHandler
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
const {width}=Dimensions.get('window')
const s = width / 640;
export default class Publish extends Component {
    constructor(){
        super();
        this.state = {
            tits: [],
            page:1,     
        }
    }
    componentDidMount(){
        fetch('https://cnodejs.org/api/v1/topics?limit=13&page='+this.state.page)
            .then(res=>res.json())
            .then(res=>{
                
                this.setState({tits: res.data});
                
            })
    }
    componentWillUpdate(){
        
        fetch('https://cnodejs.org/api/v1/topics?limit=13&page='+this.state.page)
            .then(res=>res.json())
            .then(res=>{
                
                this.setState({tits: res.data});
                
            })
    }
    
    onChange1=()=>{
       var pages=this.state.page+1
        this.setState({
            page:pages
        })     
    }
    onChange2=()=>{
        var pages=this.state.page-1
        if(pages==0){
         this.setState({
             page:1
         }) 
         ToastAndroid.show('已经是第一页了', ToastAndroid.SHORT);    
        }else{
            this.setState({
                page:pages
            })     
            // console.log(100)
        }
     }
    //  huifu= () => {
    //     const number = 2;
    //     const randomNumber = parseInt(Math.random() * number)
    //     if (randomNumber == 1) {
    //       return <Text style={{color: 'red',fontSize:14}}>已回复</Text>;
    //     } else {
    //       return <Text style={{color:'gray',fontSize:14}}>待回复</Text>;
    //     }
    //   };
    render() {
        return (
            <View backgroundColor='#fff'>
                    <View style={{width:width,height:50,backgroundColor:'red',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <TouchableOpacity onPress={Actions.pop}>
                        <Icon name='left' />
                        </TouchableOpacity>
                        <Text style={{fontSize:20,color:'#fff'}}>我的发布</Text>
                        <Icon name='ellipsis' size={30}/>
                    </View>
                    <View flexDirection='row'>
                        
                        <View style={styles.left}>
                        {
                            this.state.tits.map((item)=>(
                                <Text style={styles.one}>{item.title?(item.title.length>15?item.title.slice(0,15)+"...":item.title):""}</Text>
                            ))
                        }
                        </View>

                        <View style={styles.cen}>
                        {
                            
                            this.state.tits.map((item)=>{
                                let ran = Math.random();
                                return(
                                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                                <Text style={styles.two}>{item.create_at.substr(0,10)}</Text>
                                <View style={{width:width*0.1}}>
                                {
                                    ran>0.5
                                    ?<Text>已回复</Text>
                                    :<Text style={{color:'red'}}>待回复</Text>
                                }
                                </View>
                                </View>
                                )
                            })
                        }
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <TouchableOpacity onPress={this.onChange2}>
                        <View style={{width:86,height:35,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius:15}} 
                        ><Text style={{color:'#fff'}}>上一页</Text></View>
                        </TouchableOpacity>
                        <View>
                            {
                            
                                <View><Text style={{fontSize:15}}>第{this.state.page}页</Text></View>    
                            }
                        </View>
                        <TouchableOpacity onPress={this.onChange1}>
                        <View style={{width:86,height:35,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius:15}} 
                        ><Text style={{color:'#fff'}}>下一页</Text></View>
                        </TouchableOpacity>    
                    </View>    
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    left:{
        width:width*0.5,
        height:500,
        flexDirection:'column',
        justifyContent:'space-evenly',
        
    },
    cen:{
        width:width*0.5,
        flexDirection:'column',
        justifyContent:'space-between',
        // backgroundColor:'red'
    },
    right:{
        width:width*0.2,
        // backgroundColor:'blue',
        flexDirection:'column',
        justifyContent:'space-evenly',
    },  
    row:{
        flexDirection:'row'
    },  
    one:{
       
        fontSize:14,
        //marginLeft:0

    },
    two:{
        // width:width*0.2,
        fontSize:14,
    }
});

