import React, { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['']);
  const { addItem } = useCart();

  if (!isOpen || !product) return null;

  useEffect(() => {
    setSelectedSizes((prev) => {
      if (quantity > prev.length) {
        return [...prev, ...Array(quantity - prev.length).fill('')];
      } else if (quantity < prev.length) {
        return prev.slice(0, quantity);
      }
      return prev;
    });
  }, [quantity]);

  const handleAddToCart = () => {
    if (selectedSizes.some(size => !size)) {
      toast({
        title: "Please select a size for each piece",
        variant: "destructive"
      });
      return;
    }
    selectedSizes.forEach((size) => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        image: product.image,
        category: product.category,
        type: product.type
      }, 1);
    });
    toast({
      title: "Added to cart!",
      description: `${product.name} (${selectedSizes.join(', ')})`
    });
    onClose();
    setSelectedSizes(['']);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-3 sm:p-6 border-b border-stone-200">
          <h2 className="text-2xl font-semibold text-stone-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-3 sm:p-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="aspect-square overflow-hidden rounded-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 sm:h-96 md:h-full object-contain bg-white"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-stone-600 mb-2">{product.category} • {product.type}</p>
                <p className="text-base md:text-xl lg:text-2xl font-bold text-stone-900 mb-2">EG {product.price}</p>
              </div>
              
              <p className="text-stone-600">{product.description}</p>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Size
                </label>
                {quantity === 1 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes([size])}
                        className={`px-4 py-2 border rounded-md ${
                          selectedSizes[0] === size
                            ? 'border-stone-800 bg-stone-800 text-white'
                            : 'border-stone-300 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Array.from({ length: quantity }).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 w-16">Piece {idx + 1}:</span>
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={selectedSizes[idx] || ''}
                          onChange={e => {
                            const newSizes = [...selectedSizes];
                            newSizes[idx] = e.target.value;
                            setSelectedSizes(newSizes);
                          }}
                        >
                          <option value="">Select size</option>
                          {product.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 border border-stone-300 rounded-md hover:bg-stone-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-lg px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 border border-stone-300 rounded-md hover:bg-stone-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-stone-800 text-white py-3 rounded-md hover:bg-stone-700 transition-colors font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
