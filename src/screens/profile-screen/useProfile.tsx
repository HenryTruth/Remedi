import { useState } from 'react';
import { UserProfile, UseProfileProps } from './type';

export const useProfile = (props: UseProfileProps = {}) => {
  const [user] = useState<UserProfile>({
    id: '1',
    name: 'Henry Joshua',
    email: 'henry.joshua@example.com',
    createdAt: new Date(),
  });

  const handleLogout = () => {
    // 1. Clear user session/tokens
    // 2. Reset app state
    // 3. Navigate to login screen
    console.log('Logging out user:', user.name);
    // For now, just log the action
  };

  return {
    user,
    handleLogout,
  };
};