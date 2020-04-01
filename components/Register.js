import React, { Component } from 'react'
import { Text, View ,TextInput, AsyncStorage, TouchableOpacity,Dimensions, Alert, ToastAndroid,ActivityIndicator} from 'react-native'
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from './request';
const {width}=Dimensions.get('window')
const s = width / 640;
export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            pwd2:'',
            isre:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    pwdhandle2 = (text)=>{
        this.setState({pwd2:text})
    }
    registe=()=>{
        if(this.state.username=="" || this.state.pwd==''|| this.state.pwd2==''){
            Alert.alert('不能为空')   
        }
        else{
            if(this.state.pwd!=this.state.pwd2){
                Alert.alert('密码不一致');
            }
            else{
                this.setState({isloading:true})
                myFetch.post('/reg',{
                    username:this.state.username,
                    pwd:this.state.pwd}
                
                ).then(res=>{
                    if(res.data.state=='1' || res.data.state=='2'){
                        this.setState({isre:false})
                        Alert.alert('账户已存在');
                    }
                    
                AsyncStorage.setItem('reser',JSON.stringify(res.data))
                        .then(()=>{
                        console.log(res)
                            this.setState({isre:false})
                            Actions.login();
                        })
                })
            }
        }
    }
    
    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
                <View style={{ alignItems: 'center'}}>
                <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="user" color="red"/>
                        <TextInput placeholder="请输入用户名" 
                            onChangeText={this.userhandle}
                        />
                    </View>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="lock" color="red"/>
                        <TextInput 
                            onChangeText={this.pwdhandle}
                            placeholder="输入密码" 
                            secureTextEntry={true}
                        />
                    </View>
                    <View
                        style={{
                        width: '80%',
                        marginRight: 10,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 20,
                        }}>
                        <Icon name="lock" color="red"/>
                        <TextInput placeholder="再次输入密码" 
                             secureTextEntry={true}
                            onChangeText={this.pwdhandle2}
                        />
                    </View>
                    <TouchableOpacity 
                        style={{
                            width: '40%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius:10
                        }}
                        onPress={this.registe}
                    >
                        <Text>确认</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{
                            width: '40%',
                            height: 40,
                            backgroundColor: '#ccc',
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius:10
                        }}
                        onPress={Actions.pop}
                    >
                        <Text style={{color:'red'}}>返回</Text>
                    </TouchableOpacity>
                </View>
                {
                this.state.isloading
                ?<View style={{width:'100%',marginTop:50,alignItems:'center'}}>
                    <ActivityIndicator color="red" size={40}/>
                </View>
                :null   
            }
            </View>
        )
    }
}
