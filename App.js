import React, { useEffect,useState } from 'react';
import{Router,Overlay,Scene,Tabs,Drawer,Lightbox,Modal,Actions}from 'react-native-router-flux';
import Home from './components/Home'
import List from './components/List'
import Server from './components/Server'
import Icon from 'react-native-vector-icons/FontAwesome';
import Publish from './components/Publish'
import SplashScreen from 'react-native-splash-screen'
import Login from './components/Login'
import SwiperPage from './components/SwiperPage';
import Register from './components/Register'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  BackHandler,
  ToastAndroid,
  StatusBar,
  AsyncStorage
} from 'react-native';
console.disableYellowBox =true;
const App = () => {
  let [isLogin,setLogin] = useState(false);
  let [isInstall,setInstall] = useState(true);
  let now=0;
  
  let init=()=>{
    
    AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
    AsyncStorage.getItem('user')
    .then(res=>{
      let user =JSON.parse(res)
      if(!user){
				SplashScreen.hide();
			}
      if(user&&user.token){
        setLogin(true);
        SplashScreen.hide();
        Actions.server();
      }
    })
  }
  useEffect(()=>{
		init();
	},[])
  let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
  return (
    <Router
            backAndroidHandler={()=>{
                if(Actions.currentScene != 'login'&&Actions.currentScene!='home'){
                    Actions.pop();
                    return true;
                }else{
                    if(new Date().getTime()-now<2000){
                        BackHandler.exitApp();
                    }else{
                        ToastAndroid.show('确定要退出吗',100);
                        now = new Date().getTime();
                        return true;
                    }
                }
                
            }}
        >
            <Overlay>
            <Modal 
                key="modal" 
                hideNavBar
            >
                <Lightbox key="lightbox">
                    <Drawer 
                        key="drawer"
                        contentComponent={()=><Text>drawer</Text>}
                        drawerIcon={()=><Icon name="menu"/>}
                        drawerWidth={400}
                    >
                        <Scene key="root">
                            <Tabs 
                                key='tabbar'
                                hideNavBar
                                activeTintColor="red"
                                inactiveTintColor="#8a8a8a"
                                tabBarStyle={{backgroundColor:'#fff'}}
                            >
                                {/* 首页 */}
                                <Scene 
                                    key='server'
                                    title='首页'
                                    icon={
                                        ({focused})=><Icon 
                                            color={focused?'red':'gray'} 
                                            size={28}
                                            name="home"
                                        />
                                    }
                                >
                                    <Scene key='ser' hideNavBar={true} component={Server}/>
                                </Scene>
                                {/* 商品分类 */}
                                <Scene 
                                    key='list'
                                    title='商品分类'
                                    icon={
                                        ({focused})=><Icon 
                                            color={focused?'red':'gray'} 
                                            size={25}
                                            name="th-large"
                                        />
                                    }
                                    
                                >
                                    <Scene key="lis" hideNavBar={true} component={List}/>
                                </Scene>
                                {/* 用户中心 */}
                                <Scene 
                                    key='home'
                                    hideDrawerButton
                                    icon={({focused})=>
                                        <Icon 
                                            color={focused?'red':'gray'} 
                                            size={25}
                                            name='user-circle'/>
                                        }
                                    title="用户中心"
                                    hideNavBar={true}
                                    
                                >
                                    <Scene key='hom' hideNavBar={true} component={Home}/>
                                    <Scene key='publish' hideNavBar={true} hideTabBar component={Publish} />
                                </Scene>
                                
                            </Tabs>
                        </Scene>
                    </Drawer>
                </Lightbox>
                <Scene key='login' initial={!isLogin} component={Login} />
                <Scene key='register' component={Register} />
            </Modal>
            </Overlay>
        </Router>

  );
};

const styles = StyleSheet.create({
  
});

export default App;
