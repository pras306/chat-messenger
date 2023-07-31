declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string;
        NEXTAUTH_URL_INTERNAL: string;
        NEXTAUTH_SECRET: string;
        GOOGLE_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        NEXT_PUBLIC_FIREBASE_API_KEY: string;
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
        NEXT_PUBLIC_FIREBASE_APP_ID: string;
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
    };
};