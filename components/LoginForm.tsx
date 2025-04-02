import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

interface LoginFormProps {
  onLogin: (userData: { email: string; password: string; userType: string }) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for authentication
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we're allowing any login
      onLogin({ email, password, userType });
      
      toast.success(`Logged in as ${userType}`);
    }, 1500);
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Log In</Text>
      
      <View style={styles.segmentedControl}>
        <TouchableOpacity 
          style={[styles.segmentButton, userType === 'student' && styles.activeSegment]}
          onPress={() => setUserType('student')}
        >
          <Text style={[styles.segmentText, userType === 'student' && styles.activeSegmentText]}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.segmentButton, userType === 'admin' && styles.activeSegment]}
          onPress={() => setUserType('admin')}
        >
          <Text style={[styles.segmentText, userType === 'admin' && styles.activeSegmentText]}>Admin</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.forgotPasswordLink}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      
      {userType === 'student' && (
        <Text style={styles.noteText}>
          Note: First-time login requires admin approval
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  segmentedControl: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: '#4A80F0',
  },
  segmentText: {
    fontWeight: '500',
    color: '#666',
  },
  activeSegmentText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4A80F0',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});