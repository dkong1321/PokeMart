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
        dispatch(loadAllProducts(products))
    }
}

const initialState = {}

const productReducer = (state = initialState, action) => {
    const newState = clone(state);
    switch (action.type){
        case LOAD_ALL_PRODUCTS:
            const newObj = {}
            const products = action.products
            products.forEach((product)=>{
                newObj[product.id] = product
            })
            newState[action.products] = newObj
    }

}

export default productReducer;
