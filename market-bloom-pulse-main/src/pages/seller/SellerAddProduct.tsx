import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Upload, 
  Package,
  DollarSign,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: '',
    weight: '',
    dimensions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate product creation
    alert('Product added successfully!');
    navigate('/seller/products');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/seller/products">
                <Button variant="outline" size="icon" className="btn-glass">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Add New Product</h1>
                <p className="text-muted-foreground">Create a new product listing for your store</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="p-6 glass">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Electronics, Accessories"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  value={productData.sku}
                  onChange={handleInputChange}
                  placeholder="Stock Keeping Unit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={productData.stock}
                  onChange={handleInputChange}
                  placeholder="Available quantity"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                placeholder="Describe your product features, benefits, and specifications..."
                rows={4}
                required
              />
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6 glass">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Pricing
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Product Images */}
          <Card className="p-6 glass">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Product Images
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Main Product Image</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Upload main product image</p>
                  <Button variant="outline" className="btn-glass">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Additional Images</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Upload additional images</p>
                  <Button variant="outline" className="btn-glass">
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Physical Properties */}
          <Card className="p-6 glass">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Physical Properties
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  value={productData.weight}
                  onChange={handleInputChange}
                  placeholder="Product weight"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions (L x W x H)</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  value={productData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 10 x 5 x 3 cm"
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Link to="/seller/products">
              <Button variant="outline" className="btn-glass">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="btn-hero">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerAddProduct;