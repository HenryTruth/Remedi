export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateUsername = (username: string): ValidationResult => {
  if (!username.trim()) {
    return {
      isValid: false,
      errorMessage: "Username is required"
    };
  }
  
  if (username.length < 3) {
    return {
      isValid: false,
      errorMessage: "Username must be at least 3 characters long"
    };
  }
  
  if (username.length > 20) {
    return {
      isValid: false,
      errorMessage: "Username must be less than 20 characters"
    };
  }
  
  // Check for valid characters (alphanumeric and underscore)
  const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!validUsernameRegex.test(username)) {
    return {
      isValid: false,
      errorMessage: "Username can only contain letters, numbers, and underscores"
    };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      isValid: false,
      errorMessage: "Password is required"
    };
  }
  
  if (password.length < 6) {
    return {
      isValid: false,
      errorMessage: "Password must be at least 6 characters long"
    };
  }
  
  if (password.length > 50) {
    return {
      isValid: false,
      errorMessage: "Password must be less than 50 characters"
    };
  }
  
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return {
      isValid: false,
      errorMessage: "Email is required"
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid email address"
    };
  }
  
  return { isValid: true };
};

export const validateLoginForm = (email: string, password: string) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  
  return {
    email: emailValidation,
    password: passwordValidation,
    isFormValid: emailValidation.isValid && passwordValidation.isValid
  };
};

export const validateRegistrationForm = (username: string, email: string, password: string, confirmPassword: string) => {
  const usernameValidation = validateUsername(username);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  
  let confirmPasswordValidation: ValidationResult = { isValid: true };
  if (password !== confirmPassword) {
    confirmPasswordValidation = {
      isValid: false,
      errorMessage: "Passwords do not match"
    };
  }
  
  return {
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    isFormValid: usernameValidation.isValid && emailValidation.isValid && passwordValidation.isValid && confirmPasswordValidation.isValid
  };
};
