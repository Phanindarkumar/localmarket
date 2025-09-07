import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Star,
  Edit,
  Shield,
  Gift
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    dateOfBirth: '1990-05-15',
    joinDate: '2023-01-15'
  });

  const stats = [
    { label: 'Orders Placed', value: '24', icon: ShoppingBag, color: 'text-primary' },
    { label: 'Favorites', value: '12', icon: Heart, color: 'text-destructive' },
    { label: 'Reviews Given', value: '18', icon: Star, color: 'text-warning' },
    { label: 'Reward Points', value: '340', icon: Gift, color: 'text-success' }
  ];

  const recentOrders = [
    { id: '#1234', product: 'Wireless Headphones', amount: '$299', status: 'Delivered', date: '2024-01-10' },
    { id: '#1235', product: 'Smart Watch', amount: '$199', status: 'Shipped', date: '2024-01-08' },
    { id: '#1236', product: 'Phone Case', amount: '$25', status: 'Processing', date: '2024-01-06' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-success bg-success/10';
      case 'Shipped': return 'text-primary bg-primary/10';
      case 'Processing': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
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
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and preferences</p>
              </div>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? "btn-hero" : "btn-glass"}
            >
              <Edit className="w-5 h-5 mr-2" />
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 p-6 glass">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-primary-foreground" />
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 btn-hero w-10 h-10 rounded-full"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-muted-foreground mb-4">{profileData.email}</p>
              
              <div className="flex justify-center mb-6">
                <Badge className="bg-gradient-secondary text-secondary-foreground">
                  <Shield className="w-4 h-4 mr-1" />
                  Verified User
                </Badge>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              {!isEditing && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-left">{profileData.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2 p-6 glass">
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 glass hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-card flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card className="mt-8 p-6 glass">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Orders</h3>
            <Button variant="outline" size="sm" className="btn-glass">
              View All Orders
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{order.product}</h4>
                    <p className="text-sm text-muted-foreground">Order {order.id} • {order.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="font-bold text-primary">{order.amount}</span>
                  <Badge className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;