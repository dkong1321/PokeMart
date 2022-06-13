
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import "./nav__bar.css"
import LoginFormModal from '../Modals/LoginFormModal';
import SignUpFormModal from '../Modals/SignUpFormModal';
import AddProductFormModal from '../Modals/PostProductModal';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const cartProducts = (useSelector((state)=>state.cart.products))
  return (
    <nav className='nav__bar__container'>
        <div className='nav__link__container__left'>
          <NavLink to='/' exact={true} activeClassName='active' className="nav__link">Home</NavLink>
        </div>

        <div className='nav__link__container__right'>
          {sessionUser ? <NavLink to='/myorders' exact={true} activeClassName='active' className="nav__link">My Orders</NavLink>:<></>}

          {!sessionUser ? <LoginFormModal /> :<></>}
          {!sessionUser ? <SignUpFormModal /> :<></>}
          { sessionUser ? <LogoutButton /> :<></>}
          { sessionUser ? <AddProductFormModal />:<></>}
          { sessionUser ?
            <NavLink
              to='/mycart' exact={true} activeClassName='active' className="nav__link">{Object.values(cartProducts).length} items in Cart
            </NavLink>
          :<></>}
        </div>

    </nav>
  );
}

export default NavBar;
