'use client';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components';

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!session) router.push('/');
    },[]);
    
    return (
        <div>
            <h1>Profile</h1>
            <CustomButton text='Sign Out' type='button' handleClick={signOut} />
        </div>
    );
};

export default Profile;