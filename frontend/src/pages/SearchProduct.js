import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Api from '../Common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {

    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search);

    async function fetchProductData() {
        setLoading(true)
        const response = await fetch(Api.searchProduct.url + query.search)

        const ResponseData = await response.json()

        setLoading(false)

        setData(ResponseData.data)

        console.log("ResponseData", ResponseData)

    }

    useEffect(() => {
        fetchProductData()
    }, [query])

    return (
        <div className='container mx-auto'>
            {
                loading && (
                    <p className='text-lg text-center'>Loading ...</p>
                )
            }

            <p className='text-lg font-semibold my-3'>Product : {data.length}</p>

            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>Data Not Found ...</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticalCard loading={loading} data={data} />
                )
            }

        </div>
    )
}

export default SearchProduct