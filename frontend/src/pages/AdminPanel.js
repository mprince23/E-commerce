import React, { useEffect } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../Common/Role';


const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [])

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 shadow-xl'>
                <div className='h-32 flex justify-center items-center flex-col mt-8'>
                    <div className='text-4xl cursor-pointer relative flex justify-center'>
                        {
                            user?.profilepic ? (
                                <img src={user.profilepic} alt={user.name} className='w-20 h-20 rounded-full' />
                            ) : (
                                <FaRegCircleUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/* -------------------- navigation ---------------- */}

                <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All Product</Link>
                        <Link to={'all-order'} className='px-2 py-1 hover:bg-slate-100'>All Order</Link>
                    </nav>
                </div>

            </aside>

            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel