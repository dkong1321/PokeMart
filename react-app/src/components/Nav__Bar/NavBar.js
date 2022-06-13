
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';
import "./nav__bar.css"
import LoginFormModal from '../Modals/LoginFormModal';
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='nav__bar__container'>
        <div className='nav__link__container__left'>
          <NavLink to='/' exact={true} activeClassName='active' className="nav__link">Home</NavLink>
        </div>

        <div className='nav__link__container__right'>
          {sessionUser ? <NavLink to='/mycart' exact={true} activeClassName='active' className="nav__link">My Cart</NavLink> :<></>}
          {sessionUser ? <NavLink to='/myorders' exact={true} activeClassName='active' className="nav__link">My Orders</NavLink>:<></>}

          {!sessionUser ? <NavLink to='/login' exact={true} activeClassName='active' className="nav__link">Login</NavLink> :<></>}
          {!sessionUser ? <NavLink to='/sign-up' exact={true} activeClassName='active' className="nav__link">Sign up</NavLink> :<></>}
          <LogoutButton />
          {/* {!sessionUser ? <LoginFormModal /> :<></>} */}
        </div>

    </nav>
  );
}

export default NavBar;
