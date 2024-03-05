import { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const UserContext = createContext({})
// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [searchURL, setSearchURL] = useState('')
    const [cart, setCart] = useState([])
    const [data, setData] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 5;


    const fetchData = async () => {
        const { data } = await axios.get(`/products?page=${currentPage}&pageSize=${pageSize}`)
        setData(data.products)
        setTotalPages(data.totalPages);
        console.log(data);
    }

    const fetchUser = async () => {
        const { data } = await axios.get('/auth/profile')
        setUser(data)
    }

    useEffect(() => {
        fetchData()
        fetchUser()
    }, [searchURL])



    return (
        <UserContext.Provider value={{ data, setData, user, setUser, searchURL, setSearchURL, cart, setCart, setCurrentPage, currentPage, totalPages, setTotalPages }}>
            {children}
        </UserContext.Provider>
    )
}