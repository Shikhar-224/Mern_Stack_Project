import React, { useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
import '../footer.css'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return ( 
        <Layout title = 'BookStore' description = 'Welcome to our BookStore' className='container-fluid'>
            <Search />
            <h2 className = 'col-6 mb-4'>New Arrivals</h2>
            <div className = 'row'>
            {productsByArrival.map((product, i) => (
                <div key = {i} className = 'col-4 mb-3'>
                    <Card product={product} />
                </div>
            ))}
            </div>
            <h2 className = 'col-6 mb-4'>Best Sellers</h2>
            <div className = 'row' >
            {productsBySell.map((product, i) => (
                <div key = {i} className = 'col-4 mb-3'>
                    <Card product={product} />
                </div>
            ))}
            </div>
            <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h3>localhost.com</h3>
            <h1 className="list-unstyled">
              <li>127.0.0.1</li>
              <li>Mountain View,</li>
              <li>California, United States</li>
            </h1>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Get to know us</h4>
            <ui className="list-unstyled">
              <li>About Us</li>
              <li>Press Releases</li>
              <li>Help And Support</li>
              <li>Terms</li>
              <li>Privacy Policy</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Connect with Us</h4>
            <ui className="list-unstyled">
              <li>Linkedln</li>
              <li>Github</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} localhost.com | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
        </Layout>
    );
};

export default Home;