import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./nav__bar.css"
import { getCart } from '../../store/cart';


const NavBarCat = () => {
  const cartCount = (useSelector((state)=> state.cart.products))
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCart(user?.id))
  },[dispatch, user])

  return (
      <>
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

export default NavBarCat;
