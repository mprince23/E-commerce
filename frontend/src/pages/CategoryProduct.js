import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ProductCategory from '../helper/ProductCategory'
import CategroyWiseProductDisplay from '../components/CategroyWiseProductDisplay'
import VerticalCard from '../components/VerticalCard'
import Api from '../Common'
import { Button, Drawer } from '@mui/material'
import { IoMdClose } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

const CategoryProduct = () => {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListArray.forEach(item => {
        urlCategoryListObject[item] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")



    async function fetchData() {
        const response = await fetch(Api.filterproduct.url, {
            method: Api.filterproduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })

        const ResponseData = await response.json()

        setData(ResponseData?.data || [])

    }

    async function handleSelectCategory(e) {
        const { name, value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(item => {
            if (selectCategory[item]) {
                return item
            }
            return null
        }).filter(item => item)

        setFilterCategoryList(arrayOfCategory)

        //format for url change when change on the checkbox

        const urlFormat = arrayOfCategory.map((item, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${item}`
            }
            return `category=${item}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))

    }, [selectCategory])


    function handleOnChangeSortBy(e) {
        const { value } = e.target

        setSortBy(value)

        if (value === 'asc') {
            setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }

        if (value === 'dsc') {
            setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }

    }

    useEffect(() => {

    }, [sortBy])


    return (
        <div className=''>

            {/* desktop version */}

            <div className="grid lg:grid-cols-[200px,1fr] lg:gap-12">
                {/* left side */}

                <div className="hidden lg:block bg-white px-4 py-3 min-h-[calc(100vh-120px)] w-64 overflow-y-scroll scrollbar-hide shadow-xl">

                    {/* sort by */}

                    <div>
                        <h3 className="text-base uppercase font-medium  text-slate-500 border-b pb-2 border-slate-300">Sort by</h3>

                        <form action="" className='text-sm flex flex-col gap-2 py-3'>

                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' value={"asc"} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} />
                                <label htmlFor="">Price - Low To High</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <input type="radio" name='sortBy' value={"dsc"} checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} />
                                <label htmlFor="">Price - High To Low</label>
                            </div>
                        </form>

                    </div>

                    {/* filter by */}

                    <div className='py-4'>
                        <h3 className="text-base uppercase font-medium  text-slate-500 border-b pb-2 border-slate-300">Category</h3>

                        <form action="" className='text-sm flex flex-col gap-2 py-3'>

                            {
                                ProductCategory.map((item, index) => {
                                    return (
                                        <div className="flex items-center gap-3">
                                            <input type="checkbox" name={"category"} value={item?.value} checked={selectCategory[item?.value]} id={item?.value} onChange={handleSelectCategory} />
                                            <label htmlFor={item?.value}>{item?.label}</label>
                                        </div>
                                    )
                                })
                            }

                        </form>

                    </div>


                </div>


                <div className='lg:hidden block'>
                    <Button onClick={toggleDrawer(true)} sx={{ color: "black", gap: '8px', display: "flex", justifyContent: "end", width: "95%" }}><IoFilter /> Filter</Button>
                    <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>

                        <div className="px-3">
                            {/* sort by */}

                            <div>

                                <div className="border-b py-2 border-slate-300 flex justify-between items-center">
                                    <h3 className="text-base uppercase font-medium  text-slate-500">Sort by</h3>

                                    {/* Close Button */}
                                    <div className="">
                                        <Button onClick={toggleDrawer(false)}>
                                            <IoMdClose className='text-xl text-black' />
                                        </Button>
                                    </div>

                                </div>

                                <form action="" className='text-sm flex flex-col gap-2 py-3'>

                                    <div className='flex items-center gap-3'>
                                        <input type="radio" name='sortBy' value={"asc"} checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} />
                                        <label htmlFor="">Price - Low To High</label>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <input type="radio" name='sortBy' value={"dsc"} checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} />
                                        <label htmlFor="">Price - High To Low</label>
                                    </div>
                                </form>

                            </div>

                            {/* filter by */}

                            <div className='py-4'>
                                <h3 className="text-base uppercase font-medium  text-slate-500 border-b pb-2 border-slate-300">Category</h3>

                                <form action="" className='text-sm flex flex-col gap-2 py-3'>

                                    {
                                        ProductCategory.map((item, index) => {
                                            return (
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" name={"category"} value={item?.value} checked={selectCategory[item?.value]} id={item?.value} onChange={handleSelectCategory} />
                                                    <label htmlFor={item?.value}>{item?.label}</label>
                                                </div>
                                            )
                                        })
                                    }

                                </form>

                            </div>
                        </div>

                    </Drawer>
                </div>


                {/* Right side */}

                <div className="px-4">
                    <div className="flex my-2 gap-1.5">
                        <p className='font-medium text-slate-800 text-lg'>Result : </p>
                        <p className='text-lg'>{data.length}</p>
                    </div>
                    <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hide">
                        {
                            data.length !== 0 && (
                                <VerticalCard data={data} loading={loading} />
                            )
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CategoryProduct