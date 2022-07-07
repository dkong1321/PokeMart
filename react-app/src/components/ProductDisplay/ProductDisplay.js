import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/product";
import { useParams} from "react-router-dom";
import "./product_display.css"
import SortDropDown from "./SortDropDown";
import AllProductsCard from "./AllProductCard";

const ProductsDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    // const [ productOwner, setProductOwner] = useState([])
    // const [ productQuantity, setProductQuantity] = useState()
    const products =Object.values(useSelector((state)=> state.products))
    // const cart = (useSelector((state)=>state.cart))
    // const user = useSelector((state)=>state.session.user)
    // const productId = useParams().productId
    const [ageSortAsc, setAgeSortAsc] = useState(true)
    // const [ageSortDsc, setAgeSortDsc] = useState(false)
    const [priceSortHighLow, setPriceSortHighLow] = useState(false)
    const [priceSortLowHigh, setPriceSortLowHigh] = useState(false)
    const [ratingSortHighLow, setRatingSortHighLow] = useState(false)
    // const [ratingSortLowHigh, setRatingSortLowHigh] = useState(false)




    useEffect(()=>{
        dispatch(getAllProducts())
        .then(()=>setIsLoaded(true))

    }, [dispatch]);

    const avgRating = (product) => {
        const reviews = Object.values(product.reviews)
        const length = reviews.length
        if(reviews.length===0){
            return 0
        }
        let totalRating = 0
        reviews.forEach((review)=>{
            totalRating+=review.rating
        })
        return Math.round(totalRating/length*2)/2
    }

    // const sortByOld = () => {
    //     setAgeSortAsc(true)
    //     setAgeSortDsc(false)
    //     setPriceSortHighLow(false)
    //     setPriceSortLowHigh(false)
    //     setRatingSortHighLow(false)
    //     setRatingSortLowHigh(false)
    // }

    const sortByRecent = () => {
        setAgeSortAsc(true)
        setPriceSortHighLow(false)
        setPriceSortLowHigh(false)
        setRatingSortHighLow(false)
        // setRatingSortLowHigh(false)

    }

    const sortByPriceHighLow = () => {
        setPriceSortHighLow(true)
        setPriceSortLowHigh(false)
        // setAgeSortDsc(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        // setRatingSortLowHigh(false)

    }

    const sortByPriceLowHigh = () => {
        setPriceSortLowHigh(true)
        setPriceSortHighLow(false)
        // setAgeSortDsc(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        // setRatingSortLowHigh(false)

    }

    const sortByRatingHighLow = () => {
        setRatingSortHighLow(true)
        setPriceSortLowHigh(false)
        setPriceSortHighLow(false)
        // setAgeSortDsc(false)
        setAgeSortAsc(false)
        // setRatingSortLowHigh(false)

    }

    return(
        isLoaded && (

            <div className="products__main__container">
                <div className="products__heading">All Products</div>
                <SortDropDown
                    ageSortAsc={ageSortAsc} setAgeSortAsc={setAgeSortAsc}
                    priceSortHighLow={priceSortHighLow} setPriceSortHighLow={setPriceSortHighLow}
                    priceSortLowHigh={priceSortLowHigh} setPriceSortLowHigh={setPriceSortLowHigh}
                    ratingSortHighLow={ratingSortHighLow} setRatingSortHighLow={setRatingSortHighLow}
                ></SortDropDown>
                {/* <div><input type="radio" value="any" name="price_filter"></input><label>Any Price</label></div>
                <div><input type="radio" value="<25" name="price_filter"></input><label>Under $25</label></div>
                <div><input type="radio" value="25-50" name="price_filter"></input><label>$25 to $50</label></div>
                <div><input type="radio" value="50-100" name="price_filter"></input><label>$50 to $100</label></div>
                <div><input type="radio" value="<100" name="price_filter"></input><label>Over $100</label></div> */}

                <div className="products__display__container">
                    {ageSortAsc ? Object.values(products[0]).reverse().map((product)=>{
                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }): <></>}

                    {priceSortHighLow ? Object.values(products[0]).sort((a,b)=>{return a.price - b.price}).map((product)=>{
                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }): <></>}

                    {priceSortLowHigh ? Object.values(products[0]).sort((a,b)=>{return b.price - a.price}).map((product)=>{
                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }): <></>}

                    {ratingSortHighLow ? Object.values(products[0]).sort((a,b)=>{return avgRating(b) - avgRating(a)}).map((product)=>{
                        return (
                            <div>
                                <AllProductsCard product={product}></AllProductsCard>
                            </div>
                        )
                    }): <></>}

                    {/* {ratingSortLowHigh ? Object.values(products[0]).sort((a,b)=>{return avgRating(b) - avgRating(a)}).map((product)=>{
                        return (
                            <div>
                            {console.log(avgRating(product))}
                            <AllProductsCard product={product}></AllProductsCard>
                            </div>
                        )
                    }): <></>} */}
                </div>
            </div>
        )
    )
}

export default ProductsDisplay
