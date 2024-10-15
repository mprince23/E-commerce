import React, { useContext, useEffect, useState } from 'react'
import Api from '../Common/index'
import Context from '../context/index'
import displayINRCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.countcartProduct).fill(null)

    async function fetchData() {


        const response = await fetch(Api.addToCartProductViwe.url, {
            method: Api.addToCartProductViwe.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
        })



        const ResponseData = await response.json()

        if (ResponseData.success) {
            setData(ResponseData.data)
        }

    }

    async function handleLoading() {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    async function increaseQty(id, qty) {
        const response = await fetch(Api.updatecartproduct.url, {
            method: Api.updatecartproduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quntity: qty + 1
                }
            )
        })

        const ResponseData = await response.json()

        if (ResponseData.success) {
            fetchData()
        }

    }


    async function decraseQty(id, qty) {
        if (qty >= 2) {
            const response = await fetch(Api.updatecartproduct.url, {
                method: Api.updatecartproduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quntity: qty - 1
                    }
                )
            })

            const ResponseData = await response.json()

            if (ResponseData.success) {
                fetchData()
            }
        }

    }

    async function deleteCartProduct(id) {
        const response = await fetch(Api.deleteCartProduct.url, {
            method: Api.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const ResponseData = await response.json()

        if (ResponseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }



    async function handlePayment() {
        
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

        const response = await fetch(Api.payment.url, {
            method: Api.payment.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ cartItems: data })
        })


        const ResponseData = await response.json()

        if (ResponseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: ResponseData.id })
        }

        console.log("payment", ResponseData)

    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quntity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quntity * curr?.productId?.sellingPrice), 0)


    return (
        <div className='px-5 lg:px-16 mx-auto'>
            <div className="text-center text-lg my-3">
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 justify-between'>

                {/* view product */}

                <div className='w-full max-w-4xl'>
                    {
                        loading ? (
                            loadingCart.map((item, index) => {
                                return (
                                    <div key={item + 'Add To Cart' + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((item, index) => {
                                return (
                                    <div key={item?._id + 'Add To Cart'} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className="w-32 h-32 bg-slate-200">
                                            <img src={item?.productId?.productImage[0]} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className="px-4 py-2 relative">



                                            {/* delete product */}

                                            <div className='absolute right-0 px-2'>
                                                <button className='text-red-600 rounded-full hover:bg-red-600 hover:text-white p-1' onClick={() => deleteCartProduct(item?._id)}><MdDelete /></button>
                                            </div>

                                            <h2 className='text-lg text-ellipsis line-clamp-1'>{item?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500 text-sm'>{item?.productId?.category}</p>
                                            <div className="flex items-center justify-between">
                                                <p className='font-medium text-md'>{displayINRCurrency(item?.productId?.sellingPrice)}</p>
                                                <p className='font-semibold text-slate-600 text-md'>{displayINRCurrency(item?.productId?.sellingPrice * item?.quntity)}</p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={() => increaseQty(item?._id, item?.quntity)}>+</button>
                                                <span>{item?.quntity}</span>
                                                <button className='border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={() => decraseQty(item?._id, item?.quntity)}>-</button>
                                            </div>
                                        </div>



                                    </div>
                                )
                            })
                        )
                    }
                </div>


                {/* Total product */}

                {
                    data[0] && (
                        <div className="mt-5 lg:mt-0 w-full max-w-md">
                            {
                                loading ? (
                                    <div className="h-36 bg-slate-200 border-slate-300 border animate-pulse"></div>
                                ) : (
                                    <div className="h-36 bg-white">
                                        <h2 className='text-white bg-red-600 px-4 py-1'>Total</h2>
                                        <div className='flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600'>
                                            <p>Quantity</p>
                                            <p>{totalQty}</p>
                                        </div>

                                        <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                                            <p>Total Price</p>
                                            <p>{displayINRCurrency(totalPrice)}</p>
                                        </div>

                                        <button className='bg-blue-600 p-2 text-white w-full mt-4' onClick={handlePayment}>Payment</button>

                                    </div>
                                )
                            }
                        </div>
                    )
                }



            </div>
        </div>
    )
}

export default Cart