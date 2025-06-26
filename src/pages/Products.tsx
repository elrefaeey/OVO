import React, { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { Product } from '@/hooks/useProducts';
import { useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';

const Products = () => {
  const { products, loading } = useProducts();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceSort: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && ['Men', 'Women', 'Kids'].includes(category)) {
      setFilters((prev) => ({ ...prev, category }));
    }
  }, [location.search]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.priceSort === 'low-to-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === 'high-to-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, filters]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mx-auto mb-4"></div>
          <p className="text-stone-800 text-3xl font-bold tracking-widest">OVO</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-stone-800 mb-8 text-center tracking-wide drop-shadow-sm">Our Collection</h1>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-6 py-2 rounded-lg font-bold text-lg border transition-colors ${filters.category === 'Men' ? 'bg-stone-100 text-stone-900 border-stone-200' : 'bg-white text-stone-900 border-stone-200 hover:bg-stone-50'}`}
              onClick={() => setFilters(prev => ({ ...prev, category: 'Men', type: '' }))}
            >
              MEN
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-bold text-lg border transition-colors ${filters.category === 'Women' ? 'bg-stone-100 text-stone-900 border-stone-200' : 'bg-white text-stone-900 border-stone-200 hover:bg-stone-50'}`}
              onClick={() => setFilters(prev => ({ ...prev, category: 'Women', type: '' }))}
            >
              WOMEN
            </button>
            <button
              className={`px-6 py-2 rounded-lg font-bold text-lg border transition-colors ${filters.category === 'Kids' ? 'bg-stone-100 text-stone-900 border-stone-200' : 'bg-white text-stone-900 border-stone-200 hover:bg-stone-50'}`}
              onClick={() => setFilters(prev => ({ ...prev, category: 'Kids', type: '' }))}
            >
              KIDS
            </button>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">
              {products.length === 0 
                ? "No products available yet. Check back soon!" 
                : "No products match your current filters."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </div>
      
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Products;
