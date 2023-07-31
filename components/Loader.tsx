import { BiLoaderCircle } from 'react-icons/bi'

import { bebasNeue } from '@/utils/fonts';

const Loader = () => {

    return (
        <div className='loader'>
            <h1 className={`text-4xl text-white-smoke ${bebasNeue.className}`}>Loading</h1>
            <BiLoaderCircle className='text-green absolute' size={200} />
        </div>
    );
};

export default Loader;