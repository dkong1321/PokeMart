import React, { useEffect, useState } from 'react';

function SortDropDown({setAgeSortAsc,
                      setPriceSortHighLow,
                      setPriceSortLowHigh,
                      setRatingSortHighLow,
                      setSortLabel,
                      sortLabel}
                      ){
  const [sortMenu, setSortMenu] = useState(false)
  // const [variable, setVariable] = useState("Recently")
  const openDropDown = () => {
    if(sortMenu) return
    setSortMenu(true);
  }

  const closeSortMenu = () => {
    setSortMenu(false)
  }

     const sortByRecent = () => {
        setAgeSortAsc(true)
        setPriceSortHighLow(false)
        setPriceSortLowHigh(false)
        setRatingSortHighLow(false)
        // setVariable("Recently")
        setSortLabel("Recently")
    }

    const sortByPriceHighLow = () => {
        setPriceSortHighLow(true)
        setPriceSortLowHigh(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        // setVariable("$ High to Low")
        setSortLabel("$ Low to High")


    }

    const sortByPriceLowHigh = () => {
        setPriceSortLowHigh(true)
        setPriceSortHighLow(false)
        setAgeSortAsc(false)
        setRatingSortHighLow(false)
        // setVariable("$ Low to High")
        setSortLabel("$ High to Low")

    }

    const sortByRatingHighLow = () => {
        setRatingSortHighLow(true)
        setPriceSortLowHigh(false)
        setPriceSortHighLow(false)
        setAgeSortAsc(false)
        // setVariable("Top Rated")
        setSortLabel("Top Rated")
    }

  useEffect(()=> {
    if (!sortMenu) return;
      document.addEventListener('click',closeSortMenu)
      return ()=> document.removeEventListener("click",closeSortMenu)
  }, [sortMenu])

    return(
        <div>
              {
                <div className='sort__dropdown' onClick={openDropDown}>
                    Sort By: {sortLabel}<i className="fa-solid fa-caret-down"></i>
                </div>
              }

            {sortMenu && (
              <>
                <div className="sort__dropdown__option__container">
                    <div className='sort__dropdown__open' onClick={openDropDown}>
                      Sort By: {sortLabel} <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="sort__dropdown__option" onClick={()=>sortByPriceLowHigh()}>Price: High to Low</div>
                    <div className="sort__dropdown__option" onClick={()=>sortByPriceHighLow()}>Price: Low to High</div>
                    <div className="sort__dropdown__option" onClick={()=>sortByRatingHighLow()}>Top Rated</div>
                    <div className="sort__dropdown__option" onClick={()=>sortByRecent()}>Most Recent</div>
                </div>
              </>
            )}
        </div>
    )
}

export default SortDropDown
