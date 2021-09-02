import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Image, Linking, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';


const AppBar = () => {
    const navigation = useNavigation();


  return (
    <Appbar.Header theme={{colors: {primary: 'white'}}}>
      <Appbar.Action icon="menu" />
      <Appbar.Content title="Title" subtitle="Subtitle" />
      <Appbar.Action
        icon="logout"
        onPress={async () => {
            await AsyncStorage.setItem('@login', 'false').then(() =>
              navigation.navigate('Login'),
            );
          }}      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '58%',
    height: '100%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default AppBar;