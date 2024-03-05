import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"
import { Navigate } from 'react-router-dom'
const Cart = () => {
    const { setCart, cart, user } = useContext(UserContext)
    const [isSuccess, setIsSuccess] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const deleteHandler = (id) => {
        const isItemInCart = cart.some(item => item._id === id);

        if (isItemInCart) {
            const updatedCart = cart.filter(item => item._id !== id);
            setCart(updatedCart);

        }
    }

    const totalPrice = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
    }, 0);
    if (!user) {
        return (
            <div>
                <span>You are not authorized to access this page . To access login first</span>
                <span>Go to login page:-
                    <Link to={'/login'} className="underline font-bold">click here</Link>

                </span>
            </div>)
    }
    if (!cart) {
        return <div>Loading...</div>
    }

    if (redirect) {
        return <Navigate to='/' />
    }
    return (
        <div className="m-4 p-4 max-w-[1440px] mx-auto">
            <div className="bg-white p-4">

                <div>
                    <Link to='/' className="flex border w-fit px-4 py-2 cursor-pointer items-center hover:bg-gray-300 gap-2">
                        <IoArrowBack className="text-2xl" /> Go back
                    </Link>
                </div>


                <div className="py-4">Total Order:- {cart.length}</div>
                <h1 className="text-4xl font-bold py-3">Cart Items</h1>
                <div className="flex flex-col w-full gap-2">
                    {cart.map(el => (
                        <div key={el.id} className="border p-2 rounded-lg flex justify-between items-center">
                            <div className="rounded-lg overflow-hidden w-fit ">
                                <img src={el.thumbnail} alt="" width={150} />
                            </div>
                            <div className="flex flex-col text-center">
                                <span>
                                    {el.title}
                                </span>
                                <span>${el.price}</span>
                                <span>stock available - {el.stock}</span>
                            </div>
                            <div className="flex gap-3">
                                <Link to={`/products/${el._id}`} className="border px-2 py-1 hover:bg-gray-500 cursor-pointer">
                                    View
                                </Link>
                                <button className="border px-2 py-1 hover:bg-gray-500 cursor-pointer" onClick={() => deleteHandler(el._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4 border-t pt-8">
                    <h1 className="py-4">Total Order:- {cart.length}</h1>
                    <h1 className="py-4">Total Amount:- ${totalPrice}</h1>

                    {isSuccess && <span className="text-blue-500">Order placed</span>}
                </div>

                <div className="flex items-center justify-center my-4" >
                    <span className="text-center border px-4 py-2 text-xl border-blue-600 bg-blue-500 text-white cursor-pointer hover:bg-blue-400" onClick={() => {
                        setIsSuccess(true)
                        setTimeout(() => {
                            setCart([])
                            setRedirect(true)
                        }, 2000)
                    }}>
                        Place order
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Cart