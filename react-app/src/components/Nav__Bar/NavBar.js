import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./nav__bar.css"
import LoginFormModal from '../Modals/LoginFormModal';
import SignUpFormModal from '../Modals/SignUpFormModal';
import AddProductFormModal from '../Modals/PostProductModal';
import { getCart } from '../../store/cart';
import UserDropDown from './UserDropDown';
import logo from "./Kanto_Prime_Logo.svg"
import { searchProduct } from '../../store/search';
import SearchBar from './SearchBar';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const cartCount = (useSelector((state)=> state.cart.products))
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCart(user?.id))
  },[dispatch, user])

  const cartSum = ()=>{
    const initialVal = 0
    const myCartSum = Object.values(cartCount).reduce(
      (accum, curr)=> accum + curr.quantity,
      initialVal
    )
    return myCartSum
  }

  return (
      <>
        <nav className='nav__bar__container'>
            <div className='nav__link__container__left'>
              <img className="logo" src={logo} ></img>
            </div>
            <SearchBar />
            <div className='nav__link__container__right'>
              {!sessionUser ? <LoginFormModal /> :<></>}
              {!sessionUser ? <SignUpFormModal /> :<></>}
              { sessionUser ? <AddProductFormModal />:<></>}
              { sessionUser ?
                <NavLink
                  to='/mycart' exact={true} activeClassName='active' className="nav__link"><div>{cartSum()} <i className="fa-solid fa-cart-shopping"></i></div>
                </NavLink>
              :<></>}
              {sessionUser? <UserDropDown/> : <></>}
            </div>
        </nav>
        <div className='cat__main__container'>
          <nav className="cat__container">
              <NavLink to='/category/plush' exact={true} activeClassName='active' className="cat__link">Plush</NavLink>
              <NavLink to='/category/tradingcards' exact={true} activeClassName='active' className="cat__link">Trading Card Game</NavLink>
              <NavLink to='/category/figures' exact={true} activeClassName='active' className="cat__link">Figures</NavLink>
              <NavLink to='/category/games' exact={true} activeClassName='active' className="cat__link">Game</NavLink>
          </nav>
        </div>
      </>

  );
}

export default NavBar;
