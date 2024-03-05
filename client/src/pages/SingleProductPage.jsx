import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import CartHandler from "../components/CartHandler";
import { IoArrowBack } from "react-icons/io5";

const SingleProductPage = () => {
    const [data, setData] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const currentURL = window.location.href;
    const id = currentURL.split('/').pop();

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`products/${id}`);
            setMainImage(data.message[0].thumbnail);
            setData(data.message[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-[1440px] mt-5 mx-auto p-4 flex bg-white flex-col ">
            <Link to='/' className="flex border w-fit px-4 py-2 cursor-pointer items-center hover:bg-gray-300 gap-2">
                <IoArrowBack className="text-2xl" /> Go back
            </Link>
            <div className="flex mt-5">
                <div className="p-4 flex flex-col">
                    <div className="flex mb-4 overflow-hidden h-96">
                        <img src={mainImage} alt="" className="object-cover w-full " />
                    </div>
                    <div className="grid grid-cols-5  gap-1 h-32 overflow-hidden">
                        {data.images.map((el) => (
                            <img src={el} alt="" className="cursor-pointer" key={el} onClick={() => { setMainImage(el) }} />
                        ))}
                    </div>
                </div>
                <article className="w-3/4 p-4 text-center flex flex-col items-center justify-center gap-4">
                    <div className="text-4xl font-bold">Name - {data.title}</div>
                    <div>{data.description}</div>
                    <div>Price - ${data.price}</div>
                    <div>Rating - ${data.rating}</div>
                    <div>Discount - {data.discountPercentage}%</div>
                    <div>Stocks available - {data.stock}</div>
                    <div>Brand - {data.brand}</div>
                    <CartHandler el={data} />
                </article>
            </div>
        </div>
    );
};

export default SingleProductPage;
