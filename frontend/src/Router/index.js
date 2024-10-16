import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/All-Products'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentCancel from '../pages/PaymentCancel'
import OrderPage from '../pages/OrderPage'
import AllOrder from '../pages/AllOrder'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'product-category',
                element: <CategoryProduct />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: 'success',
                element: <PaymentSuccess />
            },
            {
                path: 'cancel',
                element: <PaymentCancel />
            },
            {
                path: 'order',
                element: <OrderPage />
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: 'all-order',
                        element: <AllOrder />
                    },
                ]
            },
        ]
    }
])


export default router