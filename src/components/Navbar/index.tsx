import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import Button from '../Button';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('/shopping');
    };
    return (
        <header className='text-gray-600 body-font w-full'>
            <div className='container w-full mx-auto  xl:px-40  shadow flex flex-wrap p-5 flex-col md:flex-row items-center'>
                <Link
                    to='/'
                    className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
                        viewBox='0 0 24 24'
                    >
                        <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
                    </svg>
                    <span className='ml-3 text-xl'>Logo</span>
                </Link>
                <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
                    <Link
                        to='/'
                        className='mr-5 hover:text-gray-900 uppercase text-xl font-semibold'
                    >
                        Home
                    </Link>
                    <Button
                        title={<FaCartShopping />}
                        width={'40px'}
                        height={40}
                        borderRadius={6}
                        bgColor='#4BB543'
                        color='white'
                        fontSize={24}
                        onClick={handleClick}
                    />
                </nav>
            </div>
        </header>
    );
};
export default Navbar;
