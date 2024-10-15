import React, { useEffect, useState } from 'react'
import img1 from '../assest/banner/img1.webp'
import img2 from '../assest/banner/img2.webp'
import img3 from '../assest/banner/img3.jpg'
import img4 from '../assest/banner/img4.jpg'
import img5 from '../assest/banner/img5.webp'

import img6 from '../assest/banner/img1_mobile.jpg'
import img7 from '../assest/banner/img2_mobile.webp'
import img8 from '../assest/banner/img3_mobile.jpg'
import img9 from '../assest/banner/img4_mobile.jpg'
import img10 from '../assest/banner/img5_mobile.png'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)

    const desktopImage = [
        img1,
        img2,
        img3,
        img4,
        img5,
    ]

    const mobileImage = [
        img6,
        img7,
        img8,
        img9,
        img10,
    ]

    function nextImage() {
        if (desktopImage.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    function preveImage() {
        if (currentImage != 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImage.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className="container mx-auto rounded">
            <div className='h-52 md:h-96 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className="flex justify-between w-full text-2xl">
                        <button className='bg-white shadow-md rounded-full p-1' onClick={preveImage}>
                            <FaAngleLeft />
                        </button>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/**desktop and tablet version */}
                <div className="hidden md:flex w-full h-full overflow-hidden">
                    {
                        desktopImage.map((item, index) => {
                            return (
                                <div className="w-full h-full min-h-full min-w-full transition-all" key={item} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={item} alt="" className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>


                {/**mobile and tablet version */}
                <div className="flex w-full h-full overflow-hidden md:hidden">
                    {
                        mobileImage.map((item, index) => {
                            return (
                                <div className="w-full h-full min-h-full min-w-full transition-all" key={item} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={item} alt="" className='w-full h-full object-fill' />
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default BannerProduct