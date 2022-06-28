import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Beranda,Pesanan , Akun} from '../../assets'
const Tab = ({ isFocused, onPress, onLongPress, label }) => {
     const Icon = () => {
       if (label === "Beranda") return isFocused ? <Beranda /> : <Beranda />
       if (label === "Pemesanan") return isFocused ? <Pesanan /> : <Pesanan />
       if (label === "Akun") return isFocused ? <Akun /> : <Akun />
       return <Pesanan />
     }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon/>
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default Tab

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    }
})