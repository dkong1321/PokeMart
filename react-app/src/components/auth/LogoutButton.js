import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom";
import {emptyCart} from "../../store/cart"

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    history.push('/');
    dispatch(logout())
    dispatch(emptyCart())
  };

  return <div className="nav__link__dropdown" onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
