import { FC } from 'react';
import { ProductType } from '../../interfaces';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegStar } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import axios from 'axios';
import Button from '../Button';

const ProductCard: FC<ProductType> = props => {
    const handleClick = async (id: number) => {
        const products: ProductType[] =
            JSON.parse(localStorage.getItem('carts') as string) || [];

        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const product = res.data;

        const isExistProduct = products.find(elem => elem.id === product.id);

        if (isExistProduct) {
            const updateData = products.map(item => {
                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            localStorage.setItem('carts', JSON.stringify(updateData));
        } else {
            const data = [...products, { ...product, quantity: 1 }];
            localStorage.setItem('carts', JSON.stringify(data));
        }
    };
    return (
        <div className='p-4 '>
            <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                <img
                    className='lg:h-[300px] md:h-36 w-full '
                    src={props.image}
                    alt='blog'
                />
                <div className='p-6'>
                    <h2 className='tracking-widest capitalize text-xs title-font font-medium text-gray-400 mb-1'>
                        {props.category}
                    </h2>
                    <h1 className='title-font text-lg line-clamp-1 font-medium text-gray-900 mb-3'>
                        {props.title}
                    </h1>
                    <p className='leading-relaxed line-clamp-4 mb-3'>
                        {props.description}
                    </p>
                    <div className='flex items-center justify-between  '>
                        <div className='flex'>
                            <span className='text-gray-400 mr-3 flex items-center text-sm pr-3 py-1 border-r-2 border-gray-200'>
                                <span>
                                    <IoEyeOutline />
                                </span>
                                {props.rating.count}
                            </span>
                            <span className='text-gray-400 inline-flex items-center leading-none text-sm'>
                                <FaRegStar />
                                {props.rating.rate}
                            </span>
                        </div>
                        <div className='font-bold'>${props.price}</div>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <Button
                            title={<HiOutlineShoppingBag />}
                            width={'30px'}
                            height={30}
                            borderRadius={6}
                            bgColor='#4BB543'
                            color='white'
                            fontSize={22}
                            onClick={() => handleClick(props.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
