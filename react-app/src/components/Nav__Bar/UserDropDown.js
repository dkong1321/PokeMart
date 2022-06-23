import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../Modals/LoginFormModal';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserDropDown(){
  const user = useSelector((state)=>state.session.user)
  const [menu, setMenu] = useState(false)

  const openDropDown = () => {
    if(menu) return
    setMenu(true);
  }

  const closeMenu = () => {
    setMenu(false)
  }

  useEffect(()=> {
    if (!menu) return;
    document.addEventListener('click',closeMenu)
    return ()=> document.removeEventListener("click",closeMenu)
  }, [menu])

    return(
        <>
            <button className='drop__down__button' onClick={openDropDown}>
                <img className='avatar__image' src={user.avatar_url}></img>
            </button>
            {menu && (
            <div>
                <LogoutButton />
                <NavLink to='/my-products' exact={true} activeClassName='active' className="nav__link">My Listings</NavLink>
                <NavLink to='/myorders' exact={true} activeClassName='active' className="nav__link">My Orders</NavLink>
            </div>
            )}
        </>
    )
}

export default UserDropDown
