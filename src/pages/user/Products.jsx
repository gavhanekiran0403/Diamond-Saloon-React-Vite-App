import React from "react";
import { useNavigate } from "react-router-dom";
import "./products.css";

const Products = () => {
  const navigate = useNavigate();

  // BUY NOW FUNCTION
  const handleBuyNow = (name, price, image) => {
    const product = {
      id: Date.now(),
      name,
      price,
      image
    };

    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    navigate("/buynow");
  };

  // ADD TO CART FUNCTION
  const handleAddToCart = (name, price, image) => {

    let cart = [];

    try {
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      cart = [];
    }

    const product = {
      id: Date.now(),
      name,
      price,
      image
    };

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/cart");
  };

  return (
    <section className="products-page">

      <h1 className="products-title">Our Products & Services</h1>

      <p className="products-subtitle">
        Premium salon-quality products and relaxing therapies for your wellness.
      </p>

      <div className="products-grid">

        {/* Product 1 */}
        <div className="product-card">
          <img src="/Herbal_Shampoo.jpg" alt="Herbal Shampoo" />
          <h3>Herbal Shampoo</h3>
          <p>Nourishes and strengthens hair.</p>
          <span>₹399</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Herbal Shampoo", 399, "/Herbal_Shampoo.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Herbal Shampoo", 399, "/Herbal_Shampoo.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Product 2 */}
        <div className="product-card">
          <img src="/Silky_hair.jpg" alt="Silky Conditioner" />
          <h3>Silky Conditioner</h3>
          <p>Leaves hair smooth and shiny.</p>
          <span>₹449</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Silky Conditioner", 449, "/Silky_hair.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Silky Conditioner", 449, "/Silky_hair.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Product 3 */}
        <div className="product-card">
          <img src="/hair_oil.jpg" alt="Hair Growth Oil" />
          <h3>Hair Growth Oil</h3>
          <p>Promotes healthy hair growth.</p>
          <span>₹299</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Hair Growth Oil", 299, "/hair_oil.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Hair Growth Oil", 299, "/hair_oil.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Product 4 */}
        <div className="product-card">
          <img src="/Face_Wash.jpg" alt="Face Wash" />
          <h3>Gentle Face Wash</h3>
          <p>For glowing and healthy skin.</p>
          <span>₹249</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Gentle Face Wash", 249, "/Face_Wash.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Gentle Face Wash", 249, "/Face_Wash.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Service 1 */}
        <div className="product-card service-card">
          <img src="/massage_oil.jpg" alt="Body Massage" />
          <h3>Body Massage</h3>

          <p>
            Relax your body and mind with our professional full-body massage
            therapy designed to relieve stress and muscle tension.
          </p>

          <span>₹1049</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Body Massage", 1049, "/massage_oil.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Body Massage", 1049, "/massage_oil.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Service 2 */}
        <div className="product-card service-card">
          <img src="/head_masage.jpg" alt="Head Massage" />
          <h3>Head Massage</h3>

          <p>
            Experience deep relaxation with our soothing head massage that
            improves blood circulation.
          </p>

          <span>₹649</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Head Massage", 649, "/head_masage.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Head Massage", 649, "/head_masage.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

        {/* Service 3 */}
        <div className="product-card service-card">
          <img src="/sleeping.jpg" alt="Sleeping Therapy" />
          <h3>Sleeping Therapy</h3>

          <p>
            Therapy session designed to improve sleep quality and reduce stress.
          </p>

          <span>₹899</span>

          <div className="product-buttons">

            <button
              className="buy-btn"
              onClick={() =>
                handleBuyNow("Sleeping Therapy", 899, "/sleeping.jpg")
              }
            >
              Buy Now
            </button>

            <button
              className="cart-btn"
              onClick={() =>
                handleAddToCart("Sleeping Therapy", 899, "/sleeping.jpg")
              }
            >
              Add To Cart
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Products;