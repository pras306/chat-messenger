import { IconType } from 'react-icons';
import { Session } from 'next-auth';
import { Timestamp } from 'firebase/firestore';

export interface ProviderProps {
    children: React.ReactNode;
    session?: Session
};

export interface CustomButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    handleClick?: () => void;
    icon ?: IconType;
};

export interface LoginFormProps {
    email: string;
    password: string;
    isGoogleSignIn: boolean;
    isGuest: boolean;
};

export interface RegisterFormProps {
    username: string;
    email: string;
    password: string;
    cPassword: string;
    isGoogleSignIn: boolean;
    isGuest: boolean;
    profileImage: string;
};

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    profileImage?: string;
    createdAt: Timestamp;
    editedAt?: Timestamp;
    status?: string;
    isGoogleSignIn?: boolean;
    isGuest?: boolean;
};