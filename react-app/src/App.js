import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav__Bar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import UserProfile from './components/UserProfile/UserProfile';
import { authenticate } from './store/session';
import ProductsDisplay from './components/ProductDisplay/ProductDisplay';
import SingleProductDisplay from './components/SingleProductDisplay/SingleProductDisplay';
import CartDisplay from './components/CartDisplay/CartDisplay';
import OrderDisplay from './components/OrdersDisplay/OrderDisplay';
import Checkout from './components/CartDisplay/Checkout';
import EditOrderForm from './components/Forms/EditOrderForm';
import MyProducts from './components/MyProducts/MyProductsDisplay';
import EditProductForm from './components/Forms/EditProductForm';
import SplashPage from './components/SplashPage/SplashPage';

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
        <Route path='/' exact={true} >
          <SplashPage/>
        </Route>
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
        <Route path='/checkout' exact={true}>
          <Checkout/>
        </Route>
        <Route path='/myorders' exact={true}>
          <OrderDisplay />
        </Route>
        <Route path='/my-products' exact={true}>
          <MyProducts></MyProducts>
        </Route>
        <Route path='/edit-orders' exact={true}>
          <EditOrderForm />
        </Route>
        <Route path='/edit-product' exact={true}>
          <EditProductForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <SplashPage/>
        </ProtectedRoute>
      </Switch>
      {/* footer here later */}
    </BrowserRouter>
  );
}

export default App;
