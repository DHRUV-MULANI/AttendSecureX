import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function WelcomeCard() {
  return (
    <View style={styles.card}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://api.a0.dev/assets/image?text=attendance%20app%20logo%20minimal%20modern&aspect=1:1' }} 
          style={styles.logo} 
        />
      </View>
      <Text style={styles.title}>Campus Attendance</Text>
      <Text style={styles.subtitle}>Simple, Secure, Smart</Text>
      
      <View style={styles.featureRow}>
        <View style={styles.featureItem}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#4A80F0" style={styles.icon} />
          <Text style={styles.featureText}>QR Scanning</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="location-on" size={24} color="#4A80F0" style={styles.icon} />
          <Text style={styles.featureText}>Geo-Verification</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="wifi" size={24} color="#4A80F0" style={styles.icon} />
          <Text style={styles.featureText}>WiFi Check</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  featureItem: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#555',
  },
});