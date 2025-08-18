import { useState } from 'react';
import { Alert } from 'react-native';
import { validateLoginForm } from '../../utils/validation';
import { FormField } from './type';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export const useLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const validation = validateLoginForm(email, password);
    
    setErrors({
      email: validation.email.errorMessage || '',
      password: validation.password.errorMessage || ''
    });

    if (validation.isFormValid) {
      try {
        setIsLoading(true);
        await login(email, password);
      } catch (error) {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please try again.',
          [{ text: 'OK' }]
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formFields: FormField[] = [
    {
      label: 'Email',
      placeholder: 'Enter your email',
      value: email,
      onChangeText: setEmail,
      error: errors.email
    },
    {
      label: 'Password',
      placeholder: 'Enter your password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
      error: errors.password
    }
  ];

  return {
    formFields,
    handleLogin,
    isLoading
  };
};

