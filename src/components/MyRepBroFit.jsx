import React from 'react';
import "./css/MyRepBroFit.css"
import img1 from '../images/products/person1_front.jpeg';
import img2 from '../images/products/person1_back.jpeg';
import img3 from '../images/products/editor_front.jpeg';
function MyRepBroFit() {
    return (
        <div className="container">
            <header className="header-section">
                <h1>MyRepBroFit!</h1>
                <h3>Get your fit on point!</h3>
                <p>Your one-stop shop for quality, comfortable, and stylish activewear!</p>
            </header>

            <section className="product-previews">
                <div className="product-card">
                    <img src={img1} alt="Product 1" className="product-image" />
                    <h4>T-Shirt Front</h4>
                </div>
                <div className="product-card">
                    <img src={img2} alt="Product 2" className="product-image" />
                    <h4>T-Shirt Back</h4>
                </div>
                <div className="product-card">
                    <img src={img3} alt="Product 3" className="product-image" />
                    <h4>T-Shirt Front (base)</h4>
                </div>
            </section>

            <footer className="footer-section">
                <a target="_blank" rel="noreferrer" href="https://www.myrepbrofit.com">
                    <button className="store-button">Check out the full inventory here!</button>
                </a>
            </footer>
        </div>
    );
}

export default MyRepBroFit;
