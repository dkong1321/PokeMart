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
    const url = window.location.href.split("/")
    const cate = url[url.length-1]
    const category_types = ["plush", "tradingcards", "figures","games"]
    const category_titles = ["Plushes", "Pokemon TCG", "Figures", "Games" ]
    const category_banner = ["1", "http://kanto-prime.s3.amazonaws.com/1c87961b4efb479dad97d2c3145542fc.jpg", "3", "4"]
    const catId = category_types.indexOf(cate)
    console.log(useParams().category_type)
    console.log(window.location.href.split("/")[window.location.href.split("/").length-1])
    useEffect(()=>{
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
                <img src="http://kanto-prime.s3.amazonaws.com/1c87961b4efb479dad97d2c3145542fc.jpg"></img>
                <div className="products__heading">{category_titles[catId]}</div>
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
