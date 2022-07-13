import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchProduct, clearProductSearch } from '../../store/search';
import "./search__bar.css"

const SearchBar = () => {
    const search = useSelector((state) => state.search)
    const [searchTerm, setSearchTerm] =  useState("")
    const [searchMenu, setSearchMenu] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=> {
    if (!searchMenu) return;
      document.addEventListener('click',closeDropDown)
      return ()=> document.removeEventListener("click",closeDropDown)
  }, [searchMenu,dispatch])

    const openDropDown = () => {
    if(searchMenu) return
    setSearchMenu(true);
  }

  const closeDropDown = () => {
    setSearchMenu(false)
  }

    const searchFunc = (e) =>{
    if(e.target.value.length ===0) {
        dispatch(clearProductSearch())
        return
    }
    setSearchTerm(e.target.value)
    dispatch(searchProduct(e.target.value))
    }

  return(
    <div className='search__bar__container'>
        <input className='search__bar__input' placeholder='Search Products By Name' onClick={openDropDown} onChange={e => searchFunc(e)}></input>
        <div className='magnifying__container'>
            <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {searchMenu ?(
            <>
                {/* <input className='search__bar__input' placeholder='Search Products By Name' onClick={openDropDown} onChange={e => searchFunc(e)}></input>
                <div className='magnifying__container'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div> */}
                <div className='search__results__dropdown'>
                    { search?.search ? Object?.values(search?.search).splice(0,12).map((product)=>{
                    return(
                        <NavLink className="search__result__link" to={`/products/${product.id}`}>{product.product_name}</NavLink>
                    )
                    }):<div></div>}
                </div>
            </>
        ):<></>}
    </div>
  )
}

export default SearchBar;
