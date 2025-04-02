import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface CourseSelectorProps {
  selectedCourse: string;
  onSelectCourse: (course: string) => void;
}

export default function CourseSelector({ selectedCourse, onSelectCourse }: CourseSelectorProps) {
  const courses = [
    { id: 'CSC301', name: 'Introduction to Programming' },
    { id: 'CSC405', name: 'Data Structures & Algorithms' },
    { id: 'MAT201', name: 'Calculus II' },
    { id: 'ENG102', name: 'Technical Writing' },
    { id: 'PHY301', name: 'Physics for Computing' },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Course</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesContainer}
      >
        {courses.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={[
              styles.courseItem,
              selectedCourse === course.id && styles.selectedCourse
            ]}
            onPress={() => onSelectCourse(course.id)}
          >
            <Text 
              style={[
                styles.courseId,
                selectedCourse === course.id && styles.selectedCourseText
              ]}
            >
              {course.id}
            </Text>
            <Text 
              style={[
                styles.courseName,
                selectedCourse === course.id && styles.selectedCourseText
              ]}
              numberOfLines={1}
            >
              {course.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  coursesContainer: {
    paddingRight: 16,
  },
  courseItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 150,
    maxWidth: 180,
  },
  selectedCourse: {
    backgroundColor: '#4A80F0',
  },
  courseId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 12,
    color: '#666',
    width: '100%',
  },
  selectedCourseText: {
    color: 'white',
  },
});