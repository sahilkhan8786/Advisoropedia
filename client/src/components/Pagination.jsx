import { useContext } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios'
export default function Pagination() {

    const { setData, currentPage, setCurrentPage, totalPages } = useContext(UserContext);
    const pageSize = 5;


    const fetchData = async () => {
        const { data } = await axios.get(`/products?page=${currentPage}&pageSize=${pageSize}`)

        console.log(data);
        setData(data.products)
    }





    // Event handler for previous button click
    const handlePrevClick = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            await fetchData();

        }
    };

    // Event handler for next button click
    const handleNextClick = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            await fetchData();

        }
    };
    return (
        <div className='flex text-center  items-center justify-center flex-col'>
            <div>

                <button onClick={handlePrevClick} disabled={currentPage === 1}>Previous &nbsp;</button>
                {currentPage}
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>&nbsp; Next </button>

            </div>
            {currentPage}/{totalPages}
        </div>
    );
}
