import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Bell, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Star,
  Settings,
  CheckCheck,
  Trash2,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerNotifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Sarah Wilson placed an order for Wireless Headphones worth $299',
      time: '2 minutes ago',
      read: false,
      icon: ShoppingCart,
      color: 'text-primary bg-primary/10'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $199 for order #1235 has been processed successfully',
      time: '15 minutes ago',
      read: false,
      icon: DollarSign,
      color: 'text-success bg-success/10'
    },
    {
      id: '3',
      type: 'review',
      title: 'New Product Review',
      message: 'John Doe left a 5-star review for your Smart Watch',
      time: '1 hour ago',
      read: true,
      icon: Star,
      color: 'text-warning bg-warning/10'
    },
    {
      id: '4',
      type: 'order',
      title: 'Order Update Required',
      message: 'Customer requested delivery address change for order #1234',
      time: '2 hours ago',
      read: true,
      icon: Package,
      color: 'text-secondary bg-secondary/10'
    },
    {
      id: '5',
      type: 'system',
      title: 'Product Stock Alert',
      message: 'Wireless Headphones is running low on stock (3 items remaining)',
      time: '3 hours ago',
      read: true,
      icon: Package,
      color: 'text-destructive bg-destructive/10'
    },
    {
      id: '6',
      type: 'payment',
      title: 'Weekly Payout Processed',
      message: 'Your weekly earnings of $1,245 have been transferred to your account',
      time: '1 day ago',
      read: true,
      icon: DollarSign,
      color: 'text-success bg-success/10'
    },
    {
      id: '7',
      type: 'order',
      title: 'Order Cancelled',
      message: 'Customer cancelled order #1230 for Laptop Stand worth $89',
      time: '2 days ago',
      read: true,
      icon: ShoppingCart,
      color: 'text-muted-foreground bg-muted/10'
    },
    {
      id: '8',
      type: 'review',
      title: 'New Product Review',
      message: 'Mike Johnson left a 4-star review for your USB Cable',
      time: '3 days ago',
      read: true,
      icon: Star,
      color: 'text-warning bg-warning/10'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { id: 'review', label: 'Reviews', count: notifications.filter(n => n.type === 'review').length }
  ];

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : selectedFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === selectedFilter);

  const markAllAsRead = () => {
    // Simulate marking all as read
    alert('All notifications marked as read');
  };

  const clearAll = () => {
    // Simulate clearing all notifications
    if (confirm('Are you sure you want to clear all notifications?')) {
      alert('All notifications cleared');
    }
  };

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
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  Notifications
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Badge className="bg-primary text-primary-foreground">
                      {notifications.filter(n => !n.read).length} new
                    </Badge>
                  )}
                </h1>
                <p className="text-muted-foreground">Stay updated with your business activities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={markAllAsRead} variant="outline" className="btn-glass">
                <CheckCheck className="w-5 h-5 mr-2" />
                Mark All Read
              </Button>
              <Button onClick={clearAll} variant="outline" className="btn-glass text-destructive hover:text-destructive">
                <Trash2 className="w-5 h-5 mr-2" />
                Clear All
              </Button>
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <Card className="lg:col-span-1 p-6 glass h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Filter Notifications</h3>
            </div>
            <div className="space-y-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="ghost"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`w-full justify-between ${
                    selectedFilter === filter.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="capitalize">{filter.label}</span>
                  <Badge variant="outline" className="ml-2">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </Card>

          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card className="p-12 glass text-center">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
                <p className="text-muted-foreground">
                  {selectedFilter === 'all' 
                    ? "You're all caught up!" 
                    : `No ${selectedFilter} notifications found.`}
                </p>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-6 glass hover-lift cursor-pointer transition-smooth ${
                    !notification.read ? 'border-primary/50 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${notification.color}`}>
                      <notification.icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                          <span className="text-muted-foreground text-sm whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{notification.message}</p>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="btn-hero">
                          View Details
                        </Button>
                        {!notification.read && (
                          <Button size="sm" variant="outline" className="btn-glass">
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerNotifications;