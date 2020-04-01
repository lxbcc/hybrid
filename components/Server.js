import React, { Component } from 'react'
import {View,Image,Text,Button,StyleSheet,Dimensions,TextInput,ScrollView,Easing,ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Carousel,List, WhiteSpace} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux'
// import Swiper from 'react-native-swiper'
const {width,scale} = Dimensions.get('window');
const s = width / 640;
export default class Server extends Component {
    render() {
        return (
            <View flex={1}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Icon name='search' style={{marginLeft:20,}} size={18} color='#fff'/>
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            style={{
                                width: 490*s,height: 50*s,
                                padding: 0,
                                paddingLeft: 10
                            }}
                        />
                        <View>
                            <Icon name='shopping-cart' size={20} color='#fff'/>
                        </View>
                    </View>           
                </View>
                
                {/* 轮播*/}
                
                <View style={{width:width,height:273*s}}>
                <Carousel 
                    style={styles.wrapper}
                    autoplay={true}
                    dots={true}
                    infinite
                >
                    <Image 
                    style={{width:width,height:273*s}}
                    source={require('../pic/lun.png')}/>
                    <Image 
                    style={{width:width,height:273*s}}
                    source={require('../pic/lun2.png')}/>
                    <Image 
                    style={{width:width,height:273*s}}
                    source={require('../pic/lun.png')}/>
                    
                </Carousel>
                </View>


                <View style={styles.items}>
                    <Image 
                        style={{width:100*s,height:100*s,marginTop:10*s,marginLeft:25*s}} 
                        source={require('../pic/one.png')}
                    />
                    <Text style={styles.txt}>居家维修保养</Text>
                    
                    <Icon name='angle-right' style={{marginLeft:150,marginTop:26}} size={30}/>
                    
               
                </View>

                <View style={styles.items}>
                    <Image 
                        style={{width:100*s,height:100*s,marginTop:10*s,marginLeft:25*s}} 
                        source={require('../pic/two.png')}
                    />
                    <Text style={styles.txt}>住宿优惠</Text>
                    
                    <Icon name='angle-right' style={{marginLeft:189,marginTop:26}} size={30}/>
                    
                </View>

                <View style={styles.items}>
                <Image 
                    style={{width:100*s,height:100*s,marginTop:10*s,marginLeft:25*s}} 
                    source={require('../pic/three.png')}
                />
                <Text style={styles.txt}>出行接送</Text>
                <Icon name='angle-right' style={{marginLeft:189,marginTop:26}} size={30}/>
                </View>
                
                <View style={styles.items}>
                <Image 
                    style={{width:100*s,height:100*s,marginTop:10*s,marginLeft:25*s}} 
                    source={require('../pic/four.png')}
                />
                <Text style={styles.txt}>E族活动</Text>
                <Icon name='angle-right' style={{marginLeft:194,marginTop:26}} size={30}/>
                </View>
                <View style={{width:543*s,height:66*s,marginTop:20*s,marginLeft:50*s,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>    
                    <Text style={{fontSize:18,color:'#fff'}}>发布需求</Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:20*s
                }}> 
                    <Text style={{fontSize:15,color:'#767676'}}>E族之家 版权所有</Text>
                   
                    
                </View>
                {/* <TouchableOpacity> */}
                {/* <Button title="登录" onPress={()=>Actions.publish()}/> */}
                {/* </TouchableOpacity> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height: 70*s,
        borderBottomColor: 'red',
        backgroundColor:'red',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        alignItems: 'center',

    },
    search:{
        width: 525*s,
        height: 50*s,
        backgroundColor: '#fbb8b8',
        borderRadius:25*s,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nav:{
        height: 73*s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    good:{
        width: 290*s,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        alignItems: 'center'
    },
    items:{
        width:640*s,
        height:120*s,
        backgroundColor:'#fff',
        marginTop:10*s,
        flexDirection:'row'
    },
    txt:{
        fontSize:20,
        marginLeft:50*s,
        marginTop:40*s
    },
    slide:{
        width:width,
        height:273*s,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    
})
