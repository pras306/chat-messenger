'use client';

import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { montserrat } from '@/utils/fonts';
import { CustomButton } from '@/components';
import { LoginFormProps } from '@/types';
import { login_validate } from '@/utils/validate';

const Login = () => {
    const [show, setShow] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: LoginFormProps) => {
        const status = await signIn('credentials', {
            email: values.email,
            password: values.password,
            isGoogleSignIn: values.isGoogleSignIn,
            isGuest: values.isGuest,
            redirect: false,
            callbackUrl: '/profile'
        });

        if(status.ok) router.push(status.url);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            isGoogleSignIn: false,
            isGuest: false
        },
        onSubmit,
        validate: login_validate
    });

    const handleGoogleLogin = async() => {
        const status = await signIn('google', {
            redirect: false,
            callbackUrl: 'http://localhost:3000/profile'
        });

        if(status.ok) router.push(status.url);
    };

    const handleGuestSignIn = async() => {
        const status = await signIn('credentials', {
            email: 'guest@guest.com',
            password: 'guestuser',
            isGoogleSignIn: false,
            isGuest: true,
            redirect: false,
            callbackUrl: '/profile'
        });

        if(status.ok) router.push(status.url);
    }

    const handleShowPassword = () => {
        setShow(!show);
    };
    
    return (
        <div className='flex flex-col items-center justify-center py-5 w-full h-full bg-black opacity-80 md:rounded-r-lg'>
            <h1 className={`${montserrat.className} text-xl md:text-3xl text-green`}>Welcome to App Login</h1>
            <form className='flex flex-col items-center mt-5 gap-5 text-green w-full' onSubmit={formik.handleSubmit}>
                <div className='auth__input-container'>
                    <input 
                        id='email' 
                        type='email' 
                        placeholder='Email'
                        className={`peer auth__input ${formik.errors.email && formik.touched.email ? 'ring ring-rose-600 ring-offset-4' : ''}`}  
                        {...formik.getFieldProps('email')} />
                    <HiAtSymbol size={25} className='auth__input-icon' />
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.email}</span> : null}
                </div>
                <div className='auth__input-container'>
                    <input 
                        id='password' 
                        type={ show ? 'text' : 'password'} 
                        placeholder='Password'
                        className={`peer auth__input ${formik.errors.password && formik.touched.password ? 'ring ring-rose-600 ring-offset-4' : ''}`} 
                        {...formik.getFieldProps('password')} />
                    <HiFingerPrint size={25} className='auth__input-icon' onClick={handleShowPassword} />
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.password}</span> : null}
                </div>
                <CustomButton text='Login' type='submit' />
                <CustomButton text='Sign in with Google' type='button' handleClick={handleGoogleLogin} icon={FcGoogle} />
                <CustomButton text='Sign in as Guest' type='button' handleClick={handleGuestSignIn} />
                <span className='flex items-center gap-3'>don't have an account yet? 
                    <Link href='/register' className='text-blue'>Sign up</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;