import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Camera, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Star,
  Users,
  Package,
  TrendingUp,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: 'TechStore Pro',
    ownerName: 'John Smith',
    email: 'john@techstore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, City, State 12345',
    website: 'www.techstore.com',
    description: 'Premium electronics and gadgets with excellent customer service and competitive prices.',
    category: 'Electronics',
    establishedYear: '2020'
  });

  const stats = [
    { label: 'Total Sales', value: '$45,670', icon: TrendingUp, color: 'text-success' },
    { label: 'Products Listed', value: '48', icon: Package, color: 'text-primary' },
    { label: 'Happy Customers', value: '342', icon: Users, color: 'text-secondary' },
    { label: 'Rating', value: '4.8/5', icon: Star, color: 'text-warning' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate save action
    alert('Profile updated successfully!');
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
                <h1 className="text-3xl font-bold">Business Profile</h1>
                <p className="text-muted-foreground">Manage your business information and branding</p>
              </div>
            </div>
            <Button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? "btn-hero" : "btn-glass"}
            >
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
                <div className="w-32 h-32 bg-gradient-primary rounded-3xl flex items-center justify-center">
                  <Store className="w-16 h-16 text-primary-foreground" />
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 btn-hero w-10 h-10"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{profileData.businessName}</h2>
              <p className="text-muted-foreground mb-4">Est. {profileData.establishedYear}</p>
              
              <div className="flex justify-center mb-4">
                <Badge className="bg-gradient-secondary text-secondary-foreground">
                  {profileData.category}
                </Badge>
              </div>

              <div className="flex items-center justify-center gap-2 text-warning mb-6">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">4.8</span>
                <span className="text-muted-foreground">(156 reviews)</span>
              </div>

              {!isEditing && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{profileData.website}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Details Form */}
          <Card className="lg:col-span-2 p-6 glass">
            <h3 className="text-xl font-semibold mb-6">Business Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  value={profileData.businessName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  value={profileData.ownerName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Business Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={profileData.category}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="address">Business Address</Label>
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

            <div className="mt-6 space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                name="description"
                value={profileData.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Describe your business, products, and what makes you unique..."
              />
            </div>

            {isEditing && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Business Logo</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">Upload your business logo</p>
                    <Button variant="outline" className="btn-glass">
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Business Stats */}
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
      </div>
    </div>
  );
};

export default SellerProfile;