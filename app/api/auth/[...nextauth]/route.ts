import NextAuth from "next-auth/next";

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDocs, query, where } from 'firebase/firestore';
import { compare } from 'bcryptjs';

import db from '@/database/firestore';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            authorize : async(credentials) => {
                try {
                    const q = query(db.users, where('email', '==', credentials.email));

                    const querySnapshot = await getDocs(q);
                    const currentUser = querySnapshot.docs[0].data();

                    if(currentUser) {
                        const checkPassword = await compare(credentials.password, currentUser.password);

                        if(!checkPassword || credentials.email !== currentUser.email) {
                            throw new Error('Username and Password do not match.');
                        }
        
                        return currentUser;
                    } else {
                        throw new Error('User does not exist. Please sign up.');
                    }

                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        session: async({ session }) => {
            const q = query(db.users, where('email', '==', session.user.email));
            const querySnapshot = await getDocs(q);
            const sessionUser = querySnapshot.docs[0].data();

            session.user.id = sessionUser.id;
            session.user.email = sessionUser.email;
            session.user.status = sessionUser.status;
            session.user.name = sessionUser.name;
            session.user.image = sessionUser.profileImage;
            session.user.isGoogleSignIn = sessionUser.isGoogleSignIn;
            session.user.isGuest = sessionUser.isGuest;

            return session;
        },
        signIn: async({ account, user }) => {
            if(account.provider === 'google'){
                try {
                    const q = query(db.users, where('email', '==', user.email));

                    const querySnapshot = await getDocs(q);

                    if(querySnapshot.docs.length > 0) {
                        return true;
                    } else {
                        const values = {
                            email: user.email,
                            password: 'GoogleSignIn',
                            username: user.name,
                            profileImage: user.image,
                            isGoogleSignIn: true,
                            isGuest: false
                        };

                        const options = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(values)
                        };
                
                        await fetch('http://localhost:3000/api/auth/signup', options)
                            .then(res => res.json())
                            .then(data => {
                                if(data) return true;
                                else return false;
                            })
                            .catch(err => {
                                throw new Error(err);
                            });
                    }
                } catch (error) {
                    return false;
                }
            }

            return true;
        }
    }
});

export { handler as GET, handler as POST };