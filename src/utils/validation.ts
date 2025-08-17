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

export const validateLoginForm = (username: string, password: string) => {
  const usernameValidation = validateUsername(username);
  const passwordValidation = validatePassword(password);
  
  return {
    username: usernameValidation,
    password: passwordValidation,
    isFormValid: usernameValidation.isValid && passwordValidation.isValid
  };
};
