

const AuthLayout = ({ children }: { children: React.ReactNode}) => {

    return (
        <div className='grid place-items-center w-full h-full'>
            <div className='flex flex-col md:flex-row border md:rounded-xl shadow-lg w-full h-full md:w-[80vw] md:h-[75vh]'>
                <div className='auth__image'>
                </div>
                <div className='w-full md:w-[50%] h-full flex justify-center items-center rounded-r-lg'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;