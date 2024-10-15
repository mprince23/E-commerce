import React from 'react'
import success from '../assest/success.gif'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {

    const navigate = useNavigate()

    return (
        <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center flex-col items-center p-4 rounded'>
            <img src={success} alt="" width={150} height={150} />
            <p className='text-green-500 font-bold text-lg'>Payment Successfully</p>
            <button className='p-2 px-3 rounded mt-5 border-2 border-green-500 font-semibold text-green-500 hover:bg-green-500 hover:text-white' onClick={() => navigate('/order')}>See Order</button>
        </div>
    )
}

export default PaymentSuccess