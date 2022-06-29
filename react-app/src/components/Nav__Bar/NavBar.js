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
            <NavLink to='/products' exact={true} activeClassName='active' className="nav__link">Shop Products</NavLink>
            {!sessionUser ? <LoginFormModal /> :<></>}
            {!sessionUser ? <SignUpFormModal /> :<></>}
            { sessionUser ? <AddProductFormModal />:<></>}
            { sessionUser ?
              <NavLink
                to='/mycart' exact={true} activeClassName='active' className="nav__link"><div>{cartSum()} <i className="fa-solid fa-cart-shopping"></i></div>
              </NavLink>
            :<></>}
            {/* { sessionUser ?
              <div className='avatar__container'>
                <UserDropDown/>
              </div>
            :<></>} */}
            {sessionUser? <UserDropDown/> : <></>}
          </div>
      </nav>
    </div>
  );
}

export default NavBar;
