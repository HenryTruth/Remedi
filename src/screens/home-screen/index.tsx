import React, { useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { useNotifications } from '../../contexts/NotificationContext';
import { Hscreen } from '../../components/containers';
import { ReminderCard } from '../../components/reminder-card';
import { SectionHeader } from '../../components/section-header';
import { FloatingActionButton } from '../../components/containers/floating-action-button';
import AppText from '../../components/app-text';
import { useHome } from './useHome';
import { styles } from './style';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';
import { GlobalScreenTypes } from '../../configs/global-screen-types';
import { routes } from '../../routers/router-constants/routes';
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({navigation}:GlobalScreenTypes) => {
  const { 
    reminders,
    upcomingReminders, 
    completedReminders, 
    completeReminder,
    deleteReminder,
    loadReminders,
    handleLogout
  } = useHome();

  const { scheduleTestNotification } = useNotifications();

  // Reload reminders when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadReminders();
    }, [])
  );

  const handleAddReminder = () => {
    // Navigate to create reminder screen
    console.log('Navigate to create reminder');
    navigation.navigate(routes.ReminderFormScreen, { reminder: undefined });
  };

  const handleReminderPress = (id: string) => {
    // Navigate to edit reminder screen
    const reminder = reminders.find((r: any) => r.id === id);
    if (reminder) {
      navigation.navigate(routes.ReminderFormScreen, { reminder });
    }
  };

  const handleDeleteReminder = (id: string) => {
    deleteReminder(id);
  };

  const handleProfilePress = () => {
    // Navigate to profile screen
    navigation.navigate(routes.ProfileScreen);
  };

  const handleTestNotification = async () => {
    try {
      await scheduleTestNotification();
      Alert.alert(
        "Test Notification Scheduled",
        "A test notification will appear in 10 seconds!",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to schedule test notification",
        [{ text: "OK" }]
      );
    }
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
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleTestNotification}
                activeOpacity={0.7}
              >
                <Icon name="notifications-outline" size={20} color={pallete.light} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <Icon name="log-out-outline" size={20} color={pallete.light} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.profileButton}
                onPress={handleProfilePress}
                activeOpacity={0.7}
              >
                <Icon name="person" size={20} color={pallete.light} />
              </TouchableOpacity>
            </View>
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
                  time={reminder.times.join(', ')}
                  isCompleted={false}
                  onPress={() => handleReminderPress(reminder.id)}
                  onComplete={() => completeReminder(reminder.id)}
                  onDelete={() => handleDeleteReminder(reminder.id)}
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
                    time={reminder.times.join(', ')}
                    isCompleted={true}
                    onPress={() => handleReminderPress(reminder.id)}
                    onDelete={() => handleDeleteReminder(reminder.id)}
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