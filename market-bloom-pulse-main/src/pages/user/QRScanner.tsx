import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  QrCode, 
  Camera, 
  Upload,
  Scan,
  CheckCircle,
  AlertCircle,
  Store
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);
    
    // Simulate scanning process
    setTimeout(() => {
      // Simulate successful scan
      const mockSellerData = {
        sellerId: 'seller_123',
        businessName: 'TechStore Pro',
        category: 'Electronics'
      };
      
      setScanResult(JSON.stringify(mockSellerData));
      setIsScanning(false);
    }, 3000);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate QR code reading from image
      setTimeout(() => {
        const mockSellerData = {
          sellerId: 'seller_456',
          businessName: 'Fashion Hub',
          category: 'Fashion'
        };
        setScanResult(JSON.stringify(mockSellerData));
      }, 1000);
    }
  };

  const viewSellerProducts = () => {
    if (scanResult) {
      const sellerData = JSON.parse(scanResult);
      // Navigate to seller-specific products page
      navigate(`/user/seller/${sellerData.sellerId}/products`);
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setError(null);
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link to="/user/dashboard">
              <Button variant="outline" size="icon" className="btn-glass">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">QR Code Scanner</h1>
              <p className="text-muted-foreground">Scan seller QR codes to discover their products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Scanner Card */}
          <Card className="p-8 glass text-center mb-8">
            {!isScanning && !scanResult && !error && (
              <div>
                <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <QrCode className="w-12 h-12 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Ready to Scan</h2>
                <p className="text-muted-foreground mb-8">
                  Point your camera at a seller's QR code to view their products
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={startScanning} className="btn-hero">
                    <Camera className="w-5 h-5 mr-2" />
                    Start Camera
                  </Button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="qr-upload"
                    />
                    <Button variant="outline" className="btn-glass w-full">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isScanning && (
              <div>
                <div className="w-64 h-64 border-4 border-primary border-dashed rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <div className="relative">
                    <Camera className="w-16 h-16 text-primary" />
                    <div className="absolute inset-0 border-2 border-primary rounded-lg animate-ping"></div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Scanning...</h2>
                <p className="text-muted-foreground mb-6">
                  Position the QR code within the frame
                </p>
                <Button onClick={stopScanning} variant="outline" className="btn-glass">
                  Cancel Scan
                </Button>
              </div>
            )}

            {scanResult && (
              <div>
                <div className="w-24 h-24 bg-gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-secondary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-success">Scan Successful!</h2>
                
                {/* Seller Info */}
                <Card className="p-6 glass mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center">
                      <Store className="w-8 h-8 text-foreground" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold">
                        {JSON.parse(scanResult).businessName}
                      </h3>
                      <p className="text-muted-foreground">
                        {JSON.parse(scanResult).category}
                      </p>
                    </div>
                  </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={viewSellerProducts} className="btn-hero">
                    <Store className="w-5 h-5 mr-2" />
                    View Products
                  </Button>
                  <Button onClick={resetScanner} variant="outline" className="btn-glass">
                    <Scan className="w-5 h-5 mr-2" />
                    Scan Another
                  </Button>
                </div>
              </div>
            )}

            {error && (
              <div>
                <div className="w-24 h-24 bg-gradient-card rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-12 h-12 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-destructive">Scan Failed</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={resetScanner} className="btn-hero">
                  Try Again
                </Button>
              </div>
            )}
          </Card>

          {/* Instructions */}
          <Card className="p-6 glass">
            <h3 className="text-lg font-semibold mb-4">How to Scan QR Codes</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">1</span>
                </div>
                <p>Ask the seller to show you their unique QR code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">2</span>
                </div>
                <p>Click "Start Camera" and point your device at the QR code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">3</span>
                </div>
                <p>Once scanned, you'll be redirected to their product catalog</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-semibold text-xs">4</span>
                </div>
                <p>Alternatively, upload an image of the QR code from your gallery</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;