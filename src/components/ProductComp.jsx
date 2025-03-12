import React from 'react'
import { Link } from 'react-router-dom';

export default function ProductComp(product) {
    return (
        <div
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
        >
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm capitalize">
                {product.category}
            </div>

            <Link to={`/product/${product.id}`}>
                <div className="h-48 p-4 bg-white">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">${product.price}</span>
                        <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{product.rating.rate}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
