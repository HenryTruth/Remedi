import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {HflatScreenStyles} from '../h-flatscreen/styles';
import {HScreenStyles} from './styles';
import { HScreenTypes } from './type';

const Hscreen = ({children, hasPadding = true, screenColor, colors}: HScreenTypes) => {
  // const colors = pallete;
  return (
    <KeyboardAvoidingView
      style={HflatScreenStyles(screenColor).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}

      >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          // paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={HScreenStyles(hasPadding, colors).container}>
          {children}
        </View>
      </ScrollView>
   </KeyboardAvoidingView>
  );
};

export default Hscreen;