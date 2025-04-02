import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import QRCodeGenerator from '../components/QRCodeGenerator';
import AttendanceStatusCard from '../components/AttendanceStatusCard';
import CourseSelector from '../components/CourseSelector';
import VerificationSettings from '../components/VerificationSettings';

export default function AdminDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('CSC301');
  const [qrData, setQrData] = useState('');
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(45);
  const [verificationSettings, setVerificationSettings] = useState({
    wifi: true,
    gps: true,
    faceRecognition: false,
    ipCheck: false,
  });

  // Generate a new QR code when course changes or on first load
  useEffect(() => {
    generateNewQrCode();
  }, [selectedCourse]);

  // Simulated data - in a real app, this would connect to your backend
  const generateNewQrCode = () => {
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 1000);
    const newQrData = JSON.stringify({
      course: selectedCourse,
      timestamp,
      randomValue,
      expiresIn: 300, // 5 minutes in seconds
    });
    
    setQrData(newQrData);
    // Reset attendance when generating a new QR code
    setAttendanceCount(0);
  };

  // Simulate students checking in over time
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (qrData) {
      timer = setInterval(() => {
        if (attendanceCount < totalStudents) {
          // Simulate random students joining
          const newJoins = Math.floor(Math.random() * 3) + 1;
          setAttendanceCount(prev => Math.min(prev + newJoins, totalStudents));
        } else {
          clearInterval(timer);
        }
      }, 5000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [qrData, totalStudents]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="#4A80F0" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <CourseSelector
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
        />
        
        <AttendanceStatusCard
          attendanceCount={attendanceCount}
          totalStudents={totalStudents}
          courseName={selectedCourse}
        />
        
        <QRCodeGenerator
          qrData={qrData}
          onRefresh={generateNewQrCode}
        />
        
        <VerificationSettings
          settings={verificationSettings}
          onSettingsChange={setVerificationSettings}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
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
});