export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
}

export interface UseProfileProps {
  // Add any props needed for profile management
}