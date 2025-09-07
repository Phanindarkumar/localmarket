import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Bell, 
  ShoppingCart, 
  Package, 
  Truck, 
  Star,
  Gift,
  CheckCheck,
  Trash2,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserNotifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const notifications = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #1234 for Wireless Headphones has been shipped and is on its way!',
      time: '1 hour ago',
      read: false,
      icon: Truck,
      color: 'text-primary bg-primary/10'
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Confirmed',
      message: 'TechStore Pro has confirmed your order for Smart Watch worth $199',
      time: '3 hours ago',
      read: false,
      icon: ShoppingCart,
      color: 'text-success bg-success/10'
    },
    {
      id: '3',
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your Yoga Mat Premium is out for delivery and will arrive today',
      time: '5 hours ago',
      read: true,
      icon: Package,
      color: 'text-secondary bg-secondary/10'
    },
    {
      id: '4',
      type: 'promo',
      title: 'Special Offer',
      message: 'Save 20% on Electronics this weekend! Use code WEEKEND20',
      time: '1 day ago',
      read: true,
      icon: Gift,
      color: 'text-warning bg-warning/10'
    },
    {
      id: '5',
      type: 'review',
      title: 'Review Reminder',
      message: 'How was your experience with USB Cable from TechStore Pro? Leave a review!',
      time: '2 days ago',
      read: true,
      icon: Star,
      color: 'text-muted-foreground bg-muted/10'
    },
    {
      id: '6',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #1230 has been successfully delivered. Enjoy your purchase!',
      time: '3 days ago',
      read: true,
      icon: Package,
      color: 'text-success bg-success/10'
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { id: 'delivery', label: 'Delivery', count: notifications.filter(n => n.type === 'delivery').length },
    { id: 'promo', label: 'Offers', count: notifications.filter(n => n.type === 'promo').length }
  ];

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : selectedFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === selectedFilter);

  const markAllAsRead = () => {
    alert('All notifications marked as read');
  };

  const clearAll = () => {
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
              <Link to="/user/dashboard">
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
                <p className="text-muted-foreground">Stay updated with your orders and offers</p>
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
                        {notification.type === 'order' && (
                          <Link to="/user/orders">
                            <Button size="sm" className="btn-hero">
                              View Order
                            </Button>
                          </Link>
                        )}
                        {notification.type === 'promo' && (
                          <Link to="/user/dashboard">
                            <Button size="sm" className="btn-hero">
                              Shop Now
                            </Button>
                          </Link>
                        )}
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

export default UserNotifications;