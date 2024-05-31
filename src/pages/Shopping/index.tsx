import { useEffect, useState } from 'react';
import { Button } from '../../components';
import { BsTrash } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    decrement,
    deleteItem,
    increment,
} from '../../redux/cartReducer/cartSlice';
import { Link } from 'react-router-dom';

const Shopping = () => {
    const cartsItem = useAppSelector(state => state.carts.carts);

    const dispatch = useAppDispatch();

    const [totalPrice, setTotalPrice] = useState<number>(0);

    const handleDelete = (id: number): void => {
        dispatch(deleteItem(id));
    };

    const handleDec = (id: number) => {
        dispatch(decrement(id));
    };

    const handleInc = (id: number) => {
        dispatch(increment(id));
    };

    useEffect(() => {
        const total = cartsItem.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [cartsItem]);

    const handleClick = (): void => {};

    return (
        <>
            {cartsItem.length !== 0 ? (
                <div className='xl:px-40 lg:px-24 md:px-20 p mt-10'>
                    <p className='text-3xl font-semibold'>Your Cart</p>
                    <div className='flex gap-8 mt-6 w-full'>
                        <div className='flex flex-col h-auto gap-4 w-[70%]'>
                            {cartsItem.map(item => (
                                <div
                                    key={item.id}
                                    className='flex gap-4 border-2 p-5 border-gray-200 rounded-[6px]'
                                >
                                    <div className='w-[120px] '>
                                        <img
                                            className='w-[100%]  object-cover '
                                            src={item.image}
                                            alt=''
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <div className='flex justify-between'>
                                            <div className='text-[18px]'>
                                                {item.title}
                                            </div>
                                            <Button
                                                title={<BsTrash />}
                                                width={'30px'}
                                                height={30}
                                                bgColor='#ff0e0e'
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                borderRadius={6}
                                                color='white'
                                                fontSize={18}
                                            />
                                        </div>
                                        <div className='text-[13px] font-normal leading-5 line-clamp-2 text-gray-400'>
                                            {item.description}
                                        </div>
                                        <div className='flex gap-[40px] mt-[20px]'>
                                            <div className='flex'>
                                                <button
                                                    onClick={() => {
                                                        handleDec(item.id);
                                                    }}
                                                    className='w-[35px] rounded-s-md border h-[35px] flex justify-center items-center text-[20px]'
                                                >
                                                    -
                                                </button>
                                                <div className='text-[18px] w-[35px] h-[35px] flex justify-center items-center border-y'>
                                                    {item.quantity}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        handleInc(item.id);
                                                    }}
                                                    className='w-[35px] rounded-e-md border h-[35px] flex justify-center items-center text-[20px]'
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className='text-[18px] font-bold'>
                                                ${item.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='w-[30%] h-[300px] border-2  border-gray-200 rounded-md p-5'>
                            <p className='text-2xl font-semibold'>Promocode</p>
                            <input
                                type='text'
                                placeholder='Enter code...'
                                className='px-4 border-2 mt-4 w-full py-3 rounded-md '
                            />
                            <div className='mt-10 flex justify-between'>
                                <p className='text-2xl font-semibold'>
                                    Total price:
                                </p>
                                <p className='font-semibold text-xl'>
                                    {totalPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'usd',
                                    })}
                                </p>
                            </div>
                            <div className='mt-6'>
                                <Button
                                    width={'100%'}
                                    height={50}
                                    borderRadius={6}
                                    bgColor='#5bc0de'
                                    color='white'
                                    fontSize={20}
                                    onClick={() => handleClick()}
                                    title={<p>Order now</p>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <section className='bg-white'>
                    <div className='container flex items-center  px-6 py-24 mx-auto'>
                        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
                            <p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 '>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth='2'
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
                                    />
                                </svg>
                            </p>
                            <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
                                Your cart is empty!!!
                            </h1>

                            <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
                                <Link to='/'>
                                    <button className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
                                        Back to home
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};
export default Shopping;
