import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './main/Home';
import PrivateRoutes from './auth/PrivateRoutes';
import AdminRoutes from './auth/AdminRoutes';
import Dashboard from './user/userDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './main/shop';
import Product from './main/Product';
import Cart from './main/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/user/dashboard" exact component={Dashboard} />
                <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoutes path="/create/category" exact component={AddCategory} />
                <AdminRoutes path="/create/product" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoutes path="/admin/orders" exact component={Orders} />
                <PrivateRoutes path="/profile/:userId" exact component={Profile} />
                <AdminRoutes path="/manage/product" exact component={ManageProduct} />
                <AdminRoutes path="/admin/product/update/:productId" exact component={UpdateProduct} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;