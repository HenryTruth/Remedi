import { useState } from 'react';
import { Alert } from 'react-native';
import { validateRegistrationForm } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

const useRegister = () => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        const validation = validateRegistrationForm(username, email, password, confirmPassword);
        
        setErrors({
            username: validation.username.errorMessage || '',
            email: validation.email.errorMessage || '',
            password: validation.password.errorMessage || '',
            confirmPassword: validation.confirmPassword.errorMessage || ''
        });

        if (validation.isFormValid) {
            try {
                setIsLoading(true);
                await register(username, email, password);
            } catch (error) {
                Alert.alert(
                    'Registration Failed',
                    'Unable to create account. Please try again.',
                    [{ text: 'OK' }]
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

    const registrationFields = [
        {
            label: 'Username',
            placeholder: 'Enter your username',
            value: username,
            onChangeText: setUsername,
            error: errors.username
        },
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
        },
        {
            label: 'Confirm Password',
            placeholder: 'Confirm your password',
            value: confirmPassword,
            onChangeText: setConfirmPassword,
            secureTextEntry: true,
            error: errors.confirmPassword
        }
    ];

    return {
        registrationFields,
        handleRegister,
        isLoading
    }
}

export default useRegister;