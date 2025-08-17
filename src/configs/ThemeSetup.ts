import { fontFamilyTypes } from "./type";






export const fontFamilyWeightMap: Record<keyof fontFamilyTypes, fontFamilyTypes[keyof fontFamilyTypes]> = {
    Medium: '500',
    Regular: '400',
    Bold: '700',
    SemiBold: '600'
  };


export const fontFamily = {
    Bold: 'Poppins-Black.ttf',
    Regular: 'Poppins-Regular.ttf',
    SemiBold: 'Poppins-SemiBold.ttf'
}

export const shadow = {
  light: {
    shadowColor: '#000000', // shadow color
    shadowOffset: {width: -2, height: 4}, // x and y offset
    shadowRadius: 10, // blur radius
    shadowOpacity: 0.05, // 5% opacity
  },
  medium: {
    shadowColor: '#000000', // shadow color
    shadowOffset: {width: -2, height: 4}, // x and y offset
    shadowRadius: 10, // blur radius
    shadowOpacity: 0.05, // 5% opacity
  },
  dark: {
    shadowColor: '#000000', // shadow color
    shadowOffset: {width: -2, height: 4}, // x and y offset
    shadowRadius: 10, // blur radius
    shadowOpacity: 0.05, // 5% opacity
  }
};