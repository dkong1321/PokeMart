
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';
import "./nav__bar.css"
import LoginFormModal from '../Modals/LoginFormModal';
import SignUpFormModal from '../Modals/SignUpFormModal';
import AddProductFormModal from '../Modals/PostProductModal';
import { getCart } from '../../store/cart';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const cartProducts = (useSelector((state)=>state.cart.products))
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCart())
  },[dispatch])
  return (
    <nav className='nav__bar__container'>
        <div className='nav__link__container__left'>
          <NavLink to='/' exact={true} activeClassName='active' className="nav__link">Home</NavLink>
        </div>

        <div className='nav__link__container__right'>
          <NavLink to='/products' exact={true} activeClassName='active' className="nav_link">Shop Products</NavLink>
          {sessionUser ? <NavLink to='/myorders' exact={true} activeClassName='active' className="nav__link">My Orders</NavLink>:<></>}
          {!sessionUser ? <LoginFormModal /> :<></>}
          {!sessionUser ? <SignUpFormModal /> :<></>}
          { sessionUser ? <LogoutButton /> :<></>}
          { sessionUser ? <AddProductFormModal />:<></>}
          { sessionUser ?
            <NavLink
              to='/mycart' exact={true} activeClassName='active' className="nav__link"><div>{Object.values(cartProducts).length} <i className="fa-solid fa-cart-shopping"></i></div>
            </NavLink>
          :<></>}
        </div>

    </nav>
  );
}

export default NavBar;
