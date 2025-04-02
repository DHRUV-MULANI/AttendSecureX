// Mock Firebase Authentication Service

interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  userType: 'student' | 'admin';
}

interface AuthState {
  user: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
}

class AuthService {
  private static instance: AuthService;
  private _state: AuthState = {
    user: null,
    isLoading: false,
    error: null
  };
  
  private _listeners: ((state: AuthState) => void)[] = [];
  
  // Mock user data
  private _mockUsers = [
    {
      uid: 'admin123',
      email: 'admin@university.edu',
      password: 'admin123',
      displayName: 'Admin User',
      photoURL: null,
      userType: 'admin' as const
    },
    {
      uid: 'student123',
      email: 'student@university.edu',
      password: 'student123',
      displayName: 'Alex Johnson',
      photoURL: null,
      userType: 'student' as const
    }
  ];
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  public getState(): AuthState {
    return this._state;
  }
  
  public addListener(listener: (state: AuthState) => void): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
  
  private _emitChange() {
    for (const listener of this._listeners) {
      listener(this._state);
    }
  }
  
  public async signIn(email: string, password: string): Promise<FirebaseUser> {
    this._state = { ...this._state, isLoading: true, error: null };
    this._emitChange();
    
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const user = this._mockUsers.find(
          u => u.email === email && u.password === password
        );
        
        if (user) {
          const { password, ...userWithoutPassword } = user;
          this._state = {
            user: userWithoutPassword,
            isLoading: false,
            error: null
          };
          this._emitChange();
          resolve(userWithoutPassword);
        } else {
          this._state = {
            user: null,
            isLoading: false,
            error: 'Invalid email or password'
          };
          this._emitChange();
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  }
  
  public async signOut(): Promise<void> {
    this._state = { ...this._state, isLoading: true };
    this._emitChange();
    
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        this._state = {
          user: null,
          isLoading: false,
          error: null
        };
        this._emitChange();
        resolve();
      }, 500);
    });
  }
  
  public async registerStudent(
    email: string, 
    password: string, 
    displayName: string
  ): Promise<void> {
    this._state = { ...this._state, isLoading: true, error: null };
    this._emitChange();
    
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Check if email already exists
        if (this._mockUsers.some(u => u.email === email)) {
          this._state = {
            ...this._state,
            isLoading: false,
            error: 'Email already in use'
          };
          this._emitChange();
          reject(new Error('Email already in use'));
          return;
        }
        
        // Create new user (in a real app, this would be stored in Firebase)
        const newUser = {
          uid: `student${Date.now()}`,
          email,
          password,
          displayName,
          photoURL: null,
          userType: 'student' as const
        };
        
        this._mockUsers.push(newUser);
        
        this._state = {
          ...this._state,
          isLoading: false,
          error: null,
          // In a real app, the user wouldn't be automatically logged in
          // until admin approval
          user: null
        };
        
        this._emitChange();
        resolve();
      }, 1500);
    });
  }
}

export default AuthService.getInstance();