import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Store, Users } from 'lucide-react';

type AuthMode = 'login' | 'register';
type UserType = 'seller' | 'user';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [userType, setUserType] = useState<UserType>('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const type = searchParams.get('type') as UserType;
    const authMode = window.location.pathname.includes('register') ? 'register' : 'login';
    
    // Debug logging
    console.log('Current pathname:', window.location.pathname);
    console.log('Detected auth mode:', authMode);
    console.log('User type from URL:', type);
    
    if (type) setUserType(type);
    setMode(authMode);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate authentication
    if (mode === 'login') {
      navigate(userType === 'seller' ? '/seller/dashboard' : '/user/dashboard');
    } else {
      // After successful registration, redirect to login
      navigate(`/login?type=${userType}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-smooth">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="p-8 glass shadow-elegant animate-scale-in">
          {/* Debug indicator - remove after testing */}
          <div className="mb-4 p-2 bg-secondary/20 rounded text-center text-sm">
            Mode: <strong>{mode}</strong> | Type: <strong>{userType}</strong>
          </div>
          
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              userType === 'seller' ? 'bg-gradient-secondary' : 'bg-gradient-primary'
            }`}>
              {userType === 'seller' ? (
                <Store className="w-8 h-8 text-foreground" />
              ) : (
                <Users className="w-8 h-8 text-foreground" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' ? 'Sign in to your' : 'Set up your'} {userType} account
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="flex mb-6">
            <div className="glass rounded-xl p-1 flex w-full">
              <button
                onClick={() => setUserType('user')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-smooth text-sm ${
                  userType === 'user' 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Customer
              </button>
              <button
                onClick={() => setUserType('seller')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-smooth text-sm ${
                  userType === 'seller' 
                    ? 'bg-secondary text-secondary-foreground shadow-glow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Store className="w-4 h-4 inline mr-2" />
                Seller
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className={`w-full btn-hero ${userType === 'seller' ? 'bg-gradient-secondary' : 'bg-gradient-primary'}`}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <Link
                to={mode === 'login' ? `/register?type=${userType}` : `/login?type=${userType}`}
                className="ml-2 text-primary hover:text-primary-glow font-medium transition-smooth"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;