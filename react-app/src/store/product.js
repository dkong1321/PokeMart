import rfdc from "rfdc";
const clone = rfdc()

const LOAD_ALL_PRODUCTS = "api/products/LOAD_ALL_PRODUCTS"
const LOAD_CAT = "api/products/LOAD_CAT"
const ADD_PRODUCT = "api/products/ADD_PRODUCT"
const EDIT_PRODUCT = "api/products/EDIT_PRODUCT"
const REMOVE_PRODUCT = "api/products/REMOVE_PRODUCT"

const loadAllProducts = (products) => {
    return {
        type: LOAD_ALL_PRODUCTS,
        products
    }
}

const loadCategory = (products) => {
    return {
        type: LOAD_CAT,
        products
    }
}


const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}

const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}

const removeProduct = (product) => {
    return {
        type: REMOVE_PRODUCT,
        product
    }
}

export const getAllProducts = () => async (dispatch) => {
    const response = await fetch("/api/products/");
    if(response.ok) {
        const products = await response.json()
        dispatch(loadAllProducts(products))
    }
}

export const getCategory = (id) => async (dispatch) => {
    console.log(id, "we are in thunk")
    const response = await fetch(`/api/products/category/${id}`);
    if(response.ok) {
        const products = await response.json()
        dispatch(loadCategory(products))
    }
}

// export const searchProduct = (searchTerm) => async (dispatch) => {
//     console.log(searchTerm)
//     const response = await fetch(`/api/products/search/${searchTerm}`);
//     if(response.ok) {
//         const products = await response.json()
//         console.log(products)
//     }
// }


export const createProduct = (data) => async (dispatch) => {

    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("product_name", data.productName);
    formData.append("price", data.price);
    formData.append("user_id", data.user_id);
    formData.append("description", data.description);
    formData.append("category", data.category)

    const response = await fetch("/api/products/", {
        method: "POST",
        body: formData,
    })
    if (response.ok) {
        const newProduct = await response.json()
        dispatch(addProduct(newProduct))
    }

}

export const updateProduct = (data) => async (dispatch) => {
    console.log(data)
    const formData = new FormData()
    formData.append("image", data.image);
    formData.append("product_name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("user_id", data.user_id )
    formData.append("category", data.category)

    const response = await fetch(`/api/products/${data.product_id}`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const editedProduct = await response.json()
        console.log(editProduct)
        dispatch(editProduct(editedProduct))
    }
}

export const deleteProduct = (data) => async (dispatch) => {
    const response = await fetch(`/api/products/${data}`, {
        method: "DELETE",
    })

    if(response.ok) {
        const product = await response.json()
        dispatch(removeProduct(product))
    }

}
const initialState = {}

const productReducer = (state = initialState, action) => {
    const newState = clone(state);
    switch (action.type){
        case LOAD_ALL_PRODUCTS:
            const newObj = {}
            const products = action.products
            products.products.forEach((product)=>{
                newObj[product.id] = product
            })
            newState.products = newObj
            return newState
        case LOAD_CAT:
            const catObj = {}
            console.log("hello Im here")
            const catProducts = action.products
            catProducts.products.forEach((product)=>{
                catObj[product.id] = product
            })
            newState.products = catObj
            console.log(newState)
            return newState
        case ADD_PRODUCT:
            const product = action.product
            newState.products[product.id] = product
            return newState
        case EDIT_PRODUCT:
            const editedProduct = action.product
            newState.products[editedProduct.id] = editedProduct
            return newState
        case REMOVE_PRODUCT:
            const deletedProduct = action.product
            delete newState.products[deletedProduct.id]
            return newState
        default:
            return newState
    }
}

export default productReducer;
