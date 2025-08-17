import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Hscreen } from '../../components/containers';
import { ReminderCard } from '../../components/reminder-card';
import { SectionHeader } from '../../components/section-header';
import { FloatingActionButton } from '../../components/floating-action-button';
import AppText from '../../components/app-text';
import { useHome } from './useHome';
import { styles } from './style';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';
import { GlobalScreenTypes } from '../../configs/global-screen-types';
import { routes } from '../../routers/router-constants/routes';

const HomeScreen = ({navigation}:GlobalScreenTypes) => {
  const { 
    upcomingReminders, 
    completedReminders, 
    completeReminder 
  } = useHome();

  const handleAddReminder = () => {
    // Navigate to create reminder screen
    console.log('Navigate to create reminder');
    navigation.navigate(routes.CreateReminderScreen);
  };

  const handleReminderPress = (id: string) => {
    // Navigate to reminder details or edit
    console.log('Navigate to reminder details:', id);
  };

  const handleProfilePress = () => {
    // Navigate to profile screen
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

          {/* Dashboard Title */}
          <AppText 
            text="Dashboard"
            styles={styles.dashboardTitle}
            color={pallete.text}
            fontSize={moderateSize(16)}
            fontWeight={fontFamilyWeightMap.SemiBold}
          />

          {/* Content */}
          <View style={styles.content}>
            {/* Upcoming Section */}
            <SectionHeader 
              title="Upcoming" 
              count={upcomingReminders.length}
            />
            
            {upcomingReminders.length > 0 ? (
              upcomingReminders.map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  id={reminder.id}
                  medicationName={reminder.medicationName}
                  dosage={reminder.dosage}
                  time={reminder.time}
                  isCompleted={false}
                  onPress={() => handleReminderPress(reminder.id)}
                  onComplete={() => completeReminder(reminder.id)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Icon name="calendar-outline" size={48} color={pallete.grey} />
                <AppText 
                  text="No upcoming reminders.&#10;Tap the + button to add one!"
                  styles={styles.emptyStateText}
                  color={pallete.grey}
                  fontSize={moderateSize(16)}
                  fontWeight={fontFamilyWeightMap.Regular}
                />
              </View>
            )}

            {/* Completed Section */}
            {completedReminders.length > 0 && (
              <>
                <SectionHeader 
                  title="Completed" 
                  count={completedReminders.length}
                />
                
                {completedReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    id={reminder.id}
                    medicationName={reminder.medicationName}
                    dosage={reminder.dosage}
                    time={reminder.time}
                    isCompleted={true}
                    onPress={() => handleReminderPress(reminder.id)}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </Hscreen>

      {/* Floating Action Button - Outside ScrollView */}
      <FloatingActionButton onPress={handleAddReminder} />
    </View>
  );
};

export default HomeScreen;