import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { myFetch } from './request';
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login=()=>{
      if(this.state.username=="" || this.state.pwd==''){
        Alert.alert('用户名或密码不能为空')   
      }
      else{
      this.setState({isloading:true})
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
        
        ).then(res=>{
          AsyncStorage.setItem('user',JSON.stringify(res.data))
                .then(()=>{
                  console.log(res)
                    this.setState({isloading:false})
                    Actions.server();
                })
        })
      }
    }
    
     
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}
      >
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
            <TextInput placeholder="用户名" 
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
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>
          <View style={{
            width:'80%',
            height:50,
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center'
          }}>
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
                onPress={this.login}
               >
                <Text>登录</Text>
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
                onPress={Actions.register}
               >
                <Text style={{color:'blue'}}>注册</Text>
            </TouchableOpacity>
            </View>
            </View>
            {
                this.state.isloading
                ?<View style={{width:'100%',marginTop:50,alignItems:'center'}}>
                    <ActivityIndicator color="red" size={40}/>
                </View>
                :null   
            }
      </View>
    );
  }
}