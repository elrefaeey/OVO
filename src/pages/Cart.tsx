import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart, addItem } = useCart();
  const { products } = useProducts();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handlePlaceOrder = () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        variant: "destructive"
      });
      return;
    }

    const orderDetails = items.map(item => 
      `${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const message = `New Order - OVO Store
    
Customer Information:
Name: ${customerInfo.name}
Address: ${customerInfo.address}
Phone: ${customerInfo.phone}

Order Details:
${orderDetails}

Total: $${getTotalPrice().toFixed(2)}`;

    const whatsappUrl = `https://wa.me/201092940685?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    clearCart();
    setCustomerInfo({ name: '', address: '', phone: '' });
    
    toast({
      title: "Order sent!",
      description: "Your order has been sent via WhatsApp."
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg mb-4">Your cart is empty</p>
            <Button onClick={() => window.location.href = '/products'}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = products.find(p => p.id === item.id);
                return (
                  <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg p-6 shadow-sm border border-stone-200">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-stone-800">{item.name}</h3>
                        <p className="text-stone-500 text-sm">{item.category} • {item.type}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-stone-500 text-sm">Size: {item.size}</span>
                          {product && product.sizes.length > 1 && (
                            <select
                              className="ml-2 border rounded px-2 py-1 text-sm"
                              value={item.size}
                              onChange={e => {
                                const newSize = e.target.value;
                                removeItem(item.id, item.size);
                                addItem({ ...item, size: newSize }, item.quantity);
                              }}
                            >
                              {product.sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          )}
                        </div>
                        <p className="font-semibold text-stone-900">EG {item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 border border-stone-300 rounded-md hover:bg-stone-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 border border-stone-300 rounded-md hover:bg-stone-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-stone-900">
                          EG {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-red-500 hover:text-red-700 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-stone-200 sticky top-20">
                <h2 className="text-xl font-semibold text-stone-800 mb-4">Order Summary</h2>
                <div className="flex justify-between items-center text-lg font-bold text-stone-900 mb-6 pt-4 border-t border-stone-200">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <Button onClick={handlePlaceOrder} className="w-full">
                  Place Order via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
