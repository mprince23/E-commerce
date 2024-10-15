import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from './Common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserDetails } from './Store/UserSlice';

const App = () => {

  const dispatch = useDispatch()

  const [countcartProduct, setCountcartProduct] = useState(0)

  async function fetchUserDetails() {
    const dataResponse = await fetch(Api.current_user.url, {
      method: Api.current_user.method,
      credentials: "include",
    })

    const dataApi = await dataResponse.json()

    if (dataApi.success) {
      dispatch(setuserDetails(dataApi.data))
    }
  }

  async function fetchUserAddToCart() {
    const response = await fetch(Api.countAddToCartProduct.url, {
      method: Api.countAddToCartProduct.method,
      credentials: "include"
    })

    const dataApi = await response.json()

    // console.log("dataApi", dataApi)

    setCountcartProduct(dataApi?.data?.count)

  }

  useEffect(() => {

    // ------- userDetails -------
    fetchUserDetails()

    // ---- addtocart ------
    fetchUserAddToCart()

  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // fetch user data

        //product add to cart
        countcartProduct,
        fetchUserAddToCart,
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-60px)] pt-20'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App