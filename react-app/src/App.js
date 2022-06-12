import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav__Bar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getCart } from './store/cart';
import Products from './components/test_product';
import ProductsDisplay from './components/ProductDisplay/ProductDisplay';
import SingleProductDisplay from './components/SingleProductDisplay/SingleProductDisplay';
import CartDisplay from './components/CartDisplay/CartDisplay';
import Reviews from './components/test_review';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/products' exact={true}>
          <ProductsDisplay />
        </Route>
        <Route path='/products/:productId' exact={true}>
          <SingleProductDisplay />
        </Route>
        <Route path='/mycart' exact={true}>
          <CartDisplay />
        </Route>
        {/* <Route path='/products_test' exact={true}>
          <Products />
        </Route> */}
        {/* <Route path='/products_test/:productId'>
          <Reviews />
        </Route>
        <Route path='/products_test/:productId'>
          <Reviews />
        </Route> */}
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
