import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AttendanceHistory() {
  // Mock data - in a real app, this would be fetched from your backend
  const attendanceData = [
    { 
      id: '1', 
      course: 'CSC301', 
      courseName: 'Introduction to Programming',
      date: '2025-03-07', 
      time: '09:30 AM', 
      status: 'present' 
    },
    { 
      id: '2', 
      course: 'MAT201', 
      courseName: 'Calculus II',
      date: '2025-03-06', 
      time: '11:00 AM', 
      status: 'present' 
    },
    { 
      id: '3', 
      course: 'ENG102', 
      courseName: 'Technical Writing',
      date: '2025-03-05', 
      time: '02:15 PM', 
      status: 'absent' 
    },
    { 
      id: '4', 
      course: 'PHY301', 
      courseName: 'Physics for Computing',
      date: '2025-03-04', 
      time: '10:00 AM', 
      status: 'present' 
    },
    { 
      id: '5', 
      course: 'CSC405', 
      courseName: 'Data Structures & Algorithms',
      date: '2025-03-03', 
      time: '01:30 PM', 
      status: 'present' 
    },
  ];
  
  const renderAttendanceItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.attendanceItem}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseCode}>{item.course}</Text>
          <Text style={styles.courseName} numberOfLines={1}>{item.courseName}</Text>
          <View style={styles.dateTimeContainer}>
            <MaterialIcons name="event" size={12} color="#666" style={styles.smallIcon} />
            <Text style={styles.dateTime}>{item.date}</Text>
            <MaterialIcons name="access-time" size={12} color="#666" style={styles.smallIcon} />
            <Text style={styles.dateTime}>{item.time}</Text>
          </View>
        </View>
        
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: item.status === 'present' ? '#E6F7ED' : '#FCEAEA' }
        ]}>
          <MaterialIcons 
            name={item.status === 'present' ? "check-circle" : "cancel"} 
            size={16} 
            color={item.status === 'present' ? '#4CAF50' : '#F44336'} 
          />
          <Text style={[
            styles.statusText,
            { color: item.status === 'present' ? '#4CAF50' : '#F44336' }
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Attendance</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <MaterialIcons name="chevron-right" size={16} color="#4A80F0" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={attendanceData}
        renderItem={renderAttendanceItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4A80F0',
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseCode: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  courseName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    maxWidth: '90%',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIcon: {
    marginRight: 4,
  },
  dateTime: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});