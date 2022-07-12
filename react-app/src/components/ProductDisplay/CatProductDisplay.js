import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./product_display.css"
import SortDropDown from "./SortDropDown";
import AllProductsCard from "./AllProductCard";
import FilterDropDown from "./FilterDropDown";
import { getCategory } from "../../store/product";
import { useParams} from "react-router-dom";

const CatProductsDisplay = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const products = Object.values(useSelector((state)=> state.products))
    const [ageSortAsc, setAgeSortAsc] = useState(true)
    const [priceSortHighLow, setPriceSortHighLow] = useState(false)
    const [priceSortLowHigh, setPriceSortLowHigh] = useState(false)
    const [ratingSortHighLow, setRatingSortHighLow] = useState(false)
    const [filterUpper, setFilterUpper] = useState(Infinity)
    const [filterLower, setFilterLower] = useState(0)
    const [priceFilter, setPriceFilter] = useState("")
    const [sortLabel, setSortLabel] = useState("Recently")
    const [filterLabel, setFilterLabel] = useState("Any")
    const category_types = ["plush", "tradingcards", "figures","games"]
    const category_banner = [   "http://kanto-prime.s3.amazonaws.com/41f79464837940bf8f5c04c9f5f23a22.jpg",
                                "http://kanto-prime.s3.amazonaws.com/1c87961b4efb479dad97d2c3145542fc.jpg",
                                "http://kanto-prime.s3.amazonaws.com/9d4a4d15f0c74d188a19613c09b8538f.jpg",
                                "http://kanto-prime.s3.amazonaws.com/13ed417e8cc445d3b4ddb0f7da971b5c.jpg",
                            ]
    const catId = category_types.indexOf(useParams().category)
    console.log(useParams().category)

    useEffect(()=>{
        setAgeSortAsc(true)
        // setFilterUpper(Infinity)
        // setFilterLower(0)
        setPriceSortHighLow(false)
        setPriceSortLowHigh(false)
        setRatingSortHighLow(false)
        // setPriceFilter("")
        setSortLabel("Recently")
        dispatch(getCategory(catId+1))
        .then(()=>setIsLoaded(true))

    }, [dispatch, priceFilter, catId]);

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
        setPriceFilter(e.target.value)
        filterPrice(e.target.value)
    }

    const filterPrice = (x) => {
        console.log(x)
        switch(x){
            case "Any":
                setFilterUpper(Infinity)
                setFilterLower(0)
                return
            case "<$25":
                setFilterUpper(25)
                setFilterLower(0)
                return
            case "$25-$50":
                setFilterUpper(50)
                setFilterLower(25)
                return
            case "$50-$100":
                setFilterUpper(100)
                setFilterLower(50)
                return
            case ">$100":
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
                {console.log(filterLower)}
                {console.log(filterUpper)}
                {console.log(ageSortAsc)}
                <img className="cat__banner" src={category_banner[catId]}></img>
                <div className="sort__filter__container">
                    <SortDropDown
                        ageSortAsc={ageSortAsc} setAgeSortAsc={setAgeSortAsc}
                        priceSortHighLow={priceSortHighLow} setPriceSortHighLow={setPriceSortHighLow}
                        priceSortLowHigh={priceSortLowHigh} setPriceSortLowHigh={setPriceSortLowHigh}
                        ratingSortHighLow={ratingSortHighLow} setRatingSortHighLow={setRatingSortHighLow}
                        sortLabel={sortLabel} setSortLabel={setSortLabel}
                    ></SortDropDown>
                    <FilterDropDown
                        setPriceFilter={setPriceFilter} priceFilter={priceFilter}
                        filterPrice={filterPrice} filterLabel={filterLabel} setFilterLabel={setFilterLabel}
                    >
                    </FilterDropDown>
                </div>

                <div className="products__display__container">
                    {ageSortAsc ? Object?.values(products[0]).reverse().map((product)=>{ if (product.price <= filterUpper && product.price >= filterLower) {

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

export default CatProductsDisplay
