const domin = process.env.REACT_BACKEND_URL

const Api = {
    signUp: {
        url: `${domin}/api/signup`,
        method: "POST",
    },
    signIn: {
        url: `${domin}/api/signin`,
        method: "POST",
    },
    current_user: {
        url: `${domin}/api/userdetails`,
        method: "GET"
    },
    logout_user: {
        url: `${domin}/api/userlogout`,
        method: "GET"
    },
    allUsers: {
        url: `${domin}/api/all-user`,
        method: "GET"
    },
    updateUser: {
        url: `${domin}/api/update-user`,
        method: "POST"
    },
    uploadProduct: {
        url: `${domin}/api/upload-product`,
        method: "POST"
    },
    allProduct: {
        url: `${domin}/api/get-product`,
        method: "GET"
    },
    editProduct: {
        url: `${domin}/api/edit-product`,
        method: "PUT"
    },
    categoryProduct: {
        url: `${domin}/api/get-categoryProduct`,
        method: "GET"
    },
    categoryWiseProduct: {
        url: `${domin}/api/category-product`,
        method: "POST"
    },
    productDetails: {
        url: `${domin}/api/product-details`,
        method: "POST"
    },
    addToCartProduct: {
        url: `${domin}/api/addtocart`,
        method: "POST"
    },
    countAddToCartProduct: {
        url: `${domin}/api/countAddToCartProduct`,
        method: "GET"
    },
    addToCartProductViwe: {
        url: `${domin}/api/viwe-cart-product`,
        method: "GET"
    },
    updatecartproduct: {
        url: `${domin}/api/update-cart-product`,
        method: "PUT"
    },
    deleteCartProduct: {
        url: `${domin}/api/delete-cart-product`,
        method: "DELETE"
    },
    searchProduct: {
        url: `${domin}/api/search`,
        method: "GET"
    },
    filterproduct: {
        url: `${domin}/api/filter-product`,
        method: "POST"
    },
    payment: {
        url: `${domin}/api/checkout`,
        method: "POST"
    },
    getOrder: {
        url: `${domin}/api/order-list`,
        method: "GET"
    },
    allOrder: {
        url: `${domin}/api/all-order`,
        method: "GET"
    },
}



export default Api