import { useContext, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { UserContext } from '../context/UserContext'

const Filter = () => {
    const { data, setData } = useContext(UserContext);
    const [showFilter, setShowFilter] = useState(false)
    const [minValue, setMinValue] = useState(400)
    const [maxValue, setMaxValue] = useState(5000)

    if (!data) return

    const fetchData = () => {
        const priceFilter = data.filter(product => product.price >= minValue && product.price <= maxValue);
        setData(priceFilter)

    }



    return (
        <div className='w-fit p-4 m-4 max-[425px]:p-1 max-[425px]:m-1'>
            {
                showFilter ?
                    (<div className='rounded-lg flex gap-3 m-4 p-4 bg-white w-fit items-center max-[425px]:p-1 max-[425px]:m-1'>
                        <div className='flex flex-col '>

                            <label htmlFor='minValue' className='text-xs text-gray-500'>
                                min Value
                            </label>
                            <input type="text" placeholder='min price' className='input'
                                value={minValue}
                                id='minValue'
                                onChange={e => setMinValue(e.target.value)}
                            />
                        </div>
                        <div className=''>

                            <label htmlFor='maxValue' className='text-xs text-gray-500'>
                                max value
                            </label>
                            <input type="text" placeholder='max price' className='input'
                                value={maxValue}
                                id='maxValue'
                                onChange={e => setMaxValue(e.target.value)}
                            />
                        </div>

                        <button onClick={fetchData} className='cursor-pointer'>
                            <FaSearch />
                        </button>
                        <button onClick={() => setShowFilter(false)} className='cursor-pointer'>
                            Cancel
                        </button>
                    </div>)
                    : (<div className='input cursor-pointer' onClick={(() => setShowFilter(true))}>Filter</div>)}
        </div>
    )
}

export default Filter