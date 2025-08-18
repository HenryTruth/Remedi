import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, RegisteredUser, User } from './type';



class AuthService {
  // Store authentication data
  async storeAuthData(authData: AuthData): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, authData.token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(authData.user));
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  }

  // Get stored authentication token
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  // Get stored user data
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Get registered users
  async getRegisteredUsers(): Promise<RegisteredUser[]> {
    try {
      const users = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting registered users:', error);
      return [];
    }
  }

  // Store registered users
  async storeRegisteredUsers(users: RegisteredUser[]): Promise<void> {
    try {
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error storing registered users:', error);
      throw error;
    }
  }

  // Find user by email
  async findUserByEmail(email: string): Promise<RegisteredUser | null> {
    try {
      const users = await this.getRegisteredUsers();
      return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<AuthData> {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Find the registered user
      const registeredUser = await this.findUserByEmail(email);
      if (!registeredUser) {
        throw new Error('User not found');
      }

      // Check password (in production, compare with hashed password)
      if (registeredUser.password !== password) {
        throw new Error('Invalid password');
      }

      // Create auth data for valid user
      const authData: AuthData = {
        token: `token_${registeredUser.id}_${Date.now()}`,
        user: {
          id: registeredUser.id,
          username: registeredUser.username,
          email: registeredUser.email
        }
      };
      
      await this.storeAuthData(authData);
      return authData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(username: string, email: string, password: string): Promise<AuthData> {
    try {
      if (!username || !email || !password) {
        throw new Error('Username, email, and password are required');
      }

      // Check if user already exists
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password // In production, hash this password
      };

      // Add to registered users
      const users = await this.getRegisteredUsers();
      users.push(newUser);
      await this.storeRegisteredUsers(users);

      // Create auth data
      const authData: AuthData = {
        token: `token_${newUser.id}_${Date.now()}`,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      };
      
      await this.storeAuthData(authData);
      return authData;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
      throw new Error('Failed to logout');
    }
  }

  // Clear all auth data
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  }

  // Clear all storage (helper function for debugging/testing)
  async clearAllStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data cleared');
    } catch (error) {
      console.error('Error clearing all storage:', error);
      throw error;
    }
  }
}

export default new AuthService();
