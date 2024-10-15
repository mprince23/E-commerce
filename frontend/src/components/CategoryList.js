import React, { useEffect, useState } from 'react'
import Api from '../Common/index'
import { Link } from 'react-router-dom'

const CategoryList = () => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoding = new Array(13).fill(null)

    async function fetchCategoryProduct() {
        setLoading(true)

        console.log(Api.categoryProduct.url);
        const response = await fetch(Api.categoryProduct.url)
            
        const dataResponse = await response.json()

        setLoading(false)

        setCategoryProduct(dataResponse.data)

    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
            <div className='md:container mx-auto'>
                <div className="scrollbar-hide flex items-center gap-4 justify-between overflow-scroll md:px-0 px-2.5">
                    {
                        loading ? (
                            categoryLoding.map((item, index) => {
                                return (
                                    <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoding" + index}>

                                    </div>
                                )
                            })
                        ) : (
                            categoryProduct.map((item, index) => {
                                return (
                                    <Link to={"/product-category?category="+item?.category} className='cursor-pointer' key={item?.category}>
                                        <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center'>
                                            <img src={item?.productImage[0]} alt={item?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                        </div>
                                        <p className='text-center text-sm md:text-base capitalize'>{item.category}</p>
                                    </Link>
                                )
                            })
                        )
                    }
                </div>
            </div>
    )
}

export default CategoryList