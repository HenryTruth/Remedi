interface BaseUser {
  id: string;
  username: string;
  email: string;
}

export interface User extends BaseUser {}

export interface RegisteredUser extends BaseUser {
  password: string;
}

export interface AuthData {
  token: string;
  user: User;
}