import React, { forwardRef, ForwardedRef } from 'react';
import { TextInput, TextInputProps, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { pallete } from '../../../configs/Colors';

interface AppInputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  styles?: ViewStyle | TextStyle;
}

const AppInput = forwardRef<TextInput, AppInputProps>(({ 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  styles: styles,
  ...props
}, ref: ForwardedRef<TextInput>) => (
  <TextInput
    ref={ref}
    style={[defaultStyles.input, styles]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholderTextColor={pallete.dark}
    {...props}
  />
));

const defaultStyles = StyleSheet.create({
  input: {
    color: pallete.dark, // Use your primary color for text
    textAlign: 'left',
    // fontSize: 20, // Adjust this as needed
    // padding: 10, // Add some padding
  },
});

export default AppInput;