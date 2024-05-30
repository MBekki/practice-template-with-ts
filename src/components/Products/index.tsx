import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductType } from '../../interfaces';
import ProductCard from '../ProductCard';

const Products = () => {
    const [data, setData] = useState<ProductType[]>();

    async function fetchData() {
        await axios
            .get('https://fakestoreapi.com/products')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <p className='text-3xl font-semibold'>Products</p>
            <div className='mt-5 grid  md:grid-cols-3 xl:grid-cols-4'>
                {data?.map(item => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        category={item.category}
                        description={item.description}
                        image={item.image}
                        rating={item.rating}
                        quantity={item.quantity}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};
export default Products;
