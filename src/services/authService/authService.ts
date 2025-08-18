import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData, RegisteredUser, User } from './type';
import { AUTH_TOKEN_KEY, USER_DATA_KEY, REGISTERED_USERS_KEY } from './constant';



class AuthService {
  async storeAuthData(authData: AuthData): Promise<void> {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, authData.token);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(authData.user));
    } catch (error) {
      throw new Error('Failed to store authentication data');
    }
  }

  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      return null;
    }
  }

  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      return !!token;
    } catch (error) {
      return false;
    }
  }

  async getRegisteredUsers(): Promise<RegisteredUser[]> {
    try {
      const users = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      return [];
    }
  }
  async storeRegisteredUsers(users: RegisteredUser[]): Promise<void> {
    try {
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<RegisteredUser | null> {
    try {
      const users = await this.getRegisteredUsers();
      return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<AuthData> {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const registeredUser = await this.findUserByEmail(email);
      if (!registeredUser) {
        throw new Error('User not found');
      }

      if (registeredUser.password !== password) {
        throw new Error('Invalid password');
      }

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

      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser: RegisteredUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password
      };

      const users = await this.getRegisteredUsers();
      users.push(newUser);
      await this.storeRegisteredUsers(users);

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

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      throw error;
    }
  }

  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
      throw error;
    }
  }

  async clearAllStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
