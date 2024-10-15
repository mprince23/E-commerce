import React from 'react'
import { useNavigate } from 'react-router-dom'
import cancel from '../assest/cancel.gif'


const PaymentCancel = () => {

    const navigate = useNavigate()

  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center flex-col items-center p-4 rounded'>
            <img src={cancel} alt="" width={150} height={150} className='mix-blend-multiply' />
            <p className='text-red-500 font-bold text-lg'>Payment Cancel</p>
            <button className='p-2 px-3 rounded mt-5 border-2 border-red-500 font-semibold text-red-500 hover:bg-red-500 hover:text-white' onClick={() => navigate('/cart')}>Go To Cart</button>
        </div>
  )
}

export default PaymentCancel