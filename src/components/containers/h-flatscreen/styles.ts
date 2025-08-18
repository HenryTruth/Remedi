import {StyleSheet} from 'react-native';

export const HflatScreenStyles = (screen?:string) =>  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: screen || 'white',
    height: '100%',


  },
  screen: {
    flex: 1,
    backgroundColor: screen || 'white',
    height: '100%',

  },
});
