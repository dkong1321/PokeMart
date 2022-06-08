import rfdc from "rfdc";
const clone = rfdc()

const LOAD_ALL_PRODUCTS = "api/servers/LOAD_ALL_PRODUCTS"

const loadAllProducts = (products) => {
    return {
        type: LOAD_ALL_PRODUCTS,
        products
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

export const addProduct = (data) => async (dispatch) => {
    console.log(data)
    const formData = new FormData();

    formData.append("image", data.image);
    formData.append("product_name", data.productName);
    formData.append("price", data.price);
    formData.append("user_id", data.user_id);
    formData.append("description", data.description);
    console.log(formData)
    const response = await fetch("/api/products/",{
        method: "POST",
        body: formData,
    })
    if (response.ok) {
        const newProduct = await response.json()
        console.log(newProduct)
    }

}
const initialState = {}

const productReducer = (state = initialState, action) => {
    const newState = clone(state);
    switch (action.type){
        case LOAD_ALL_PRODUCTS:
            const newObj = {}
            const products = action.products
            console.log(products)
            console.log(newState)
            products.products.forEach((product)=>{
                newObj[product.id] = product
            })
            console.log(newObj)
            newState.products = newObj
            return newState
        default:
            return newState
    }


}

export default productReducer;
