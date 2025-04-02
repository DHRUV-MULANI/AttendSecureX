import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import WelcomeCard from '../components/WelcomeCard';
import LoginForm from '../components/LoginForm';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  const handleLogin = (userData: { email: string; password: string; userType: string }) => {
    if (userData.userType === 'admin') {
      navigation.navigate('AdminDashboard' as never);
    } else {
      navigation.navigate('StudentDashboard' as never);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <WelcomeCard />
        <LoginForm onLogin={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});