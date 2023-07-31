import { LoginFormProps, RegisterFormProps } from "@/types";

export const login_validate = (values: LoginFormProps) => {
    const errors = <LoginFormProps>{};

    if(!values.email) {
        errors.email = 'Required';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid Email Address'
    }

    if(!values.password) {
        errors.password = 'Required';
    } else if(values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Must be between 6 and 20 characters';
    } else if(values.password.includes(' ')) {
        errors.password = 'Cannot include spaces'
    }

    return errors;
};

export const register_validate = (values: RegisterFormProps) => {
    const errors = <RegisterFormProps>{};

    if(!values.username) {
        errors.username = 'Required';
    } else if(values.username.includes(' ')) {
        errors.username = 'Cannot contain white spaces'
    }

    if(!values.email) {
        errors.email = 'Required';
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid Email Address'
    }

    if(!values.password) {
        errors.password = 'Required';
    } else if(values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Must be between 6 and 20 characters';
    } else if(values.password.includes(' ')) {
        errors.password = 'Cannot include spaces'
    }

    if(!values.cPassword) {
        errors.cPassword = 'Required';
    } else if(values.password !== values.cPassword) {
        errors.cPassword = 'Passwords do not match';
    }

    return errors;
}