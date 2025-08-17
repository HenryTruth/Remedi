import { useState } from 'react';
import { validateLoginForm } from '../../utils/validation';
import { FormField } from './type';



export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleLogin = () => {
    const validation = validateLoginForm(username, password);
    
    setErrors({
      username: validation.username.errorMessage || '',
      password: validation.password.errorMessage || ''
    });

    if (validation.isFormValid) {
      // TODO: Implement actual login logic
      console.log('Login attempt:', { username, password });
    }
  };

  const formFields: FormField[] = [
    {
      label: 'Username',
      placeholder: 'Enter your username',
      value: username,
      onChangeText: setUsername,
      error: errors.username
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
    handleLogin
  };
};

