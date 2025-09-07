import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  DollarSign,
  Plus,
  Eye,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,847',
      change: '+12.5%',
      icon: DollarSign,
      color: 'bg-gradient-primary'
    },
    {
      title: 'Products',
      value: '48',
      change: '+3 this week',
      icon: Package,
      color: 'bg-gradient-secondary'
    },
    {
      title: 'Orders',
      value: '127',
      change: '+8 today',
      icon: ShoppingCart,
      color: 'bg-gradient-hero'
    },
    {
      title: 'Customers',
      value: '94',
      change: '+5 new',
      icon: Users,
      color: 'bg-gradient-card'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', product: 'Wireless Headphones', amount: '$299', status: 'Pending' },
    { id: '#1235', customer: 'Jane Smith', product: 'Smart Watch', amount: '$199', status: 'Accepted' },
    { id: '#1236', customer: 'Mike Johnson', product: 'Laptop Stand', amount: '$89', status: 'Shipped' },
    { id: '#1237', customer: 'Sarah Wilson', product: 'USB Cable', amount: '$29', status: 'Delivered' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Accepted': return 'text-primary bg-primary/10';
      case 'Shipped': return 'text-secondary bg-secondary/10';
      case 'Delivered': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Seller Dashboard</h1>
              <p className="text-muted-foreground text-lg">Welcome back! Here's your business overview</p>
            </div>
            <div className="flex gap-3">
              <Link to="/seller/products/add">
                <Button className="btn-hero">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Product
                </Button>
              </Link>
              <Link to="/seller/settings">
                <Button variant="outline" className="btn-glass">
                  <Settings className="w-5 h-5 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 glass hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-success font-medium">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center shadow-glow`}>
                  <stat.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 p-6 glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Revenue Overview</h3>
              <Button variant="outline" size="sm" className="btn-glass">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="h-64 bg-gradient-card rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Revenue chart will be displayed here</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 glass">
            <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/seller/products" className="block">
                <Button variant="outline" className="w-full justify-start btn-glass hover-lift">
                  <Package className="w-5 h-5 mr-3" />
                  Manage Products
                </Button>
              </Link>
              <Link to="/seller/orders" className="block">
                <Button variant="outline" className="w-full justify-start btn-glass hover-lift">
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  View Orders
                </Button>
              </Link>
              <Link to="/seller/profile" className="block">
                <Button variant="outline" className="w-full justify-start btn-glass hover-lift">
                  <Users className="w-5 h-5 mr-3" />
                  Update Profile
                </Button>
              </Link>
              <Link to="/seller/qr-code" className="block">
                <Button variant="outline" className="w-full justify-start btn-glass hover-lift">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  View QR Code
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mt-8 p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Orders</h3>
            <Link to="/seller/orders">
              <Button variant="outline" size="sm" className="btn-glass">
                View All Orders
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground font-medium">Order ID</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Customer</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Product</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/5 transition-smooth">
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">{order.customer}</td>
                    <td className="py-4 text-muted-foreground">{order.product}</td>
                    <td className="py-4 font-semibold">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;