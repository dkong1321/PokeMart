
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./nav__bar.css"
const NavBar = () => {
  return (
    <nav className='nav__bar__container'>
        <div className='nav__link__container__left'>
          <NavLink to='/' exact={true} activeClassName='active' className="nav__link">
            Home
          </NavLink>
        </div>

        <div className='nav__link__container__right'>
          <NavLink to='/login' exact={true} activeClassName='active' className="nav__link">
            Login
          </NavLink>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className="nav__link">
            Sign Up
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active' className="nav__link">
            Users
          </NavLink>
          <LogoutButton />
        </div>
    </nav>
  );
}

export default NavBar;
