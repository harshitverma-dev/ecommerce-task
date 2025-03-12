import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { api } from '../services/api';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const isInCart = cartItems.some(item => item.id === Number(id));
  const itemQuantity =  cartItems.find(item => item.id === Number(id));
//   console.log(itemQuantity, 'll')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{product.rating.rate}</span>
            </div>
            <span className="text-gray-500">({product.rating.count} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-blue-600">${product.price}</p>

          <div className="border-t border-b py-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">Category: 
              <span className="ml-2 text-gray-600 capitalize">{product.category}</span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              isInCart 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isInCart ? `Added to Cart` : 'Add to Cart'}
          </button>
          <p className='text-gray-600'>{`this product quantity in cart - ${itemQuantity?.quantity ?? 0}`}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ProductPage;