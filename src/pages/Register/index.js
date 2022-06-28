import { Image, StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TextInput, Button, TouchableOpacity} from 'react-native'
import React, { useState , useEffect} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../components/firebase/fire';
const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ulangi , setUlangi]= useState('')
    const navigationn = useNavigation();
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if(user){
                navigationn.replace('Login')
            }
        })
        return unsubscribe
    })

    const onRegister= async()=>{
        await createUserWithEmailAndPassword(auth,email,password,ulangi)
    }
    // const handleRegister=()=>{
    //     auth
    //     .createUserwithEmailAndPassword(email,password)
    //     .then(userCredentials=>{
    //         const user = userCredentials.user;
    //         console.log( user,email);
    //     })
    //     .catch(error=>alert(error.message))
    // }
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#fff' }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../../assets/images/SplashBG.png')}
                style={{
                    height: Dimensions.get('window').height / 2.5,
                }}>
                <View style={styles.container}>
                    <Image source={require('../../assets/images/LoginLogo.png')}
                    />
                </View>
            </ImageBackground>
            <View style={styles.container2}>
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#4632A1', fontSize: 30 }}>Welcome</Text>
                    <View style={{ marginTop: 30 }}>
                        <TextInput style={styles.input1} placeholder="Email" underlineColorAndroid={'transparent'} 
                        keyboardType='email-address' 
                        value={email}
                        onChangeText={setEmail}
                        />
                        <TextInput style={styles.input1} placeholder="Password" underlineColorAndroid={'transparent'} 
                        secureTextEntry={true} 
                        value={password}
                        onChangeText={setPassword}
                        />
                        <TextInput style={styles.input1} placeholder="Ulangi Password" underlineColorAndroid={'transparent'} 
                        secureTextEntry={true} 
                        value={ulangi}
                        onChangeText={setUlangi}
                        />
                    </View>
                    <View style={{ flex: 1, marginRight: -2 }}>
                        <Text style={{ color: '#8f9195', alignSelf: 'flex-end' }}>Lupa Password</Text>

                    </View>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={onRegister}  style={styles.tombol}>
                            <Text style={styles.texttombol}>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flex: 1.5,
        backgroundColor: 'white',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
    input1: {
        fontSize: 14,
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: "#4632A1",
        borderBottomWidth: 1,
    },
    tombol: {
        alignSelf: 'center',
        alignItems:'center',
        backgroundColor: '#4632A1',
        width: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        padding:10,
        marginTop:10,
    },
    texttombol:{
        color:'#fff',
        fontWeight:'bold',
        
    }
})