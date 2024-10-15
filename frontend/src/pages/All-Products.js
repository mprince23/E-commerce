import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import Api from '../Common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [allProduct, setAllProduct] = useState([])

    async function fetchAllProdduct() {
        const response = await fetch(Api.allProduct.url)

        const dataResponse = await response.json()

        setAllProduct(dataResponse?.data || [])

    }

    useEffect(() => {
        fetchAllProdduct()
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <div className="bg-white py-2 px-4 flex justify-between items-center">
                <h2 className='text-lg font-bold'>All Products</h2>
                <button
                    className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
                    onClick={handleOpenDialog}
                >
                    Upload Product
                </button>
            </div>


            {/* ------------ All product --------- */}

            <div className="flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll scrollbar-hide">
                {
                    allProduct.map((item, index) => {
                        return (
                            <AdminProductCard data={item} key={index + "allPooduct"} fetchdata={fetchAllProdduct} />
                        )
                    })
                }
            </div>


            {/* Upload Product modal */}

            {openDialog && (
                <UploadProduct
                    handleClose={handleCloseDialog}
                    fetchData={fetchAllProdduct}
                />
            )}
        </div>
    );
};

export default AllProducts;
