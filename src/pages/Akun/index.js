/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { auth } from '../../components/firebase/fire';
import { updateProfile, updateCurrentUser } from 'firebase/auth'

const Akun = () => {
  const [editable, setEditable] = useState(false);
  const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1656313869683-79707470819e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const { displayName, phoneNumber, photoURL, email, uid } = auth.currentUser;
    setFullName(displayName);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setUid(uid);

    console.log(auth.currentUser)
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

        <View style={{borderBottomWidth: 1,borderColor: '#E0E0E0', marginBottom: 15, marginHorizontal: 15}} />

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

        {/* <View style={{borderBottomWidth: 1,borderColor: '#E0E0E0', marginBottom: 15, marginHorizontal: 15}} />

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
            style={{
              fontSize: 14,
              fontFamily: 'TitilliumWeb-Light',
              color: 'gray',
              paddingLeft: 0,
              paddingTop: 5,
            }}
            editable={editable}
          />
        </View> */}

        <View
          style={{
            marginTop: 25,
            marginHorizontal: 20,
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableHighlight underlayColor={'#FFFFFF'} onPress={async() => {
            setEditable(!editable)
            if (editable) {
              try {
                const act = await updateProfile(auth.currentUser, { displayName: fullName, photoURL: profilePicture })
                const dos = await updateCurrentUser(auth.currentUser, { phoneNumber })
                console.log(act)
                console.log(dos)

                const user = auth.currentUser
                console.log(user)
              } catch (error) {
                console.log({ error })
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
