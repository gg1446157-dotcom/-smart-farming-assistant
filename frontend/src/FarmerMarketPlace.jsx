import { useState } from "react";
import "./FarmerMarketPlace.css";

function FarmerMarketplace() {

    const [cart, setCart] = useState([]);

    const products = [
        {
            id: 1,
            icon: "🌾",
            name: "Rice",
            category: "Grains",
            price: 55,
            unit: "kg",
            seller: "Green Farm"
        },
        {
            id: 2,
            icon: "🌱",
            name: "Tomato Seeds",
            category: "Seeds",
            price: 120,
            unit: "packet",
            seller: "Farm Seeds"
        },
        {
            id: 3,
            icon: "🥔",
            name: "Potato",
            category: "Vegetables",
            price: 40,
            unit: "kg",
            seller: "Fresh Fields"
        },
        {
            id: 4,
            icon: "🌽",
            name: "Corn",
            category: "Grains",
            price: 35,
            unit: "kg",
            seller: "Sunshine Farm"
        },
        {
            id: 5,
            icon: "🧪",
            name: "Organic Fertilizer",
            category: "Fertilizer",
            price: 450,
            unit: "bag",
            seller: "Natural Agriculture"
        },
        {
            id: 6,
            icon: "🌿",
            name: "Vegetable Seeds",
            category: "Seeds",
            price: 90,
            unit: "packet",
            seller: "Green Seeds"
        }
    ];


    const addToCart = (product) => {

        setCart((previousCart) => [
            ...previousCart,
            product
        ]);

    };


    const removeFromCart = (index) => {

        setCart((previousCart) =>
            previousCart.filter(
                (_, itemIndex) => itemIndex !== index
            )
        );

    };


    const totalPrice = cart.reduce(
        (total, product) => total + product.price,
        0
    );


    return (

        <div className="marketplace-page">

            <div className="marketplace-card">

                {/* HEADER */}

                <div className="marketplace-header">

                    <div className="marketplace-icon">
                        🛒
                    </div>

                    <div>

                        <h1>
                            Farmer Marketplace
                        </h1>

                        <p>
                            Buy and sell agricultural products 🌾
                        </p>

                    </div>

                </div>


                {/* MARKETPLACE CONTENT */}

                <div className="marketplace-content">

                    <div className="products-section">

                        <h2>
                            🌱 Available Products
                        </h2>


                        <div className="products-grid">

                            {products.map((product) => (

                                <div
                                    className="product-card"
                                    key={product.id}
                                >

                                    <div className="product-icon">
                                        {product.icon}
                                    </div>

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <span className="product-category">
                                        {product.category}
                                    </span>

                                    <p className="seller">
                                        👨‍🌾 {product.seller}
                                    </p>

                                    <p className="product-price">
                                        ₹{product.price}
                                        <span>
                                            /{product.unit}
                                        </span>
                                    </p>

                                    <button
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                    >
                                        🛒 Add to Cart
                                    </button>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* CART */}

                    <div className="cart-section">

                        <h2>
                            🛒 Your Cart
                        </h2>


                        {cart.length === 0 ? (

                            <p className="empty-cart">
                                Your cart is empty.
                            </p>

                        ) : (

                            <>

                                <div className="cart-items">

                                    {cart.map((product, index) => (

                                        <div
                                            className="cart-item"
                                            key={`${product.id}-${index}`}
                                        >

                                            <div>

                                                <strong>
                                                    {product.icon} {product.name}
                                                </strong>

                                                <span>
                                                    ₹{product.price}
                                                </span>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(index)
                                                }
                                            >
                                                ✕
                                            </button>

                                        </div>

                                    ))}

                                </div>


                                <div className="cart-total">

                                    <strong>
                                        Total
                                    </strong>

                                    <strong>
                                        ₹{totalPrice}
                                    </strong>

                                </div>


                                <button
                                    className="checkout-button"
                                    onClick={() =>
                                        alert(
                                            "Checkout feature will be added soon 🌾"
                                        )
                                    }
                                >
                                    Proceed to Checkout
                                </button>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
}

export default FarmerMarketplace;