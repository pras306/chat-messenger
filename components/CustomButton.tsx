'use client';

import { CustomButtonProps } from '@/types';
import { roboto } from '@/utils/fonts';


// ${background ? `bg-${background} hover:bg-${color}` : 'bg-gray-50 hover:bg-gray-200'}
// ${color ? `text-${color} hover:text-${background}` : 'text-black'}

const CustomButton = ({ text, type, handleClick, icon: Icon } : CustomButtonProps ) => {

    return (
        <button
            type={type}
            className='flex items-center gap-2 rounded-md w-fit h-[5vh] px-4 text-center border-2 transition duration-500 hover:scale-110 bg-green text-white hover:bg-white hover:text-green'
            onClick={handleClick}
        >
            <span className={`text-sm lg:text-xl flex-1 ${roboto.className}`}>{text}</span>
            {Icon &&
                <Icon size={25} className='text-xl lg:text-3xl' />
            }
        </button>
    );
};

export default CustomButton;