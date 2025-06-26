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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-bold tracking-widest">MEN</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-white p-4 rounded-xl shadow-lg min-w-[200px]">
                    <ul className="space-y-2">
                      <li><NavigationMenuLink href="/products?category=Men&type=T-shirt">T-shirt</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Men&type=Pants">Pants</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Men&type=Jacket">Jacket</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Men&type=Outfit">Outfit</NavigationMenuLink></li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-bold tracking-widest">WOMEN</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-white p-4 rounded-xl shadow-lg min-w-[200px]">
                    <ul className="space-y-2">
                      <li><NavigationMenuLink href="/products?category=Women&type=T-shirt">T-shirt</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Women&type=Pants">Pants</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Women&type=Jacket">Jacket</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Women&type=Outfit">Outfit</NavigationMenuLink></li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-lg font-bold tracking-widest">KIDS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="bg-white p-4 rounded-xl shadow-lg min-w-[200px]">
                    <ul className="space-y-2">
                      <li><NavigationMenuLink href="/products?category=Kids&type=T-shirt">T-shirt</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Kids&type=Pants">Pants</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Kids&type=Jacket">Jacket</NavigationMenuLink></li>
                      <li><NavigationMenuLink href="/products?category=Kids&type=Outfit">Outfit</NavigationMenuLink></li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
