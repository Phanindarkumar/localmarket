import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Check,
  X,
  Eye,
  Package,
  Truck,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const orders = [
    {
      id: '#1234',
      customer: 'John Doe',
      email: 'john@example.com',
      product: 'Wireless Headphones',
      quantity: 1,
      amount: '$299',
      status: 'Pending',
      date: '2024-01-15',
      address: '123 Main St, City, State 12345'
    },
    {
      id: '#1235',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      product: 'Smart Watch',
      quantity: 2,
      amount: '$398',
      status: 'Accepted',
      date: '2024-01-14',
      address: '456 Oak Ave, City, State 12345'
    },
    {
      id: '#1236',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      product: 'Laptop Stand',
      quantity: 1,
      amount: '$89',
      status: 'Shipped',
      date: '2024-01-13',
      address: '789 Pine Rd, City, State 12345'
    },
    {
      id: '#1237',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      product: 'USB Cable',
      quantity: 3,
      amount: '$87',
      status: 'Delivered',
      date: '2024-01-12',
      address: '321 Elm St, City, State 12345'
    },
    {
      id: '#1238',
      customer: 'David Brown',
      email: 'david@example.com',
      product: 'Phone Case',
      quantity: 1,
      amount: '$25',
      status: 'Cancelled',
      date: '2024-01-11',
      address: '654 Maple Dr, City, State 12345'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Accepted': return 'text-primary bg-primary/10';
      case 'Shipped': return 'text-secondary bg-secondary/10';
      case 'Delivered': return 'text-success bg-success/10';
      case 'Cancelled': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return Clock;
      case 'Accepted': return Package;
      case 'Shipped': return Truck;
      case 'Delivered': return CheckCircle;
      case 'Cancelled': return X;
      default: return Clock;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    alert(`Order ${orderId} status updated to: ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || order.status.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { value: 'accepted', label: 'Accepted', count: orders.filter(o => o.status === 'Accepted').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length }
  ];

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
                <h1 className="text-3xl font-bold">Orders Management</h1>
                <p className="text-muted-foreground">View and manage all your customer orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by customer, order ID, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedFilter === option.value ? "default" : "outline"}
                className={selectedFilter === option.value ? "btn-hero" : "btn-glass"}
                onClick={() => setSelectedFilter(option.value)}
              >
                {option.label} ({option.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <Card key={order.id} className="p-6 glass hover-lift">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <StatusIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{order.id}</h3>
                        <Badge className={`${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium">Customer:</span> {order.customer}</p>
                        <p><span className="font-medium">Product:</span> {order.product} (x{order.quantity})</p>
                        <p><span className="font-medium">Date:</span> {order.date}</p>
                        <p><span className="font-medium">Address:</span> {order.address}</p>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-2xl font-bold text-primary">{order.amount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    {order.status === 'Pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="btn-hero"
                          onClick={() => handleStatusUpdate(order.id, 'Accepted')}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="btn-glass text-destructive hover:text-destructive"
                          onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'Accepted' && (
                      <Button 
                        size="sm" 
                        className="btn-hero"
                        onClick={() => handleStatusUpdate(order.id, 'Shipped')}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Mark as Shipped
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" className="btn-glass">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'You don\'t have any orders yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrders;