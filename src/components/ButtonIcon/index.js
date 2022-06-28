import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  IconKiloan,
  IconSatuan,
  IconEkspress,
} from '../../assets';


const ButtonIcon = ({title, type}) => {
  const navigation = useNavigation()
  const Icon =  () => {

    if (title === 'Kiloan') return <IconKiloan />;

    if (title === 'Satuan') return <IconSatuan />;

    if (title === 'Ekspress') return <IconEkspress />;

    return <IconKiloan />;
  };

  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Pemesanan')} style={styles.container(type)}>
      <View style={styles.button(type)}>
        <Icon />
      </View>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  container: (type) => ({
      marginBottom : type === "layanan" ? 12 : 0,
      marginRight : type === "layanan" ? 30 : 0
  }), 
  button: (type) => ({
    padding: type === 'layanan' ? 12 : 7,
    borderRadius: 10,
  }),
  text: (type) => ({
    fontSize: type === 'layanan' ? 14 : 10,
    fontFamily:type === 'layanan' ? 'TitilliumWeb-Light' : 'TitilliumWeb-Regular',
    textAlign: 'center',
  }),

});
