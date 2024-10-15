import React, { useContext, useState } from 'react';
import Logo from '../assest/logo@2x.png';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Api from '../Common';
import { toast } from 'react-toastify'
import { setuserDetails } from '../Store/UserSlice';
import ROLE from '../Common/Role';
import Context from '../context/index'

const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const searchInput = useLocation()
    const URLsearch = new URLSearchParams(searchInput?.search)
    const searchQuery = URLsearch.getAll("q")
    const [search, setSearch] = useState(searchQuery)

    const navigate = useNavigate()

    // console.log("searchInput", searchInput?.search.split("=")[1])

    const context = useContext(Context)

    async function handleLogout() {
        const fetchData = await fetch(Api.logout_user.url, {
            method: Api.logout_user.method,
            credentials: 'include',
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setuserDetails(null))
            navigate("/")
        }

        if (data.error) {
            toast.error(data.message)
        }

    }

    function handleSearch(e) {
        const { value } = e.target
        setSearch(value)
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate('/search')
        }

    }

    return (
        <>
            <header className="h-16 shadow-md bg-white fixed w-full z-50">
                <div className="h-full flex items-center justify-between container mx-auto">
                    <div>
                        <Link to={'/'}>
                            <img src={Logo} alt="" className='w-28' />
                        </Link>
                    </div>

                    <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                        <input type="text" placeholder='Search Product Here...' className='w-full outline-none' onChange={handleSearch} value={search} />
                        <div className='text-lg min-w-[50px] h-8 bg-red-600 items-center justify-center flex rounded-r-full text-white'>
                            <GrSearch />
                        </div>
                    </div>

                    <div className='flex items-center gap-7'>

                        <div className='relative flex justify-center'>
                            {
                                user?._id && (
                                    <div className='text-2xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                                        {
                                            user?.profilepic ? (
                                                <img src={user.profilepic} alt={user.name} className='w-8 h-8 rounded-full' />
                                            ) : (
                                                <FaRegCircleUser />
                                            )
                                        }
                                    </div>
                                )
                            }


                            {
                                menuDisplay && (
                                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                                        <nav>
                                            {
                                                user?.role === ROLE.ADMIN && (
                                                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                                                )
                                            }
                                            <Link to={'/order'} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Order</Link>
                                        </nav>
                                    </div>
                                )
                            }

                        </div>


                        {
                            user?._id && (
                                <Link to={'/cart'} className='text-2xl cursor-pointer relative'>
                                    <span><FaShoppingCart /></span>

                                    <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                                        <p className='text-sm'>{context?.countcartProduct}</p>
                                    </div>
                                </Link>
                            )
                        }

                        <div>
                            {
                                user?._id ? (
                                    <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Logout</button>
                                ) : (
                                    <Link to={'/login'} className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>Login</Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;