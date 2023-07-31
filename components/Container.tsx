'use client';

import { useRouter } from 'next/navigation';

import { spicyRice, bubblegumSans } from '@/utils/fonts';
import CustomButton from './CustomButton';

const Container = () => {
    const router = useRouter();

    const handleBtnClick = () => {
        router.push('/login')
    }

    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-3 md:gap-8 p-5 bg-chat-background w-[75vw] h-[75vh] md:w-[60vw] md:h-[60vh] rounded-2xl shadow-lg'>
            <h1 className={`font-bold text-xl md:text-5xl ${spicyRice.className}`}>Welcome to Chat Messenger App</h1>
            <span className={`container__text ${bubblegumSans.className}`}>
                <p>A simple web application that allows users to create new rooms for sharing messages.</p>
                <p>Users can create groups with multiple users and share common messages</p>
                <p>Users can initiate audio and video calls to other users.</p>
            </span>
            <CustomButton text='Proceed to Login' type='button' handleClick={handleBtnClick} />
        </div>
    );
};

export default Container;