import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Button,
} from 'react-native';
import React from 'react';;
import {ScrollView} from 'react-native-gesture-handler';
import {ImageHeader, Logo} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../components/firebase/fire';
import ButtonIcon from '../../components/ButtonIcon';;
import PesananAktif from '../../components/PesananAktif';;

const Home = () => {
  const navigation = useNavigation();;
  const Logout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };
  return (
    <ScrollView>
      <View style={styles.page}>
        <ImageBackground source={ImageHeader} style={styles.header}>
          <View style={styles.hello} />
          <Text style={styles.selamat}>Selamat Datang</Text>
          <Text style={styles.username}>{auth.currentUser?.email}</Text>
          <TouchableOpacity onPress={Logout}>
            <Text style={styles.texttombol}>Logout</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.layanan}>
          <Text style={styles.label}>Layanan Kami</Text>
          <View style={styles.iconLayanan}>
            <ButtonIcon title="Kiloan" />
            <ButtonIcon title="Satuan" />
            <ButtonIcon title="Ekspress" />
          </View>
        </View>
        <View style={styles.pesananAktif}>
          <Text style={styles.label}>Pesanan Anda</Text>
          <PesananAktif title="Pesanan No.1" status="Sudah Selesai"/>
          <PesananAktif title="Pesanan No.2" status="Masih Di Cuci"/>
          <PesananAktif title="Pesanan No.3" status="Sudah Selesai"/>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: windowWidth,
    height: windowHeight * 0.3,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  logo: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.2,
  },
  hello: {
    marginTop: windowHeight * 0.03,
  },
  selamat: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
  },
  username: {
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'black',
  },
  layanan: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Bold',
    color: 'black',
    fontWeight: 'bold',
  },
  iconLayanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  pesananAktif: {
    paddingTop: 10,
    paddingHorizontal: 30,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  texttombol: {
    color: '#fff',
    fontWeight: 'bold',
  },
  texttombol1: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tombol: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#4632A1',
    width: Dimensions.get('window').width / 4,
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },
});
