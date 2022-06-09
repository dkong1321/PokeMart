import rfdc from "rfdc";
const clone = rfdc()

const LOAD_ALL_PRODUCTS = "api/products/LOAD_ALL_PRODUCTS"
const ADD_PRODUCT = "api/products/ADD_PRODUCT"
const EDIT_PRODUCT = "api/products/EDIT_PRODUCT"
const REMOVE_PRODUCT = "api/products/REMOVE_PRODUCT"

const loadAllProducts = (products) => {
    return {
        type: LOAD_ALL_PRODUCTS,
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
    //  ask vern why I need this "/"
    const response = await fetch("/api/products/");
    if(response.ok) {
        const products = await response.json()
        console.log(products)
        dispatch(loadAllProducts(products))
    }
    // console.log(response)
}

export const createProduct = (data) => async (dispatch) => {
    console.log(data)
    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("product_name", data.productName);
    formData.append("price", data.price);
    formData.append("user_id", data.user_id);
    formData.append("description", data.description);
    console.log(formData)
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
    formData.append("product_name", data.editName);
    formData.append("price", data.editPrice);
    formData.append("description", data.editDescription);

    const response = await fetch(`/api/products/${data.product_id}`, {
        method: "PUT",
        body: formData
    })

    if (response.ok) {
        const editedProduct = await response.json()
        dispatch(editProduct(editedProduct))
        console.log(editedProduct)
    }
}

export const deleteProduct = (data) => async (dispatch) => {
    const response = await fetch(`/api/products/${data}`, {
        method: "DELETE",
    })

    if(response.ok) {
        const product = await response.json()
        console.log(product)
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
