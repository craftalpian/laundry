import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React,{useEffect} from 'react'
import { Logo, SplashBG } from '../../assets'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login');
        }, 3000)
    }, [navigation]);
    return (
        <ImageBackground source={SplashBG} style={styles.background}>
            <Image source={Logo} style={styles.logo} />
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    logo: {
        width: 500,
        height: 500,
    }
})