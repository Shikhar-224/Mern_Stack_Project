import React, { useState, useEffect} from 'react';
import Layout from './Layout';
import {emptyCart} from './cartHelpers'
import { getProducts, getBraintreeToken, processPayment, createOrder } from './apiCore';
import Card from './Card';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth'
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = f => f, run = undefined}) => {

    const [data, setData] = useState({
        success: false,
        loading: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error});
            } else {
                console.log(data);
                setData({clientToken: data.clientToken});
            }
        });
    };
    
    
    useEffect(() => {
        getToken(userId, token)
    }, []);

    const handleAddress = event => {
        setData({...data, address: event.target.value})
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    let deliveryAddress = data.address;

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    const buy = () => {
        setData({loading: true})
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data => {
            //console.log(data)
            nonce = data.nonce

            //console.log('Send nonce and total to process: ', nonce, getTotal(products));
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }

            processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response);      
                
            const createOrderData = {
                products: products, 
                transaction_id: response.transaction.id,
                amount: response.transaction.amount, 
                address: deliveryAddress
            }
                
            createOrder(userId, token, createOrderData)

            setData({...data, success: response.success});
                emptyCart(() => {
                    setRun(!run); // update parent state
                    console.log('payment success and empty cart');
                    setData({
                        loading: false,
                        success: true
                    });
                });
            })

            .catch(error => console.log(error))
        })
        .catch(error => {
            //console.log('droppin error: ', error);
            setData({...data, error: error.message});
        })
    };

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showDropIn = () => (
        <div onBlur = {() => setData({...data, error:''})}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>
                    <DropIn options = {{
                        authorization: data.clientToken,
                        googlePay: {
                            flow: 'vault'
                        }
                    }} onInstance = { instance => (data.instance = instance)} />
                    <button onClick = {buy} className = 'btn btn-success btn-block'>Pay</button>
                </div>
            ) : null}
        </div>
    );

    const showLoading = loading => loading && <h2>loading...</h2>

    return (
        <div>
            <h2>Total: Rs {getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout;