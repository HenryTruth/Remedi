import {Platform, ViewStyle} from 'react-native';

export const topViewStyle: ViewStyle = {
    paddingVertical: 50,
    flexDirection: 'row',

    
  };

export const bottomViewStyle: ViewStyle = {
    marginTop: 200,
    marginHorizontal: 'auto',
    backgroundColor:'#fff',
    // backgroundColor:'red'
  };


export const Globalpadding = {
  padding: 16,
};
export const GlobalScreen = {
  padding: 16,
  paddingHorizontal: 10,
  flex: 1,
};

export const GlobalFormHeaders: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'flex-start',
  // paddingBottom: 20,
  gap: 10,
};

export const GlobalHeaderBorder: ViewStyle = {
  borderBottomWidth: 0.5,
  borderBottomColor: 'grey',
};

export const shadowStyles = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 4,
  shadowColor: 'rgba(194, 154, 234, 0.5)',
  shadowOpacity: 0.5,
  borderWidth: Platform.OS === 'android' ? 1 : 0,
  borderColor: 'rgba(194, 154, 234, 0.2)',
};
