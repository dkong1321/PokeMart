import React, { useEffect, useState } from 'react';

function FilterDropDown({setPriceFilter, filterPrice}){
    const [menu, setMenu] = useState(false)
    const [variable, setVariable] = useState("Any")

    const openDropDown = () => {
    if(menu) return
    setMenu(true);
    }

    const closeMenu = () => {
    setMenu(false)
    }

    const updatePriceFilter = (x) => {
        setPriceFilter(x)
        filterPrice(x)
        setVariable(x)
        console.log(x)
        console.log(variable)
    }


    useEffect(()=> {
    if (!menu) return;
    document.addEventListener('click',closeMenu)
    return ()=> document.removeEventListener("click",closeMenu)
    }, [menu, variable])

    return(
        <>
            {
                <div className='filter__dropdown' onClick={openDropDown}>Filter By: Price {variable} <i className="fa-solid fa-caret-down"></i></div>
            }

            {menu && (
                <>
                    <div className="filter__dropdown__option__container">
                        <div className='filter__dropdown__open' onClick={openDropDown}>Filter By: Price {variable} <i className="fa-solid fa-caret-down"></i></div>
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
