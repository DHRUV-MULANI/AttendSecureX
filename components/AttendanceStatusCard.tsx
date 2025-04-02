import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface AttendanceStatusCardProps {
  attendanceCount: number;
  totalStudents: number;
  courseName: string;
}

export default function AttendanceStatusCard({ 
  attendanceCount, 
  totalStudents, 
  courseName 
}: AttendanceStatusCardProps) {
  const attendancePercentage = Math.round((attendanceCount / totalStudents) * 100);
  
  const getStatusColor = () => {
    if (attendancePercentage < 50) return '#f44336'; // Red
    if (attendancePercentage < 75) return '#ff9800'; // Orange
    return '#4CAF50'; // Green
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Attendance Status</Text>
        <View style={styles.courseTag}>
          <Text style={styles.courseText}>{courseName}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="person" size={24} color="#4A80F0" />
          <Text style={styles.statValue}>{attendanceCount}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        
        <View style={styles.statItem}>
          <MaterialIcons name="people" size={24} color="#4A80F0" />
          <Text style={styles.statValue}>{totalStudents}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statItem}>
          <MaterialIcons name="pie-chart" size={24} color={getStatusColor()} />
          <Text style={[styles.statValue, { color: getStatusColor() }]}>{attendancePercentage}%</Text>
          <Text style={styles.statLabel}>Rate</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${attendancePercentage}%`, backgroundColor: getStatusColor() }
          ]} 
        />
      </View>
      
      <Text style={styles.dateText}>
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  courseTag: {
    backgroundColor: '#E3EAFC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseText: {
    color: '#4A80F0',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});