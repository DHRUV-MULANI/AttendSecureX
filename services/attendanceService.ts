// Mock Attendance Service

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  timestamp: number;
  status: 'present' | 'absent' | 'late';
  verificationMethods: {
    qrCode: boolean;
    wifi: boolean;
    gps: boolean;
    faceRecognition?: boolean;
    ipCheck?: boolean;
  };
}

interface QRCodeData {
  id: string;
  courseId: string;
  timestamp: number;
  expiresIn: number; // in seconds
}

interface VerificationSettings {
  wifi: boolean;
  gps: boolean;
  faceRecognition: boolean;
  ipCheck: boolean;
}

class AttendanceService {
  private static instance: AttendanceService;
  private _attendanceRecords: AttendanceRecord[] = [];
  private _qrCodes: QRCodeData[] = [];
  private _verificationSettings: VerificationSettings = {
    wifi: true,
    gps: true,
    faceRecognition: false,
    ipCheck: false
  };
  
  // Mock data for courses
  private _courses = [
    { id: 'CSC301', name: 'Introduction to Programming' },
    { id: 'CSC405', name: 'Data Structures & Algorithms' },
    { id: 'MAT201', name: 'Calculus II' },
    { id: 'ENG102', name: 'Technical Writing' },
    { id: 'PHY301', name: 'Physics for Computing' },
  ];
  
  // Mock data for students
  private _students = [
    { id: 'STU001', name: 'Alex Johnson' },
    { id: 'STU002', name: 'Jamie Smith' },
    { id: 'STU003', name: 'Taylor Wilson' },
    { id: 'STU004', name: 'Morgan Lee' },
    { id: 'STU005', name: 'Casey Brown' },
  ];
  
  private constructor() {
    // Generate some mock attendance records
    this._generateMockAttendanceData();
  }
  
  private _generateMockAttendanceData() {
    // Last 30 days of attendance for each student
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      
      this._students.forEach(student => {
        this._courses.forEach(course => {
          // 85% chance of being present
          const status = Math.random() > 0.15 ? 'present' : 'absent';
          
          if (Math.random() > 0.8) { // Don't create records for every course every day
            this._attendanceRecords.push({
              id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              studentId: student.id,
              studentName: student.name,
              courseId: course.id,
              courseName: course.name,
              timestamp: date.getTime(),
              status: status as 'present' | 'absent' | 'late',
              verificationMethods: {
                qrCode: true,
                wifi: Math.random() > 0.1,
                gps: Math.random() > 0.1,
                faceRecognition: Math.random() > 0.5,
                ipCheck: Math.random() > 0.3,
              }
            });
          }
        });
      });
    }
  }
  
  public static getInstance(): AttendanceService {
    if (!AttendanceService.instance) {
      AttendanceService.instance = new AttendanceService();
    }
    return AttendanceService.instance;
  }
  
  public getVerificationSettings(): VerificationSettings {
    return { ...this._verificationSettings };
  }
  
  public updateVerificationSettings(settings: Partial<VerificationSettings>): VerificationSettings {
    this._verificationSettings = {
      ...this._verificationSettings,
      ...settings
    };
    return this._verificationSettings;
  }
  
  public generateQRCode(courseId: string): QRCodeData {
    // Expire any existing QR codes for this course
    this._qrCodes = this._qrCodes.filter(qr => qr.courseId !== courseId);
    
    const newQRCode: QRCodeData = {
      id: `qr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      courseId,
      timestamp: Date.now(),
      expiresIn: 300 // 5 minutes
    };
    
    this._qrCodes.push(newQRCode);
    return newQRCode;
  }
  
  public validateQRCode(qrData: string): { valid: boolean; message?: string; data?: QRCodeData } {
    try {
      const parsedData: QRCodeData = JSON.parse(qrData);
      
      // Find the QR code in our records
      const qrCode = this._qrCodes.find(qr => qr.id === parsedData.id);
      
      if (!qrCode) {
        return { valid: false, message: 'QR code not found' };
      }
      
      // Check if expired
      const now = Date.now();
      if (now > qrCode.timestamp + (qrCode.expiresIn * 1000)) {
        return { valid: false, message: 'QR code has expired' };
      }
      
      return { valid: true, data: qrCode };
    } catch (error) {
      return { valid: false, message: 'Invalid QR code format' };
    }
  }
  
  public markAttendance(
    studentId: string,
    qrData: QRCodeData,
    verificationData: {
      wifiVerified: boolean;
      gpsVerified: boolean;
      faceVerified?: boolean;
      ipVerified?: boolean;
    }
  ): AttendanceRecord | null {
    // In a real app, we'd verify each method according to the admin settings
    
    // Find student
    const student = this._students.find(s => s.id === studentId);
    if (!student) return null;
    
    // Find course
    const course = this._courses.find(c => c.id === qrData.courseId);
    if (!course) return null;
    
    // Check verification requirements
    let canMarkAttendance = true;
    
    if (this._verificationSettings.wifi && !verificationData.wifiVerified) {
      canMarkAttendance = false;
    }
    
    if (this._verificationSettings.gps && !verificationData.gpsVerified) {
      canMarkAttendance = false;
    }
    
    if (this._verificationSettings.faceRecognition && 
        verificationData.faceVerified !== undefined && 
        !verificationData.faceVerified) {
      canMarkAttendance = false;
    }
    
    if (this._verificationSettings.ipCheck && 
        verificationData.ipVerified !== undefined && 
        !verificationData.ipVerified) {
      canMarkAttendance = false;
    }
    
    if (!canMarkAttendance) {
      return null;
    }
    
    // Create new attendance record
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      studentId,
      studentName: student.name,
      courseId: qrData.courseId,
      courseName: course.name,
      timestamp: Date.now(),
      status: 'present',
      verificationMethods: {
        qrCode: true,
        wifi: verificationData.wifiVerified,
        gps: verificationData.gpsVerified,
        faceRecognition: verificationData.faceVerified,
        ipCheck: verificationData.ipVerified
      }
    };
    
    this._attendanceRecords.push(newRecord);
    return newRecord;
  }
  
  public getStudentAttendance(studentId: string): AttendanceRecord[] {
    return this._attendanceRecords
      .filter(record => record.studentId === studentId)
      .sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  }
  
  public getCourseAttendance(courseId: string, date?: Date): AttendanceRecord[] {
    let records = this._attendanceRecords.filter(record => record.courseId === courseId);
    
    if (date) {
      // Filter to only include records from the specified date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      records = records.filter(record => {
        const recordDate = new Date(record.timestamp);
        return recordDate >= startOfDay && recordDate <= endOfDay;
      });
    }
    
    return records.sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  }
  
  public getAttendanceStatistics(courseId?: string, studentId?: string): {
    totalSessions: number;
    presentCount: number;
    absentCount: number;
    lateCount: number;
    attendanceRate: number;
  } {
    let records = this._attendanceRecords;
    
    if (courseId) {
      records = records.filter(record => record.courseId === courseId);
    }
    
    if (studentId) {
      records = records.filter(record => record.studentId === studentId);
    }
    
    const totalSessions = records.length;
    const presentCount = records.filter(record => record.status === 'present').length;
    const absentCount = records.filter(record => record.status === 'absent').length;
    const lateCount = records.filter(record => record.status === 'late').length;
    
    const attendanceRate = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0;
    
    return {
      totalSessions,
      presentCount,
      absentCount,
      lateCount,
      attendanceRate
    };
  }
}

export default AttendanceService.getInstance();