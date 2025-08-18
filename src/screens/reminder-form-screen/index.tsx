import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Hscreen } from '../../components/containers';
import AppText from '../../components/app-text';
import { useReminderForm } from './useReminderForm';
import { styles } from './styles';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';
import { GlobalScreenTypes } from '../../configs/global-screen-types';

const ReminderFormScreen = ({ navigation, route }: GlobalScreenTypes) => {
  // Get editing data from navigation params
  const editingReminder = route?.params?.reminder;
  const isEditMode = !!editingReminder;

  const {
    form,
    timeOptions,
    frequencyOptions,
    updatePillName,
    updateSelectedTimes,
    updateFrequency,
    isFormValid,
    submitForm,
    getRecommendedTimes,
  } = useReminderForm({ editingReminder, isEditMode });

  const handleSubmit = () => {
    const result = submitForm();
    if (result) {
      // Navigate back to home screen
      navigation.goBack();
    }
  };

  const handleProfilePress = () => {
    console.log('Navigate to profile');
  };

  return (
    <View style={styles.screenContainer}>
      <Hscreen screenColor={pallete.screen} hasPadding={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <AppText 
              text="Remedi"
              styles={styles.appTitle}
              color={pallete.text}
              fontSize={moderateSize(28)}
              fontWeight={fontFamilyWeightMap.Bold}
            />
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={handleProfilePress}
              activeOpacity={0.7}
            >
              <Icon name="person" size={20} color={pallete.light} />
            </TouchableOpacity>
          </View>

          {/* Page Title */}
          <AppText 
            text={isEditMode ? "Edit Reminder" : "Create Reminder"}
            styles={styles.pageTitle}
            color={pallete.text}
            fontSize={moderateSize(16)}
            fontWeight={fontFamilyWeightMap.SemiBold}
          />

          {/* Pill Name Section */}
          <View style={styles.formSection}>
            <AppText 
              text="Pill Name"
              styles={styles.sectionLabel}
              color={pallete.text}
              fontSize={moderateSize(14)}
              fontWeight={fontFamilyWeightMap.Medium}
            />
            <TextInput
              style={styles.inputField}
              value={form.pillName}
              onChangeText={updatePillName}
              placeholder="Enter pill name"
              placeholderTextColor={pallete.grey}
            />
          </View>

          {/* Time in day Section */}
          <View style={styles.formSection}>
            <AppText 
              text="Time in day"
              styles={styles.sectionLabel}
              color={pallete.text}
              fontSize={moderateSize(14)}
              fontWeight={fontFamilyWeightMap.Medium}
            />
            <AppText 
              text={`Select ${form.frequency} time${parseInt(form.frequency.replace('x', '')) > 1 ? 's' : ''} - ${getRecommendedTimes(form.frequency).join(', ')} recommended`}
              styles={styles.sectionHelper}
              color={pallete.grey}
              fontSize={moderateSize(12)}
              fontWeight={fontFamilyWeightMap.Regular}
            />
            <View style={styles.timeOptionsContainer}>
              {timeOptions.map((time: string) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    form.selectedTimes.includes(time) && styles.timeOptionSelected
                  ]}
                  onPress={() => updateSelectedTimes(time)}
                  activeOpacity={0.7}
                >
                  <AppText 
                    text={time}
                    styles={styles.timeText}
                    color={pallete.text}
                    fontSize={moderateSize(16)}
                    fontWeight={fontFamilyWeightMap.Medium}
                  />
                  <View style={[
                    styles.radioButton,
                    form.selectedTimes.includes(time) && styles.radioButtonSelected
                  ]}>
                    {form.selectedTimes.includes(time) && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Frequency Section */}
          <View style={styles.formSection}>
            <AppText 
              text="Frequency"
              styles={styles.sectionLabel}
              color={pallete.text}
              fontSize={moderateSize(14)}
              fontWeight={fontFamilyWeightMap.Medium}
            />
            <View style={styles.frequencyContainer}>
              {frequencyOptions.map((freq: string) => (
                <TouchableOpacity
                  key={freq}
                  style={[
                    styles.frequencyButton,
                    form.frequency === freq && styles.frequencyButtonSelected
                  ]}
                  onPress={() => updateFrequency(freq)}
                  activeOpacity={0.7}
                >
                  <AppText 
                    text={freq}
                    styles={styles.frequencyText}
                    color={form.frequency === freq ? pallete.light : pallete.text}
                    fontSize={moderateSize(16)}
                    fontWeight={fontFamilyWeightMap.SemiBold}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Hscreen>

      {/* Done Button */}
      <TouchableOpacity
        style={[
          styles.doneButton,
          { opacity: isFormValid() ? 1 : 0.5 }
        ]}
        onPress={handleSubmit}
        disabled={!isFormValid()}
        activeOpacity={0.8}
      >
        <AppText 
          text={isEditMode ? "Update" : "Done"}
          styles={styles.doneButtonText}
          color={pallete.light}
          fontSize={moderateSize(18)}
          fontWeight={fontFamilyWeightMap.SemiBold}
        />
      </TouchableOpacity>
    </View>
  );
};
export default ReminderFormScreen