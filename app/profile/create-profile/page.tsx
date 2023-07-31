'use client';

import { useSession } from 'next-auth/react';

const CreateProfile = () => {
    const { data: session } = useSession();

    console.log(session);

    return (
        <div>CreateProfile</div>
    );
};

export default CreateProfile;