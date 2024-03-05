
import { Suspense, useContext } from 'react'
import Header from './Header'
import { UserContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import CartHandler from './CartHandler'
import Filter from './Filter'
import Pagination from './Pagination'

const Products = () => {

    const { data } = useContext(UserContext);

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Header />
            <div className='max-w-[1440px] mx-auto p-4 max-[425px]:p-1 max-[425px]:m-1'>
                <Filter />


                <h1 className=' m-4 p-4 text-2xl max-[425px]:p-1 max-[425px]:m-1'>All Products</h1>
                <div className='grid grid-cols-4 p-4 m-4 gap-4  max-[1200px]:grid-cols-3 max-[800px]:grid-cols-2 max-[600px]:flex  max-[600px]:flex-col max-[600px]:items-center max-[425px]:p-1 max-[425px]:m-1'>



                    {data.length > 0 ? data.map(el => (

                        <div key={el._id} className='max-w-sm border  shadow-xl p-4 bg-white relative'>
                            <div className=' '>

                                <Suspense fallback={<div>Loading...</div>}>
                                    <div className='overflow-hidden w-fit h-64 flex items-center justify-center'>
                                        <img src={el.thumbnail} alt="" className='object-cover' />
                                    </div>
                                </Suspense>

                                <div className='mt-4 flex flex-col text-center gap-2'>

                                    <span>
                                        {el.title}
                                    </span>
                                    <span>
                                        {el.description.split(' ').slice(0, 4).join(' ')}...
                                    </span>
                                    <span>
                                        ${el.price}
                                    </span>
                                    <span>
                                        Ratings-{el.rating}
                                    </span>
                                </div>
                            </div>
                            <Link to={`/products/${el._id}`} className='block text-center mx-auto bg-green-700 text-white px-4 py-2 cursor-pointer mt-4 w-1/2'>View</Link>
                            <CartHandler el={el} />
                        </div>
                    )
                    ) : 'No product available search anything else.'}

                </div>
            </div >
            <Pagination />
        </>
    )
}

export default Products