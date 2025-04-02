import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialIcons } from '@expo/vector-icons';

interface QRCodeGeneratorProps {
  qrData: string;
  onRefresh: () => void;
}

export default function QRCodeGenerator({ qrData, onRefresh }: QRCodeGeneratorProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (qrData) {
      setTimeLeft(300);
      setIsExpired(false);
      
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [qrData]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance QR Code</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <MaterialIcons name="refresh" size={24} color="#4A80F0" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.qrContainer}>
        {qrData ? (
          <>
            <QRCode
              value={qrData}
              size={200}
              color={isExpired ? '#aaa' : '#000'}
              backgroundColor="white"
            />
            {isExpired && (
              <View style={styles.expiredOverlay}>
                <Text style={styles.expiredText}>EXPIRED</Text>
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator size="large" color="#4A80F0" />
        )}
      </View>
      
      <View style={styles.timerContainer}>
        <MaterialIcons name="timer" size={20} color={timeLeft < 60 ? '#f44336' : '#4A80F0'} />
        <Text style={[
          styles.timerText, 
          timeLeft < 60 && styles.timerWarning
        ]}>
          Expires in: {formatTime(timeLeft)}
        </Text>
      </View>
      
      <Text style={styles.instructionText}>
        Students should scan this QR code to mark their attendance. Code refreshes automatically every 5 minutes.
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    padding: 8,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    position: 'relative',
  },
  expiredOverlay: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  expiredText: {
    color: '#f44336',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '-30deg' }],
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  timerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4A80F0',
    fontWeight: '600',
  },
  timerWarning: {
    color: '#f44336',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});