import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ShoppingCart, Store, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-ecommerce.jpg';

const Landing = () => {
  const [userType, setUserType] = useState<'seller' | 'user'>('user');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern E-commerce Platform" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Premium E-Commerce
              </span>
              <br />
              <span className="text-foreground">Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in">
              Experience the future of online commerce with stunning interfaces for both sellers and buyers
            </p>
            
            {/* User Type Toggle */}
            <div className="flex justify-center mb-8">
              <div className="glass rounded-2xl p-2 flex">
                <button
                  onClick={() => setUserType('user')}
                  className={`px-6 py-3 rounded-xl font-medium transition-smooth ${
                    userType === 'user' 
                      ? 'bg-primary text-primary-foreground shadow-glow' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Users className="w-5 h-5 inline mr-2" />
                  I'm a Customer
                </button>
                <button
                  onClick={() => setUserType('seller')}
                  className={`px-6 py-3 rounded-xl font-medium transition-smooth ${
                    userType === 'seller' 
                      ? 'bg-secondary text-secondary-foreground shadow-glow' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Store className="w-5 h-5 inline mr-2" />
                  I'm a Seller
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={`/login?type=${userType}`}>
                <Button className="btn-hero text-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={`/register?type=${userType}`}>
                <Button variant="outline" className="btn-glass text-lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground">
              Built with modern technology and beautiful design
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Sellers */}
            <Card className="p-8 glass hover-lift group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
                  <BarChart3 className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Seller Dashboard</h3>
                <p className="text-muted-foreground">
                  Manage products, track revenue, and grow your business with our intuitive seller tools
                </p>
              </div>
            </Card>

            {/* For Customers */}
            <Card className="p-8 glass hover-lift group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
                  <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Shopping</h3>
                <p className="text-muted-foreground">
                  Browse products, scan QR codes, and enjoy seamless shopping experiences
                </p>
              </div>
            </Card>

            {/* Technology */}
            <Card className="p-8 glass hover-lift group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow-pulse">
                  <Store className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Modern Platform</h3>
                <p className="text-muted-foreground">
                  Built with cutting-edge technology for performance and scalability
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;