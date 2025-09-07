import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$299',
      stock: 24,
      status: 'Active',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics', 
      price: '$199',
      stock: 15,
      status: 'Active',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '$89',
      stock: 8,
      status: 'Low Stock',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'USB Cable',
      category: 'Accessories',
      price: '$29',
      stock: 0,
      status: 'Out of Stock',
      image: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Low Stock': return 'text-warning bg-warning/10';
      case 'Out of Stock': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/seller/dashboard">
                <Button variant="outline" size="icon" className="btn-glass">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <p className="text-muted-foreground">Add, edit, and manage your product inventory</p>
              </div>
            </div>
            <Link to="/seller/products/add">
              <Button className="btn-hero">
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="btn-glass">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-6 glass hover-lift">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-card rounded-2xl flex items-center justify-center">
                  <Package className="w-10 h-10 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-muted-foreground mb-2">{product.category}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        <span className="text-muted-foreground">Stock: {product.stock}</span>
                        <Badge className={`${getStatusColor(product.status)}`}>
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="btn-glass">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="btn-glass">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="btn-glass text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="btn-glass">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first product'}
            </p>
            <Link to="/seller/products/add">
              <Button className="btn-hero">
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;