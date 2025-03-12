import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    setSelectedCategory,
    clearFilter
} from '../store/slices/productSlice';
import Cart from './Cart';
import ProductComp from '../components/ProductComp';

const Home = () => {
    const dispatch = useDispatch();
    const { products, categories, selectedCategory, loading } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(clearFilter());
    }, []);

    const handleCategoryChange = (category) => {
        if (category === selectedCategory) {
            dispatch(clearFilter());
            dispatch(fetchProducts());
        } else {
            dispatch(setSelectedCategory(category));
            dispatch(fetchProductsByCategory(category));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen container mx-auto px-4 py-8">
            {/* Category Filter */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                    {selectedCategory && (
                        <button
                            onClick={() => {
                                dispatch(clearFilter());
                                dispatch(fetchProducts());
                            }}
                            className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductComp {...product} key={product.id} />
                ))}
            </div>
            <div className='border mt-4'>
                <Cart />
            </div>
        </div>
    );
};

export default Home;