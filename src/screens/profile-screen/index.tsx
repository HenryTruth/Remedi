import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { Hscreen } from '../../components/containers';
import AppText from '../../components/app-text';
import { useProfile } from './useProfile';
import { styles } from './style';
import { pallete } from '../../configs/Colors';
import { fontFamilyWeightMap } from '../../configs/ThemeSetup';
import { moderateSize } from '../../utils/useResponsiveness';
import { GlobalScreenTypes } from '../../configs/global-screen-types';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }: GlobalScreenTypes) => {
  const { user, reminderStats, isLoading, handleLogout, loadReminderStats } = useProfile();

  // Reload stats when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadReminderStats();
    }, [])
  );

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await handleLogout();
            // Navigation will be handled by auth context
          },
        },
      ]
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screenContainer}>
      <Hscreen screenColor={pallete.screen} hasPadding={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Icon name="chevron-back" size={20} color={pallete.light} />
            </TouchableOpacity>
            <AppText 
              text="Profile"
              styles={styles.headerTitle}
              color={pallete.text}
              fontSize={moderateSize(20)}
              fontWeight={fontFamilyWeightMap.SemiBold}
            />
            <View style={styles.headerSpacer} />
          </View>

          {/* Profile Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={60} color={pallete.light} />
            </View>
            <AppText 
              text={user?.username || 'User'}
              styles={styles.userName}
              color={pallete.text}
              fontSize={moderateSize(24)}
              fontWeight={fontFamilyWeightMap.Bold}
            />
            <AppText 
              text="Medication Manager"
              styles={styles.userRole}
              color={pallete.grey}
              fontSize={moderateSize(16)}
              fontWeight={fontFamilyWeightMap.Regular}
            />
          </View>

          {/* Profile Info Cards */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Icon name="medical" size={24} color={pallete.primary} />
              </View>
              <View style={styles.infoContent}>
                <AppText 
                  text="Active Medications"
                  styles={styles.infoTitle}
                  color={pallete.text}
                  fontSize={moderateSize(16)}
                  fontWeight={fontFamilyWeightMap.SemiBold}
                />
                <AppText 
                  text={`${reminderStats.activeMedications} medications`}
                  styles={styles.infoSubtitle}
                  color={pallete.grey}
                  fontSize={moderateSize(14)}
                  fontWeight={fontFamilyWeightMap.Regular}
                />
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Icon name="time" size={24} color={pallete.primary} />
              </View>
              <View style={styles.infoContent}>
                <AppText 
                  text="Next Reminder"
                  styles={styles.infoTitle}
                  color={pallete.text}
                  fontSize={moderateSize(16)}
                  fontWeight={fontFamilyWeightMap.SemiBold}
                />
                <AppText 
                  text={reminderStats.nextReminder ? `Today at ${reminderStats.nextReminder}` : 'No upcoming reminders'}
                  styles={styles.infoSubtitle}
                  color={pallete.grey}
                  fontSize={moderateSize(14)}
                  fontWeight={fontFamilyWeightMap.Regular}
                />
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Icon name="checkmark-circle" size={24} color={pallete.primary} />
              </View>
              <View style={styles.infoContent}>
                <AppText 
                  text="Completed Today"
                  styles={styles.infoTitle}
                  color={pallete.text}
                  fontSize={moderateSize(16)}
                  fontWeight={fontFamilyWeightMap.SemiBold}
                />
                <AppText 
                  text={`${reminderStats.completedToday} of ${reminderStats.totalToday} doses`}
                  styles={styles.infoSubtitle}
                  color={pallete.grey}
                  fontSize={moderateSize(14)}
                  fontWeight={fontFamilyWeightMap.Regular}
                />
              </View>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
              <View style={styles.settingsIconContainer}>
                <Icon name="notifications" size={20} color={pallete.grey} />
              </View>
              <AppText 
                text="Notification Settings"
                styles={styles.settingsText}
                color={pallete.text}
                fontSize={moderateSize(16)}
                fontWeight={fontFamilyWeightMap.Regular}
              />
              <Icon name="chevron-forward" size={20} color={pallete.grey} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
              <View style={styles.settingsIconContainer}>
                <Icon name="shield-checkmark" size={20} color={pallete.grey} />
              </View>
              <AppText 
                text="Privacy & Security"
                styles={styles.settingsText}
                color={pallete.text}
                fontSize={moderateSize(16)}
                fontWeight={fontFamilyWeightMap.Regular}
              />
              <Icon name="chevron-forward" size={20} color={pallete.grey} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
              <View style={styles.settingsIconContainer}>
                <Icon name="help-circle" size={20} color={pallete.grey} />
              </View>
              <AppText 
                text="Help & Support"
                styles={styles.settingsText}
                color={pallete.text}
                fontSize={moderateSize(16)}
                fontWeight={fontFamilyWeightMap.Regular}
              />
              <Icon name="chevron-forward" size={20} color={pallete.grey} />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogoutPress}
            activeOpacity={0.8}
          >
            <Icon name="log-out" size={20} color={pallete.light} style={styles.logoutIcon} />
            <AppText 
              text="Logout"
              styles={styles.logoutButtonText}
              color={pallete.light}
              fontSize={moderateSize(16)}
              fontWeight={fontFamilyWeightMap.SemiBold}
            />
          </TouchableOpacity>
        </View>
      </Hscreen>
    </View>
  );
};

export default ProfileScreen;