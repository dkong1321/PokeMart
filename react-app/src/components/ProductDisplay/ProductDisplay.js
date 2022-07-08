import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../store/product";
import { useParams} from "react-router-dom";
import "./product_display.css"
import SortDropDown from "./SortDropDown";
import AllProductsCard from "./AllProductCard";
import FilterDropDown from "./FilterDropDown";

const ProductsDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const products =Object.values(useSelector((state)=> state.products))
    const [ageSortAsc, setAgeSortAsc] = useState(true)
    const [priceSortHighLow, setPriceSortHighLow] = useState(false)
    const [priceSortLowHigh, setPriceSortLowHigh] = useState(false)
    const [ratingSortHighLow, setRatingSortHighLow] = useState(false)
    const [filterUpper, setFilterUpper] = useState(Infinity)
    const [filterLower, setFilterLower] = useState(0)
    const [priceFilter, setPriceFilter] = useState("")
    // cosnt [currentProducts, set]
    // Infinity 0
    // 25 0
    // 100 50
    // 0 100
    // Infinity 100



    useEffect(()=>{
        dispatch(getAllProducts())
        .then(()=>setIsLoaded(true))

    }, [dispatch, priceFilter]);

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

    const updatePriceFilter = (e) => {
        // console.log(e.target.value, "target value")
        setPriceFilter(e.target.value)
        filterPrice(e.target.value)
    }

    const filterPrice = (x) => {

        switch(x){
            case "Any":
                setFilterUpper(Infinity)
                setFilterLower(0)
                return
            case "<25":
                setFilterUpper(25)
                setFilterLower(0)
                return
            case "25-50":
                setFilterUpper(50)
                setFilterLower(25)
                return
            case "50-100":
                setFilterUpper(100)
                setFilterLower(50)
                return
            case ">100":
                setFilterUpper(Infinity)
                setFilterLower(100)
                return
            default:
                setFilterUpper(Infinity)
                setFilterLower(0)
                return

        }
    }

    return(
        isLoaded && (

            <div className="products__main__container">
                <div className="products__heading">All Products</div>
                <div className="sort__filter__container">
                    <SortDropDown
                        ageSortAsc={ageSortAsc} setAgeSortAsc={setAgeSortAsc}
                        priceSortHighLow={priceSortHighLow} setPriceSortHighLow={setPriceSortHighLow}
                        priceSortLowHigh={priceSortLowHigh} setPriceSortLowHigh={setPriceSortLowHigh}
                        ratingSortHighLow={ratingSortHighLow} setRatingSortHighLow={setRatingSortHighLow}
                    ></SortDropDown>
                    <FilterDropDown
                        setPriceFilter={setPriceFilter} priceFilter={priceFilter}
                        filterPrice={filterPrice}
                    >
                    </FilterDropDown>
                </div>

                <div className="products__display__container">
                    {ageSortAsc ? Object.values(products[0]).reverse().map((product)=>{ if (product.price <= filterUpper && product.price >= filterLower) {

                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }
                    }): <></>}

                    {priceSortHighLow ? Object.values(products[0]).sort((a,b)=>{return a.price - b.price}).map((product)=>{ if (product.price <= filterUpper && product.price >= filterLower){

                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }
                    }): <></>}

                    {priceSortLowHigh ? Object.values(products[0]).sort((a,b)=>{return b.price - a.price}).map((product)=>{if (product.price <= filterUpper && product.price >= filterLower) {

                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }
                    }): <></>}

                    {ratingSortHighLow ? Object.values(products[0]).sort((a,b)=>{return b.reviews.length - a.reviews.length}).sort((a,b)=>{return avgRating(b) - avgRating(a)}).map((product)=>{if (product.price <= filterUpper && product.price >= filterLower) {

                        return (
                            <AllProductsCard product={product}></AllProductsCard>
                        )
                    }
                    }): <></>}

                </div>
            </div>
        )
    )
}

export default ProductsDisplay
