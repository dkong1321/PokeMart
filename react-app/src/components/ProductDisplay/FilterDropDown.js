import React, { useEffect, useState } from 'react';

function FilterDropDown({setPriceFilter,
                        setFilterLabel,
                        filterLabel,
                        setFilterLower,
                        setFilterUpper}){
    const [menu, setMenu] = useState(false)
    const [variable, setVariable] = useState("Any")

    const openDropDown = () => {
    if(menu) return
    setMenu(true);
    }

    const closeMenu = () => {
    setMenu(false)
    }

    const filterPrice = (x) => {
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

    const updatePriceFilter = (x) => {
        setPriceFilter(x)
        filterPrice(x)
        setFilterLabel(x)

    }


    useEffect(()=> {
    if (!menu) return;
    document.addEventListener('click',closeMenu)
    return ()=> document.removeEventListener("click",closeMenu)
    }, [menu, filterLabel])

    return(
        <>
            {
                <div className='filter__dropdown' onClick={openDropDown}>Filter By: Price {filterLabel} <i className="fa-solid fa-caret-down"></i></div>
            }

            {menu && (
                <>
                    <div className="filter__dropdown__option__container">
                        <div className='filter__dropdown__open' onClick={openDropDown}>Filter By: Price {filterLabel} <i className="fa-solid fa-caret-down"></i></div>
                        <div className="filter__dropdown__option" onClick={()=>updatePriceFilter("Any")}>Any Price</div>
                        <div className="filter__dropdown__option" onClick={()=>updatePriceFilter("<$25")}>Under $25</div>
                        <div className="filter__dropdown__option" onClick={()=>updatePriceFilter("$25-$50")}>$25 to $50</div>
                        <div className="filter__dropdown__option" onClick={()=>updatePriceFilter("$50-$100")}>$50 to $100</div>
                        <div className="filter__dropdown__option" onClick={()=>updatePriceFilter(">$100")}>Over $100</div>
                    </div>
                </>
            )}
        </>
    )
  }


export default FilterDropDown
