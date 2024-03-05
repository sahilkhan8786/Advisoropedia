/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { UserContext } from '../context/UserContext';


const CartHandler = ({ el }) => {
    const { cart, setCart } = useContext(UserContext)
    const cartHandler = (el) => {

        const isItemInCart = cart.some(item => item._id === el?._id);


        if (!isItemInCart) {
            setCart(prev => [...prev, el]);
        } else {
            alert("Item already exists in the cart!");
        }
    };

    return (
        <button className='block text-center mx-auto bg-green-700 text-white px-4 py-2 cursor-pointer mt-4 w-1/2'
            onClick={() => cartHandler(el)}
        >Add to cart</button>
    )
}

export default CartHandler