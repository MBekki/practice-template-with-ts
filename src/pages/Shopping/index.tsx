import { useEffect, useState } from 'react';
import { ProductType } from '../../interfaces';
import { Button } from '../../components';
import { BsTrash } from 'react-icons/bs';

const Shopping = () => {
    const [products, setProducts] = useState<ProductType[]>(
        JSON.parse(localStorage.getItem('carts') as string) || []
    );
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const handleDelete = (id: number): void => {
        const updateCart = products.filter(item => item.id !== id);
        localStorage.setItem('carts', JSON.stringify(updateCart));
        setProducts(updateCart);
    };

    const handleDec = (id: number) => {
        const existProduct = products.find(item => item.id === id);

        if (existProduct?.quantity === 1) {
            handleDelete(existProduct.id);
        } else {
            const updatedCart = products.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }

                return item;
            });

            localStorage.setItem('carts', JSON.stringify(updatedCart));
            setProducts(updatedCart);
        }
    };

    const handleInc = (id: number) => {
        const updateCart = products.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });
        localStorage.setItem('carts', JSON.stringify(updateCart));
        setProducts(updateCart);
    };

    useEffect(() => {
        const total = products.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [products]);

    const handleClick = (): void => {};

    return (
        <div className='xl:px-40 lg:px-24 md:px-20 p mt-10'>
            <p className='text-3xl font-semibold'>Your Cart</p>
            <div className='flex gap-8 mt-6 w-full'>
                <div className='flex flex-col h-auto gap-4 w-[70%]'>
                    {products.map(item => (
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
                                        onClick={() => handleDelete(item.id)}
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
                        <p className='text-2xl font-semibold'>Total price:</p>
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
    );
};
export default Shopping;
