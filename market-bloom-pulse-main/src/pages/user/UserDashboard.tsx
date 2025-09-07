import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  QrCode, 
  Filter,
  Star,
  Heart,
  Plus,
  Minus,
  User,
  Bell,
  Package,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'];
  
  const products = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 299,
      rating: 4.8,
      reviews: 124,
      image: '/placeholder.svg',
      category: 'Electronics',
      seller: 'TechStore Pro',
      inStock: true
    },
    {
      id: '2',
      name: 'Premium Cotton T-Shirt',
      price: 49,
      rating: 4.6,
      reviews: 89,
      image: '/placeholder.svg',
      category: 'Fashion',
      seller: 'Fashion Hub',
      inStock: true
    },
    {
      id: '3',
      name: 'Smart Home Assistant',
      price: 199,
      rating: 4.9,
      reviews: 256,
      image: '/placeholder.svg',
      category: 'Electronics',
      seller: 'Smart Living',
      inStock: false
    },
    {
      id: '4',
      name: 'Yoga Mat Premium',
      price: 79,
      rating: 4.7,
      reviews: 67,
      image: '/placeholder.svg',
      category: 'Sports',
      seller: 'FitLife Store',
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    // Category filter
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Search filter
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
    
    // Rating filter
    const ratingMatch = selectedRatings.length === 0 || 
                       selectedRatings.some(rating => product.rating >= rating);
    
    // Stock filter
    const stockMatch = !inStockOnly || product.inStock;
    
    return categoryMatch && searchMatch && priceMatch && ratingMatch && stockMatch;
  });

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1)
    }));
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Discover Products</h1>
              <p className="text-muted-foreground text-lg">Find amazing products from verified sellers</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/user/scan">
                <Button className="btn-glass">
                  <QrCode className="w-5 h-5 mr-2" />
                  Scan QR
                </Button>
              </Link>
              <Link to="/user/profile">
                <Button variant="outline" className="btn-glass">
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link to="/user/notifications">
                <Button variant="outline" size="icon" className="btn-glass relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                </Button>
              </Link>
              <Link to="/user/cart">
                <Button className="btn-hero relative">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground px-2 py-1 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <Card className="p-6 glass mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              className="btn-glass"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {(selectedRatings.length > 0 || inStockOnly || priceRange.min > 0 || priceRange.max < 1000) && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  Active
                </Badge>
              )}
            </Button>
          </div>
        </Card>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="p-6 glass mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="btn-glass"
                  onClick={() => {
                    setPriceRange({ min: 0, max: 1000 });
                    setSelectedRatings([]);
                    setInStockOnly(false);
                  }}
                >
                  Clear All
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="btn-glass"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium">Price Range</h4>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-20"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-20"
                  />
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="space-y-3">
                <h4 className="font-medium">Minimum Rating</h4>
                <div className="flex flex-wrap gap-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedRatings.includes(rating) ? "default" : "outline"}
                      size="sm"
                      className={selectedRatings.includes(rating) ? "btn-hero" : "btn-glass"}
                      onClick={() => {
                        setSelectedRatings(prev => 
                          prev.includes(rating) 
                            ? prev.filter(r => r !== rating)
                            : [...prev, rating]
                        );
                      }}
                    >
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Stock Filter */}
              <div className="space-y-3">
                <h4 className="font-medium">Availability</h4>
                <Button
                  variant={inStockOnly ? "default" : "outline"}
                  size="sm"
                  className={inStockOnly ? "btn-hero" : "btn-glass"}
                  onClick={() => setInStockOnly(!inStockOnly)}
                >
                  In Stock Only
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "btn-hero" : "btn-glass"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="glass hover-lift animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-card flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-3 right-3 btn-glass"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                </div>
                
                <Link to={`/user/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-smooth line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-3">by {product.seller}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  
                  {product.inStock && (
                    <div className="flex items-center gap-2">
                      {cartItems[product.id] > 0 ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => removeFromCart(product.id)}
                            className="w-8 h-8 btn-glass"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium min-w-[20px] text-center">
                            {cartItems[product.id]}
                          </span>
                          <Button
                            size="icon"
                            onClick={() => addToCart(product.id)}
                            className="w-8 h-8 btn-hero"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addToCart(product.id)}
                          className="btn-hero"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="btn-glass text-lg px-8 py-3">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;