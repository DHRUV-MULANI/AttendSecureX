import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface VerificationSettingsProps {
  settings: {
    wifi: boolean;
    gps: boolean;
    faceRecognition: boolean;
    ipCheck: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export default function VerificationSettings({ 
  settings, 
  onSettingsChange 
}: VerificationSettingsProps) {
  
  const handleToggle = (setting: string) => {
    onSettingsChange({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings]
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verification Methods</Text>
        <MaterialIcons name="verified-user" size={24} color="#4A80F0" />
      </View>
      
      <Text style={styles.description}>
        Select which verification methods to enforce for student attendance
      </Text>
      
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="wifi" size={22} color="#4A80F0" style={styles.settingIcon} />
            <View>
              <Text style={styles.settingName}>WiFi Verification</Text>
              <Text style={styles.settingDescription}>Must be on campus network</Text>
            </View>
          </View>
          <Switch
            value={settings.wifi}
            onValueChange={() => handleToggle('wifi')}
            trackColor={{ false: '#ddd', true: '#C9D6F9' }}
            thumbColor={settings.wifi ? '#4A80F0' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="location-on" size={22} color="#4A80F0" style={styles.settingIcon} />
            <View>
              <Text style={styles.settingName}>GPS Geofencing</Text>
              <Text style={styles.settingDescription}>Verify classroom location</Text>
            </View>
          </View>
          <Switch
            value={settings.gps}
            onValueChange={() => handleToggle('gps')}
            trackColor={{ false: '#ddd', true: '#C9D6F9' }}
            thumbColor={settings.gps ? '#4A80F0' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="face" size={22} color="#4A80F0" style={styles.settingIcon} />
            <View>
              <Text style={styles.settingName}>Face Recognition</Text>
              <Text style={styles.settingDescription}>Match with student profile</Text>
            </View>
          </View>
          <Switch
            value={settings.faceRecognition}
            onValueChange={() => handleToggle('faceRecognition')}
            trackColor={{ false: '#ddd', true: '#C9D6F9' }}
            thumbColor={settings.faceRecognition ? '#4A80F0' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="language" size={22} color="#4A80F0" style={styles.settingIcon} />
            <View>
              <Text style={styles.settingName}>IP Address Check</Text>
              <Text style={styles.settingDescription}>Verify campus IP range</Text>
            </View>
          </View>
          <Switch
            value={settings.ipCheck}
            onValueChange={() => handleToggle('ipCheck')}
            trackColor={{ false: '#ddd', true: '#C9D6F9' }}
            thumbColor={settings.ipCheck ? '#4A80F0' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Apply Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  saveButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});