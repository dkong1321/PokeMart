import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function SortDropDown({setAgeSortAsc, setPriceSortHighLow, setPriceSortLowHigh, setRatingSortHighLow}){
  const [menu, setMenu] = useState(false)
  const [variable, setVariable] = useState("Recently")
  const openDropDown = () => {
    if(menu) return
    setMenu(true);
  }

  const closeMenu = () => {
    setMenu(false)
  }

     const sortByRecent = () => {
        setAgeSortAsc(true)
        setPriceSortHighLow(false)
        setPriceSortLowHigh(false)
        setRatingSortHighLow(false)
        setVariable("Recently")
    }

    const sortByPriceHighLow = () => {
        setPriceSortHighLow(true)
        setPriceSortLowHigh(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        setVariable("High to low")

    }

    const sortByPriceLowHigh = () => {
        setPriceSortLowHigh(true)
        setPriceSortHighLow(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        setVariable("Low to high")

    }

    const sortByRatingHighLow = () => {
        setRatingSortHighLow(true)
        setPriceSortLowHigh(false)
        setPriceSortHighLow(false)
        setAgeSortAsc(false)
        setVariable("Highest Rating")
    }

  useEffect(()=> {
    if (!menu) return;
    document.addEventListener('click',closeMenu)
    return ()=> document.removeEventListener("click",closeMenu)
  }, [menu])

    return(
        <>
              <div className='sort__dropdown' onClick={openDropDown}>
                  Sort By: {variable}
              </div>

            {menu && (
            <div className="sort__dropdown__options">
                <div onClick={()=>sortByPriceHighLow()}>Price: High to Low</div>
                <div onClick={()=>sortByPriceLowHigh()}>Price: Low to High</div>
                <div onClick={()=>sortByRatingHighLow()}>Top Rated</div>
                <div onClick={()=>sortByRecent()}>Most Recent</div>
            </div>
            )}
        </>
    )
}

export default SortDropDown
