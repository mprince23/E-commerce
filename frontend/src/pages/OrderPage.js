// import React, { useEffect, useState } from 'react'
// import Api from '../Common'
// import moment from 'moment'
// import displayINRCurrency from '../helper/displayCurrency'

// const OrderPage = () => {

//   const [data, setData] = useState([])

//   async function fetchOrderDetails() {
//     const response = await fetch(Api.getOrder.url, {
//       method: Api.getOrder.method,
//       credentials: 'include'
//     })

//     const ResponseData = await response.json()

//     setData(ResponseData.data)

//     console.log("weqe", ResponseData)

//   }

//   useEffect(() => {
//     fetchOrderDetails()
//   }, [])

//   return (
//     <div>
//       {
//         !data[0] && (
//           <p>No Orede</p>
//         )
//       }

//       <div className='p-4 w-full'>
//         {
//           data.map((item, index) => {
//             return (
//               <div className="" key={item.userId + index}>
//                 <p className='font-semibold text-lg'>{moment(item.createdAt).format('LL')}</p>

//                 <div className="border rounded ">

//                   <div className="flex justify-between flex-col lg:flex-row">
//                     <div className="grid gap-1">
//                       {
//                         item?.productDetails.map((product, index) => {
//                           return (
//                             <div className="flex gap-3 bg-slate-100" key={product.productId + index}>

//                               <div className="bg-slate-200 w-full max-w-32 h-full max-h-32">
//                                 <img src={product.image[0]} alt="" className='w-28 h-28 object-scale-down p-2 mix-blend-multiply' />
//                               </div>

//                               <div>
//                                 <p className='font-medium sm:text-lg text-ellipsis line-clamp-1'>{product.name}</p>

//                                 <div className="flex md:items-center md:gap-5 mt-1 flex-col md:flex-row  items-start">
//                                   <p className='text-lg text-red-500'>{displayINRCurrency(product.price)}</p>

//                                   <p>Quantity : {product.quantity}</p>
//                                 </div>
//                               </div>

//                             </div>
//                           )
//                         })
//                       }
//                     </div>

//                     <div className="flex gap-4 flex-col p-2 min-w-[320px]">
//                       <div className="">
//                         <p className='text-lg font-medium'>Payment Details : </p>
//                         <p className='ml-1'>Payment Method : {item.paymentDetails.payment_method_type[0]}</p>
//                         <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
//                       </div>

//                       <div className="">
//                         {
//                           item.shipping_options.map((shipping, index) => {
//                             return (
//                               <div key={shipping.shipping_rate}>
//                                 <p className='text-lg font-medium'>Shipping Details : </p>
//                                 <p className='ml-1'>Shipping Amount : {displayINRCurrency(shipping.shipping_amount)}</p>
//                               </div>
//                             )
//                           })
//                         }
//                       </div>
//                     </div>
//                   </div>

//                   <div className="ml-auto w-fit">
//                     <p className='font-semibold lg:text-lg'>Total Amount : {displayINRCurrency(item.totalAmount)}</p>
//                   </div>
//                 </div>

//               </div>
//             )
//           })
//         }
//       </div>

//     </div>
//   )
// }

// export default OrderPage











import React, { useEffect, useState } from 'react';
import Api from '../Common';
import moment from 'moment';
import displayINRCurrency from '../helper/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  async function fetchOrderDetails() {
    const response = await fetch(Api.getOrder.url, {
      method: Api.getOrder.method,
      credentials: 'include',
    });

    const ResponseData = await response.json();
    setData(ResponseData.data);
    console.log("Response Data", ResponseData);
  }

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-4">
      {!data[0] && <p>No Order</p>}

      <div className="space-y-4">
        {data.map((item, index) => (
          <div>
            <p className="font-semibold text-lg">{moment(item.createdAt).format('LL')}</p>
            <div className="border rounded p-1 bg-white" key={item.userId + index}>

              <div className="flex flex-col lg:flex-row justify-between">
                <div className="grid gap-3 flex-1">
                  {item.productDetails.map((product, index) => (

                    <div className="flex gap-3 p-2 rounded" key={product.productId + index}>

                      <div className="bg-slate-200 w-24 h-24 flex-shrink-0">
                        <img src={product.image[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>

                      <div className="flex-1">
                        <p className="font-medium sm:text-lg text-ellipsis line-clamp-1">{product.name}</p>
                        <div className="flex md:items-center md:gap-5 mt-1 flex-col md:flex-row items-start">
                          <p className="text-lg text-red-500">{displayINRCurrency(product.price)}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="flex flex-col p-2 min-w-[320px] md:gap-5 gap-3">

                  <div>
                    <p className="text-lg font-medium">Payment Details:</p>
                    <p className="ml-1">Payment Method: {item.paymentDetails.payment_method_type[0]}</p>
                    <p className="ml-1">Payment Status: {item.paymentDetails.payment_status}</p>
                  </div>

                  {item.shipping_options.map((shipping, index) => (

                    <div key={shipping.shipping_rate}>
                      <p className="text-lg font-medium">Shipping Details:</p>
                      <p className="ml-1">Shipping Amount: {displayINRCurrency(shipping.shipping_amount)}</p>
                    </div>

                  ))}

                </div>
              </div>

              <div className="ml-auto w-fit mt-4 px-3">
                <p className="font-semibold lg:text-lg">Total Amount: {displayINRCurrency(item.totalAmount)}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;