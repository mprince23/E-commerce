import React, { useContext } from 'react'
import displayINRCurrency from '../helper/displayCurrency'
import { Link } from 'react-router-dom'
import Context from '../context'
import addToCart from '../helper/addToCart'

const VerticalCard = ({ loading, data = [] }) => {

    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    async function handleAddToCart(e, id) {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


    return (
        <div>
            <div className="md:gap-6 overflow-x-scroll scrollbar-hide transition-all grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center">
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        </div>
                                        <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((item, index) => {
                            return (
                                <Link to={"/product/" + item?._id} className="w-full min-w[280px] md:min-w-[320px] max-w[280px] md:max-w-[320px] bg-white rounded-sm shadow my-2 lg:my-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                        <img src={item.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{item?.productName}</h2>

                                        <p className='capitalize text-slate-500 '>{item?.category}</p>

                                        <div className='flex gap-3'>
                                            <p className='font-medium'>{displayINRCurrency(item.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(item.price)}</p>
                                        </div>

                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, item._id)}>Add To Cart</button>

                                    </div>
                                </Link>
                            )
                        })

                    )
                }
            </div>
        </div>
    )
}

export default VerticalCard