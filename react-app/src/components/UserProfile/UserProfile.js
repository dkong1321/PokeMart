import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyProducts from '../MyProducts/MyProductsDisplay';
import { useSelector, useDispatch } from "react-redux";
import "./user__profile.css";
function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const allProducts = Object.values(useSelector((state)=> state.products))

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile__page__container'>
      <div className='profile__main__container'>
        <div className='profile__container'>
          <img className='profile__image' src={user.avatar_url}></img>
          <div className='profile__info'>
            <div className='profile__labels'><div className='profile__info__header'>Username:</div>{user.username}</div>
            <div className='profile__labels'><div className='profile__info__header'>User Email:</div>{user.email}</div>
            {allProducts.length && (
              <div className='profile__labels'><div className='profile__info__header'>User Products:</div>{Object.values(allProducts[0]).filter((product)=> product.user_id === user.id).length} </div>
            )}
          </div>
        </div>
      </div>
      <div className='listing__title'>Your Listings</div>
      <MyProducts/>
    </div>

  );
}
export default UserProfile;
