import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
    };

    interface Session {
        user: {
            id: string;
            status: string;
            isGoogleSignIn: boolean;
            isGuest: boolean;
        } & DefaultSession['user']
    };
};