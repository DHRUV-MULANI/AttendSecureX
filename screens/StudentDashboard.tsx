import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { toast } from 'sonner-native';
import AttendanceHistory from '../components/AttendanceHistory';

export default function StudentDashboard() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: 'Alex Johnson',
    id: 'STU20210415',
    department: 'Computer Science',
    attendanceRate: '92%',
  });
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanning(false);
    try {
      const qrData = JSON.parse(data);
      
      // Check if QR code is valid (in a real app, you'd verify with the server)
      const currentTime = new Date().getTime();
      const qrTime = qrData.timestamp;
      const expiryTime = qrTime + (qrData.expiresIn * 1000);
      
      if (currentTime > expiryTime) {
        toast.error('QR Code has expired');
        return;
      }
      
      // Simulate verification checks
      simulateVerificationChecks(qrData.course);
      
    } catch (error) {
      toast.error('Invalid QR code');
    }
  };
  
  const simulateVerificationChecks = (courseName: string) => {
    toast.info('Verifying your location...');
    
    setTimeout(() => {
      toast.info('Checking campus WiFi connection...');
      
      setTimeout(() => {
        toast.success(`Attendance marked for ${courseName}`);
      }, 1000);
    }, 1000);
  };

  const startScanning = async () => {
    if (hasPermission === null) {
      toast.error('Requesting camera permission');
    } else if (hasPermission === false) {
      toast.error('Camera permission not granted');
    } else {
      setScanning(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#4A80F0" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=student%20profile%20portrait%20young%20professional&aspect=1:1' }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{studentInfo.name}</Text>
            <Text style={styles.profileId}>{studentInfo.id}</Text>
            <Text style={styles.profileDept}>{studentInfo.department}</Text>
          </View>
          <View style={styles.attendanceIndicator}>
            <Text style={styles.attendanceLabel}>Attendance</Text>
            <Text style={styles.attendanceValue}>{studentInfo.attendanceRate}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
          <MaterialIcons name="qr-code-scanner" size={28} color="white" />
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
        
        <AttendanceHistory />
      </ScrollView>
      
      {scanning && (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.scanner}
          />
          <View style={styles.scannerOverlay}>
            <View style={styles.scannerTarget} />
          </View>
          <TouchableOpacity
            style={styles.closeScannerButton}
            onPress={() => setScanning(false)}
          >
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileId: {
    fontSize: 14,
    color: '#666',
  },
  profileDept: {
    fontSize: 14,
    color: '#666',
  },
  attendanceIndicator: {
    alignItems: 'center',
  },
  attendanceLabel: {
    fontSize: 12,
    color: '#666',
  },
  attendanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scanButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  scannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  scanner: {
    flex: 1,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerTarget: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
  },
  closeScannerButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});