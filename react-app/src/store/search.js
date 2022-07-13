import rfdc from "rfdc";
const clone = rfdc()

const LOAD_SEARCH = "api/search/LOAD_SEARCH"
const CLEAR_SEARCH = "api/seach/CLEAR_SEARCH"

const loadSearch = (products) => {
    return {
        type:LOAD_SEARCH,
        products
    }
}

const clearSearch = () => {
    return {
        type:CLEAR_SEARCH,

    }
}

export const searchProduct = (searchTerm) => async (dispatch) => {

    const response = await fetch(`/api/products/search/${searchTerm}`);
    if(response.ok) {
        const products = await response.json()
        dispatch(loadSearch(products))
    }
}

export const clearProductSearch = () => async (dispatch) => {
    console.log("in a thunk")
    dispatch(clearSearch())
}

const initialState = {}

const searchReducer = (state = initialState, action) => {
    const newState = clone(state);
    switch (action.type){
        case LOAD_SEARCH:
            const newObj = {}
            const searchResults = action.products
            searchResults.products.forEach((product)=>{
                newObj[product.id] = product
            })
            newState.search = newObj
            return newState
        case CLEAR_SEARCH:
            const emptyObj = {}
            newState.search = emptyObj
            return newState
        default:
            return newState
    }
}

export default searchReducer;
