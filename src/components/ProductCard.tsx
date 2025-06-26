import React from 'react';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
      onClick={() => onClick(product)}
    >
      <div className="flex items-center justify-center aspect-square overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-[300px] h-[300px] object-cover rounded-lg border-4 border-white shadow-md bg-white"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-stone-800 mb-1">{product.name}</h3>
        <p className="text-sm text-stone-500 mb-2">{product.category} • {product.type}</p>
        <p className="font-semibold text-stone-900">EG {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
