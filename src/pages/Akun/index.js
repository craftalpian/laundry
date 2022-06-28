/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import { auth, app } from '../../components/firebase/fire';
import { updateProfile } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadString } from "firebase/storage";
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const Akun = () => {
  const [editable, setEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1656313869683-79707470819e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  async function getUser(fEmail) {
    const db = getFirestore(app);
    const userDataCollection = collection(db, 'userData');
    const useSnapshot = await getDocs(userDataCollection);
    const userList = useSnapshot.docs.map(doc => doc.data());
    return userList.filter((data) => data.email === fEmail);
  }

  const uploadImage = async (fileName, pathUri) => {
    console.log({fileName, pathUri})
    const reference = storage().ref(fileName);
    await reference.putFile(pathUri);

    const url = await storage().ref(fileName).getDownloadURL();

    await updateProfile(auth.currentUser, { displayName: fullName, photoURL: url });
    setProfilePicture(url)

    console.log({url})

    return url;
  };

  async function updateUser(email, data) {
    const db = getFirestore(app);

    setDoc(doc(db, 'userData', email), data);
  }

  useEffect(() => {
    async function fetch() {
      const { displayName, phoneNumber, photoURL, email } = auth.currentUser;
      setFullName(displayName);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setProfilePicture(photoURL);

      const userFirestore = await getUser(email);
      if (userFirestore.length > 0) {
        setAddress(userFirestore[0].address);
        setPhoneNumber(userFirestore[0].phone_number);
      } else {
        await updateUser(email, { email, phone_number: phoneNumber, address: '' });
      }
    }

    // uploadImage()

    fetch();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Untuk styling status bar */}
      <StatusBar barStyle={'light-content'} backgroundColor={'#2596be'} />
      {/* Membuat komponen top profile */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#2596be',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        {/* Gambar pengguna */}
        <TouchableWithoutFeedback onPress={() => {
          launchImageLibrary({ mediaType: 'photo' })
            .then(async(src) => {
              const {fileName, uri} = src.assets[0];

              await uploadImage(fileName, uri);
            })
            .catch(() => ToastAndroid.show('Batal memilih gambar', ToastAndroid.BOTTOM));
        }}>
          <Image
            source={{
              uri: profilePicture,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#FAFAFA',
              alignSelf: 'center',
              marginTop: 45,
              marginBottom: 15,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
      {/* Membuat komponen profile */}
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 25 }} />

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'TitilliumWeb-Bold',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Email (tidak dapat diubah)
          </Text>
          <TextInput
            placeholder={'Masukkan Email Anda'}
            value={`${email}`}
            style={{
              fontSize: 14,
              fontFamily: 'TitilliumWeb-Light',
              color: 'gray',
              paddingLeft: 0,
              paddingTop: 5,
            }}
            editable={false}
          />
        </View>

        <View style={{ borderBottomWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, marginHorizontal: 15 }} />

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'TitilliumWeb-Bold',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Nama Lengkap
          </Text>
          <TextInput
            placeholder={'Masukkan Nama Anda'}
            value={fullName}
            onChangeText={(name) => setFullName(name)}
            style={{
              fontSize: 14,
              fontFamily: 'TitilliumWeb-Light',
              color: 'gray',
              paddingLeft: 0,
              paddingTop: 5,
            }}
            editable={editable}
          />
        </View>

        <View style={{ borderBottomWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, marginHorizontal: 15 }} />

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'TitilliumWeb-Bold',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Nomor Telepon
          </Text>
          <TextInput
            placeholder={'Masukkan Nomor Telepon Anda'}
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            style={{
              fontSize: 14,
              fontFamily: 'TitilliumWeb-Light',
              color: 'gray',
              paddingLeft: 0,
              paddingTop: 5,
            }}
            keyboardType={'phone-pad'}
            editable={editable}
          />
        </View>

        <View style={{ borderBottomWidth: 1, borderColor: '#E0E0E0', marginBottom: 15, marginHorizontal: 15 }} />

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'TitilliumWeb-Bold',
              color: 'black',
              fontWeight: 'bold',
            }}>
            Alamat
          </Text>
          <TextInput
            placeholder={'Masukkan alamat Anda'}
            value={address}
            onChangeText={(alamat) => setAddress(alamat)}
            style={{
              fontSize: 14,
              fontFamily: 'TitilliumWeb-Light',
              color: 'gray',
              paddingLeft: 0,
              paddingTop: 5,
            }}
            keyboardType={'default'}
            editable={editable}
          />
        </View>

        <View
          style={{
            marginTop: 25,
            marginHorizontal: 20,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableHighlight underlayColor={'#FFFFFF'} onPress={async () => {
            setEditable(!editable);
            if (editable) {
              try {
                await updateProfile(auth.currentUser, { displayName: fullName, photoURL: profilePicture });
                // await updateCurrentUser(auth.currentUser, { phoneNumber });
                await updateUser(email, { address, phone_number: phoneNumber, email });

                const user = auth.currentUser;
                console.log(user);
              } catch (error) {
                console.log({ error });
              }
            }
          }}>
            <View
              style={{
                paddingHorizontal: 6,
                paddingVertical: 6,
                backgroundColor: '#2596be',
                borderRadius: 8,
              }}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'TitilliumWeb-Light', fontSize: 14 }}>{editable ? 'Simpan Data' : 'Ubah Data'}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

export default Akun;
