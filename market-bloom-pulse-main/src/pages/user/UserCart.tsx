import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus,
  ShoppingCart,
  CreditCard,
  Truck,
  Tag,
  Gift,
  Package
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserCart = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 299,
      quantity: 1,
      image: '/placeholder.svg',
      seller: 'TechStore Pro',
      inStock: true,
      originalPrice: 349
    },
    {
      id: '2',
      name: 'Smart Watch Premium',
      price: 199,
      quantity: 2,
      image: '/placeholder.svg',
      seller: 'Smart Living',
      inStock: true,
      originalPrice: 249
    },
    {
      id: '3',
      name: 'Yoga Mat Premium',
      price: 79,
      quantity: 1,
      image: '/placeholder.svg',
      seller: 'FitLife Store',
      inStock: false,
      originalPrice: 89
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const discount = promoCode.toLowerCase() === 'save10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const proceedToCheckout = () => {
    if (cartItems.some(item => !item.inStock)) {
      alert('Please remove out of stock items before checkout');
      return;
    }
    navigate('/user/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/user/dashboard">
                <Button variant="outline" size="icon" className="btn-glass">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  Shopping Cart
                  <Badge className="bg-primary text-primary-foreground">
                    {cartItems.length} items
                  </Badge>
                </h1>
                <p className="text-muted-foreground">Review your items before checkout</p>
              </div>
            </div>
            <Link to="/user/dashboard">
              <Button variant="outline" className="btn-glass">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <Card className="p-12 glass text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet</p>
            <Link to="/user/dashboard">
              <Button className="btn-hero">
                Start Shopping
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className={`p-6 glass ${!item.inStock ? 'opacity-60' : ''}`}>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-card rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">by {item.seller}</p>
                          {!item.inStock && (
                            <Badge variant="destructive" className="mt-2">Out of Stock</Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">${item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-muted-foreground line-through">${item.originalPrice}</span>
                          )}
                          {item.originalPrice > item.price && (
                            <Badge className="bg-success/10 text-success">
                              Save ${item.originalPrice - item.price}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 btn-glass"
                            disabled={!item.inStock}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-semibold min-w-[30px] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 btn-glass"
                            disabled={!item.inStock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 glass sticky top-6">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-success">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline" className="btn-glass">
                      <Tag className="w-4 h-4 mr-1" />
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Try "SAVE10" for 10% off</p>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={proceedToCheckout}
                  className="w-full btn-hero text-lg py-3"
                  disabled={cartItems.some(item => !item.inStock)}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Add ${(100 - subtotal).toFixed(2)} more for FREE shipping
                  </p>
                )}

                {/* Benefits */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Gift className="w-4 h-4" />
                      <span>Free returns within 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="w-4 h-4" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      <span>Fast & tracked delivery</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCart;