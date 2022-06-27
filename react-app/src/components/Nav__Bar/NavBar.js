import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import "./nav__bar.css"
import LoginFormModal from '../Modals/LoginFormModal';
import SignUpFormModal from '../Modals/SignUpFormModal';
import AddProductFormModal from '../Modals/PostProductModal';
import { getCart } from '../../store/cart';
import UserDropDown from './UserDropDown';
import logo from "./Kanto_Prime_Logo.svg"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const cartProducts = (useSelector((state)=>state.cart.products))
  const cartCount = (useSelector((state)=>state.cart.products))
  const user = useSelector((state)=>state.session.user)
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
    <div>
      <nav className='nav__bar__container'>
          <div className='nav__link__container__left'>
            {/* <NavLink to='/' exact={true} activeClassName='active' className="nav__link">Home</NavLink> */}
            <img className="logo" src={logo} ></img>

          </div>

          <div className='nav__link__container__right'>
            <NavLink to='/products' exact={true} activeClassName='active' className="nav_link shop__product__link">Shop Products</NavLink>
            {/* {sessionUser ? <NavLink to='/myorders' exact={true} activeClassName='active' className="nav__link">My Orders</NavLink>:<></>} */}
            {/* {sessionUser ? <NavLink to='/my-products' exact={true} activeClassName='active' className="nav__link">My Listings</NavLink>:<></>} */}
            {!sessionUser ? <LoginFormModal /> :<></>}
            {!sessionUser ? <SignUpFormModal /> :<></>}
            {/* { sessionUser ? <LogoutButton /> :<></>} */}
            { sessionUser ? <AddProductFormModal />:<></>}
            { sessionUser ?
              <NavLink
                to='/mycart' exact={true} activeClassName='active' className="nav__link"><div>{cartSum()} <i className="fa-solid fa-cart-shopping"></i></div>
              </NavLink>
            :<></>}
            { sessionUser ?
              <div className='avatar__container'>
                {/* <div>{sessionUser.username}</div> */}
                {/* <img className='avatar__image' src={sessionUser.avatar_url}></img> */}
              </div>
            :<></>}
            {sessionUser? <UserDropDown/> : <></>}
          </div>
      </nav>
      {/* {!sessionUser ?
      <nav className='nav__bar__container'>Hello guest, please log-in to add items to cart or post reviews</nav>:
      <></>
      } */}
    </div>
  );
}

export default NavBar;
