'use client';

import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import { montserrat } from '@/utils/fonts';
import { CustomButton } from '@/components';
import { RegisterFormProps } from '@/types';
import { register_validate } from '@/utils/validate';

const Register = () => {
    const [show, setShow] = useState({ password: false, cPassword: false });
    const router = useRouter();

    const onSubmit = async(values: RegisterFormProps) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            .then(data => {
                if(data) router.push('/profile/create-profile');
            })
            .catch(err => {
                console.log(err);
            });
    }

    const formik = useFormik({
        initialValues: {
            username:'',
            email:'',
            password:'',
            cPassword: '',
            isGoogleSignIn: false,
            isGuest: false,
            profileImage: ''
        },
        onSubmit,
        validate: register_validate
    });

    const handleShowPassword = () => {
        setShow({ ...show, password: !show.password });
    };

    const handleShowConfirmPassword = () => {
        setShow({ ...show, cPassword: !show.cPassword });
    };

    return (
        <div className='flex flex-col items-center justify-center py-5 w-full h-full bg-black opacity-80 md:rounded-r-lg'>
            <h1 className={`${montserrat.className} text-xl md:text-3xl text-green`}>Welcome to App Login</h1>
            <form className='flex flex-col items-center mt-5 gap-5 text-green w-full' onSubmit={formik.handleSubmit}>
                <div className='auth__input-container'>
                    <input 
                        id='username' 
                        type='text' 
                        placeholder='Username' 
                        className={`peer auth__input ${formik.errors.username && formik.touched.username ? 'ring ring-rose-600 ring-offset-4' : ''}`}  
                        {...formik.getFieldProps('username')} 
                    />
                    <HiOutlineUser size={25} className='auth__input-icon' />
                    {formik.errors.username && formik.touched.username ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.username}</span> : null}
                </div>
                <div className='auth__input-container'>
                    <input 
                        id='email' 
                        type='email' 
                        placeholder='Email' 
                        className={`peer auth__input ${formik.errors.email && formik.touched.email ? 'ring ring-rose-600 ring-offset-4' : ''}`} 
                        {...formik.getFieldProps('email')} 
                    />
                    <HiAtSymbol size={25} className='auth__input-icon' />
                    {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.email}</span> : null}
                </div>
                <div className='auth__input-container'>
                    <input 
                        id='password' 
                        type={ show.password ? 'text' : 'password'} 
                        placeholder='Password' 
                        className={`peer auth__input ${formik.errors.password && formik.touched.password ? 'ring ring-rose-600 ring-offset-4' : ''}`} 
                        {...formik.getFieldProps('password')} 
                    />
                    <HiFingerPrint size={25} className='auth__input-icon' onClick={handleShowPassword} />
                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.password}</span> : null}
                </div>
                <div className='auth__input-container'>
                    <input 
                        id='cPassword' 
                        type={ show.cPassword ? 'text' : 'password'} 
                        placeholder='Confirm Password' 
                        className={`peer auth__input ${formik.errors.cPassword && formik.touched.cPassword ? 'ring ring-rose-600 ring-offset-4' : ''}`}  
                        {...formik.getFieldProps('cPassword')} />
                    <HiFingerPrint size={25} className='auth__input-icon' onClick={handleShowConfirmPassword} />
                    {formik.errors.cPassword && formik.touched.cPassword ? <span className='text-rose-500 text-[14px] font-bold absolute top-0 z-10 select-none'>{formik.errors.cPassword}</span> : null}
                </div>
                <CustomButton text='Register' type='submit' />
                <span className='flex items-center gap-3'>Already have an account? 
                    <Link href='/login' className='text-blue'>Sign in</Link>
                </span>
            </form>
        </div>
    );
};

export default Register;