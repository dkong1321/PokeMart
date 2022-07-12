import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getCategory } from "../store/product";

const TestProducts = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)

    // refactor maybe
    const products =Object.values(useSelector((state)=> state.products))
    const user =useSelector((state)=> state.session.user)

    useEffect(()=>{

        dispatch(getCategory(2)).then(()=>setIsLoaded(true))
    }, [dispatch]);

    return(
        isLoaded && (
            <div>
                <div>Hello my products will go here</div>
            </div>
        )
    )
}

export default TestProducts
