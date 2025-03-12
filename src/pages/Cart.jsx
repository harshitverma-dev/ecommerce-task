import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, quantity }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link
                    to="/"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Cart List</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center gap-4 border-b py-4"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-contain"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.title.substring(0, 20)}...</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 mt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;