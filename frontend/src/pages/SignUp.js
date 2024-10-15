import React, { useState } from 'react'
import logo from '../assest/signin.gif'
import { FaEye } from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/imageTobase64';
import Api from '../Common';
import { toast } from 'react-toastify'

const SignUp = () => {

  const [showpassword, setShowpassword] = useState(false)
  const [showconfirmpassword, setShowconfirmpassword] = useState(false)

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    profilepic: '',
  })

  const navigate = useNavigate()

  function handleOnChange(e) {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  async function handleUploadPic(e) {
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)

    setData((preve) => {
      return {
        ...preve,
        profilepic: imagePic
      }
    })

  }


  async function handleSubmit(e) {
    e.preventDefault()

    if (data.password === data.confirmpassword) {

      const dataResponse = await fetch(Api.signUp.url, {
        method: Api.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }

      if (dataApi.error) {
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Please Check Password and Confirm Password");

    }

  }

  return (
    <>
      <section id='signup'>
        <div className="mx-auto container p-4">

          <div className="bg-white p-5 w-full max-w-sm mx-auto customShadow">
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div className="">
                <img src={data.profilepic || logo} alt="logo icon" />
              </div>
              <form>
                <label>
                  <div className="text-xs bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full bg-opacity-80">
                    Upload Photo
                  </div>
                  <input type="file" className='hidden' onChange={handleUploadPic} />
                </label>
              </form>
            </div>

            <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>

              <div className="">
                <label htmlFor="">Name : </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    placeholder='Enter Name'
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div className="">
                <label htmlFor="">Email : </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder='Enter Email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                </div>
              </div>

              <div className="">
                <label htmlFor="">Password : </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showpassword ? "text" : "password"}
                    placeholder='Enter Password'
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                  <div className="cursor-pointer text-xl" onClick={() => setShowpassword((preve) => !preve)}>
                    <span>
                      {
                        showpassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )
                      }

                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <label htmlFor="">Confirm Password : </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showconfirmpassword ? "text" : "password"}
                    placeholder='Enter Password'
                    name='confirmpassword'
                    value={data.confirmpassword}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent' />
                  <div className="cursor-pointer text-xl" onClick={() => setShowconfirmpassword((preve) => !preve)}>
                    <span>
                      {
                        showconfirmpassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )
                      }

                    </span>
                  </div>
                </div>
              </div>

              <button onClick={handleSubmit} className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto block mt-6 hover:scale-110 transition-all hover:bg-red-700'>Sign Up</button>
            </form>

            <p className='my-5'>Already have account ? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

          </div>

        </div>
      </section>
    </>
  )
}

export default SignUp