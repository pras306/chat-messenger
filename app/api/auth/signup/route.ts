import { query, where, getDocs, Timestamp, doc, setDoc } from 'firebase/firestore';
import { hash } from 'bcryptjs';

import db from '@/database/firestore';
import { User } from '@/types';


export const POST = async(req: Request) => {
    
    if(req.method === 'POST') {
        const { username, email, password, isGoogleSignIn, isGuest, profileImage } = await req.json();

        if(!email) {
            return new Response(JSON.stringify({ message: 'No Form Data available' }), { status: 404 });
        }

        const q = query(db.users, where('email', '==', email));

        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 422 });
        }
        else {
            const pwd = await hash(password, 12);
            
            try {
                const newUserRef = doc(db.users);

                const docData: User = {
                    id: newUserRef.id,
                    name: username,
                    email: email,
                    password: pwd,
                    profileImage: profileImage,
                    createdAt: Timestamp.now(),
                    editedAt: Timestamp.now(),
                    status: 'Available',
                    isGoogleSignIn: isGoogleSignIn,
                    isGuest: isGuest
                };

                await setDoc(newUserRef, docData);
                return new Response(JSON.stringify({ status: true, data: { username: username, email: email, id: newUserRef.id, image: profileImage, isGoogleSignIn: isGoogleSignIn, isGuest: isGuest } }), { status: 201 });
            } catch (error) {
                return new Response(JSON.stringify({ error }), { status: 404 });
            }
        }
    } else {
        return new Response(JSON.stringify({ message: 'Invalid HTTP Request, only POST accepted' }), { status: 500 });
    }
};