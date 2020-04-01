import React, { Component } from 'react'
import { Animated,AsyncStorage,View ,Text,Image,FlatList,TextInput,TouchableOpacity, ScrollView,StyleSheet, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Grid, Icon } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { myFetch } from './request';
const {width}=Dimensions.get('window')
const s = width / 640;

const icon0=['setting','environment','solution','exception','qrcode','filter','star']
const arr0=['账户管理','收货地址','我的信息','我的订单','我的二维码','我的积分','我的收藏'];
const data0= Array.from(new Array(7)).map((_val, i) => ({   
    icon: <Icon size={30} color={'#8a8a8a'} name={icon0[i]}/>,
    text: <Text style={{fontSize:18,color:'#4f4e4e'}}>{arr0[i]}</Text>
  }));
const icon1=['tool','car','user','home','flag','form'];
const arr1=['居家维修','出行接送','我的受赠人','我的住宿优惠','我的活动','我的发布']
const data1 = Array.from(new Array(3)).map((_val, i) => ({
    icon: <Icon size={30} color={'#8a8a8a'} name={icon1[i]}/>,
    text: <Text style={{fontSize:18,color:'#4f4e4e'}}>{arr1[i]}</Text>,
}));
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};
export default class Home extends Component {   
    constructor(){
        super();
        let data = [];
        for(var i=0; i<10; i++){
            data.push({tit:i,key:i});
        }
        this.state = {
            num:0,
            data,
            width: new Animated.Value(20),
            imageUrl:require('../pic/tou.png')
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('source')
        .then(res=>{
            
            if(res!=null){
                this.setState({
                    imageUrl: {uri:res},
                });
            }else{
                this.setState({
                    imageUrl:require('../pic/tou.png')
                })
            }
        })
    }
    takephoto = ()=>{

        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                
              const source = { uri: response.uri };
              AsyncStorage.setItem('source',source.uri)
              AsyncStorage.getItem('source')
              .then((res)=>{
              this.setState({
                imageUrl: source,
              });
              });
            }
          });
        }
        // exit=()=>{
        //     myFetch.post('/login',{
        //         username:this.state.username,
        //         pwd:this.state.pwd}
            
        //     ).then(res=>{
        //       AsyncStorage.setItem('user',JSON.stringify(res.data))
        //             .then(()=>{
        //                 this.setState({isloading:false})
        //                 Actions.server();
        //             })
        //     })
        // }
    render() {
        return (
            <ScrollView>
            <View>
            
                <View style={styles.hong}>
                    
                    <TouchableOpacity onPress={()=>{this.takephoto()}}>
                    <View 
                        
                        style={{
                            width:100,
                            height:100,
                            backgroundColor:'blue',
                            borderRadius:50,
                            overflow:'hidden'
                            }}
                        >
                            <Image 
                            
                                style={{width:100,height:100}}
                                source={this.state.imageUrl}
                            />
                        </View>
                        </TouchableOpacity>
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            marginTop:30*s
                        }}>BINNU DHILLON</Text>
                </View>   
                <View style={{
                        flexDirection:'row',
                        backgroundColor:'#fff'
                        }}>
                    <Icon 
                    
                    name="user"
                        style={{
                        width:20,
                        height:50*s,
                        marginLeft:10,
                        marginTop:20
                    }}/>
                    <Text 
                          style={{marginLeft:10*s,marginTop:20,fontSize:18}}
                    >我的个人中心</Text>
                </View>
                <View style={{
                        width:width,
                        marginTop:1,
                        
                        backgroundColor:'#fff'
                    }}>
                        <Grid data={data0}  columnNum={3}
                        itemStyle={{ height: 100, backgroundColor: '#fff' }}
                        hasLine={false}
                        renderItem={(dataItem) => (
                            <View style={{backgroundColor:'',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <View style={{marginTop:20,size:30}}>
                                    {dataItem.icon}
                                </View>
                                <View style={{
                                    marginTop:13
                                }}>
                                    <Text>{dataItem.text}</Text>
                                </View>
                            </View>
                            
                        )}
                    />
                    
                    </View>
                    <View style={{
                        flexDirection:'row',
                        backgroundColor:'#fff',
                        marginTop:10
                        }}>
                    <Icon 
                    name="tag"
                        style={{
                        width:20,
                        height:50*s,
                        marginLeft:10,
                        marginTop:20
                    }}/>
                    <Text 
                          style={{marginLeft:10*s,marginTop:20,fontSize:18}}
                    >E族活动</Text>  
                </View>
                <View style={{
                        width:width,
                        marginTop:1,
                        backgroundColor:'#fff'
                    }}>
                         
                        <Grid data={data1}  columnNum={3}
                        itemStyle={{ height: 100, backgroundColor: '#fff' }}
                        hasLine={false}
                        renderItem={
                            dataItem => (
                                // <TouchableOpacity onPress={()=>Actions.publish()}>
                            <TouchableOpacity onPress={this.clic}>
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                
                            >
                                <View style={{marginTop:20,size:30}}>
                                    {dataItem.icon}
                                </View>
                                <View style={{
                                    marginTop:13
                                }}>
                                    <Text>{dataItem.text}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>    
                        )}
                        
                    />
                    <View style={{width:width,height:100,flexDirection:'row'}}>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:width*0.33}}>
                            <Icon name='home'size={30} color='#8a8a8a'/>
                            <Text style={{fontSize:18,color:'#4f4e4e'}}>我的住宿优惠</Text>
                        </View>
                        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:width*0.33}}>
                        <Icon name='flag'size={30}color='#8a8a8a'/>
                            <Text style={{fontSize:18,color:'#4f4e4e'}}>我的活动</Text>
                        </View>
                        <TouchableOpacity onPress={()=>Actions.publish()}
                            style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:width*0.33}}
                        >
                        <View  style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:width*0.33}}
                        >
                        <Icon name='form' size={30}color='#8a8a8a'/>
                            <Text style={{fontSize:18,color:'#4f4e4e'}}>我的发布</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    </View>     
                    <TouchableOpacity 
                        onPress={()=>{
                            // AsyncStorage.removeItem('user')
                            Actions.login()
                        }}
                    >
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:20*s,
                        height:50
                    }}> 
                    <Text style={{fontSize:15,color:'#767676'}}>BINNU DHILLON 退出</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    hong:{
        width:640*s,
        height:365*s,
        backgroundColor:'red',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        fontSize:20,
        color:'#4f4e4e'
    },
});
