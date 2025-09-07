import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  CreditCard, 
  Truck, 
  Mail,
  Smartphone,
  Globe,
  Eye,
  Lock,
  Save
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerSettings = () => {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    
    // Privacy & Security
    profileVisibility: 'public',
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Business Settings
    autoAcceptOrders: false,
    businessHours: 'always',
    deliveryRadius: '25',
    minOrderAmount: '0',
    
    // Payment Settings
    instantPayouts: true,
    paymentMethod: 'bank',
    currency: 'USD'
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Simulate save
    alert('Settings saved successfully!');
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
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account and business preferences</p>
              </div>
            </div>
            <Button onClick={handleSave} className="btn-hero">
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Navigation Menu */}
          <Card className="lg:col-span-1 p-6 glass h-fit">
            <h3 className="text-lg font-semibold mb-4">Settings Categories</h3>
            <div className="space-y-2">
              {[
                { icon: Bell, label: 'Notifications', active: true },
                { icon: Shield, label: 'Privacy & Security' },
                { icon: CreditCard, label: 'Payment Settings' },
                { icon: Truck, label: 'Business Settings' },
                { icon: Globe, label: 'Store Preferences' }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start ${item.active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Settings */}
            <Card className="p-6 glass">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Notification Preferences</h3>
                  <p className="text-muted-foreground">Choose how you want to be notified</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(value) => handleSwitchChange('emailNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified on your device</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(value) => handleSwitchChange('pushNotifications', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Order Alerts</p>
                      <p className="text-sm text-muted-foreground">Instant alerts for new orders</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.orderAlerts}
                    onCheckedChange={(value) => handleSwitchChange('orderAlerts', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Tips, promotions, and updates</p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(value) => handleSwitchChange('marketingEmails', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Performance and analytics summary</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(value) => handleSwitchChange('weeklyReports', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Privacy & Security */}
            <Card className="p-6 glass">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Privacy & Security</h3>
                  <p className="text-muted-foreground">Control your account security</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">Who can see your business profile</p>
                  </div>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSelectChange('profileVisibility', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="customers">Customers Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(value) => handleSwitchChange('twoFactorAuth', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(value) => handleSwitchChange('loginAlerts', value)}
                  />
                </div>
              </div>
            </Card>

            {/* Business Settings */}
            <Card className="p-6 glass">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Business Settings</h3>
                  <p className="text-muted-foreground">Configure your business operations</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Accept Orders</p>
                    <p className="text-sm text-muted-foreground">Automatically accept all incoming orders</p>
                  </div>
                  <Switch
                    checked={settings.autoAcceptOrders}
                    onCheckedChange={(value) => handleSwitchChange('autoAcceptOrders', value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <Select value={settings.businessHours} onValueChange={(value) => handleSelectChange('businessHours', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">24/7 Available</SelectItem>
                        <SelectItem value="business">Business Hours Only</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Delivery Radius (km)</Label>
                    <Input
                      type="number"
                      value={settings.deliveryRadius}
                      onChange={(e) => handleSelectChange('deliveryRadius', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Order Amount ($)</Label>
                  <Input
                    type="number"
                    value={settings.minOrderAmount}
                    onChange={(e) => handleSelectChange('minOrderAmount', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Payment Settings */}
            <Card className="p-6 glass">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-card rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Payment Settings</h3>
                  <p className="text-muted-foreground">Manage your payment preferences</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Instant Payouts</p>
                    <p className="text-sm text-muted-foreground">Receive payments immediately after order completion</p>
                  </div>
                  <Switch
                    checked={settings.instantPayouts}
                    onCheckedChange={(value) => handleSwitchChange('instantPayouts', value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payout Method</Label>
                    <Select value={settings.paymentMethod} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSettings;