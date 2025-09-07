import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  QrCode, 
  Download, 
  Share2,
  Copy,
  Store,
  Users,
  Eye,
  Smartphone,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerQRCode = () => {
  const [qrSize, setQrSize] = useState('medium');
  
  const businessInfo = {
    name: 'TechStore Pro',
    category: 'Electronics',
    sellerId: 'seller_123',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=seller_123_techstore_pro'
  };

  const qrSizes = {
    small: { size: '200x200', dimension: 200, label: 'Small (200px)' },
    medium: { size: '400x400', dimension: 400, label: 'Medium (400px)' },
    large: { size: '800x800', dimension: 800, label: 'Large (800px)' }
  };

  const generateQRUrl = (size: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSizes[size as keyof typeof qrSizes].size}&data=${businessInfo.sellerId}_${businessInfo.name.toLowerCase().replace(/\s+/g, '_')}`;
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = generateQRUrl(qrSize);
    link.download = `${businessInfo.name.toLowerCase().replace(/\s+/g, '_')}_qr_code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${businessInfo.name} - QR Code`,
          text: `Scan this QR code to view products from ${businessInfo.name}`,
          url: generateQRUrl(qrSize)
        });
      } catch (error) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateQRUrl(qrSize));
    alert('QR code link copied to clipboard!');
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${businessInfo.name} - QR Code</title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; padding: 20px; }
              .qr-container { display: inline-block; border: 2px solid #ddd; padding: 20px; border-radius: 10px; }
              .business-info { margin-top: 20px; }
              .instructions { margin-top: 30px; font-size: 14px; color: #666; max-width: 400px; margin-left: auto; margin-right: auto; }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <img src="${generateQRUrl(qrSize)}" alt="QR Code" />
              <div class="business-info">
                <h2>${businessInfo.name}</h2>
                <p>${businessInfo.category}</p>
              </div>
            </div>
            <div class="instructions">
              <p><strong>How to use:</strong></p>
              <p>1. Show this QR code to customers</p>
              <p>2. They scan it with their phone camera or QR scanner app</p>
              <p>3. They'll be directed to your product catalog</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Link to="/seller/dashboard">
              <Button variant="outline" size="icon" className="btn-glass">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Your QR Code</h1>
              <p className="text-muted-foreground">Share your unique QR code with customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* QR Code Display */}
          <Card className="lg:col-span-2 p-8 glass text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{businessInfo.name}</h2>
              <p className="text-muted-foreground">{businessInfo.category}</p>
            </div>

            {/* QR Code */}
            <div className="mb-8">
              <div className="inline-block p-6 bg-white rounded-3xl shadow-elegant">
                <img 
                  src={generateQRUrl(qrSize)} 
                  alt="Business QR Code"
                  className="mx-auto"
                  style={{ 
                    width: `${Math.min(qrSizes[qrSize as keyof typeof qrSizes].dimension, 300)}px`,
                    height: `${Math.min(qrSizes[qrSize as keyof typeof qrSizes].dimension, 300)}px`
                  }}
                />
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">QR Code Size:</p>
              <div className="flex justify-center gap-2">
                {Object.entries(qrSizes).map(([key, value]) => (
                  <Button
                    key={key}
                    variant={qrSize === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQrSize(key)}
                    className={qrSize === key ? "btn-hero" : "btn-glass"}
                  >
                    {value.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={downloadQR} className="btn-hero">
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>
              <Button onClick={shareQR} variant="outline" className="btn-glass">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button onClick={copyToClipboard} variant="outline" className="btn-glass">
                <Copy className="w-5 h-5 mr-2" />
                Copy Link
              </Button>
              <Button onClick={printQR} variant="outline" className="btn-glass">
                <Printer className="w-5 h-5 mr-2" />
                Print
              </Button>
            </div>
          </Card>

          {/* Instructions & Stats */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold mb-4">QR Code Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-medium">Total Scans</span>
                  </div>
                  <span className="text-2xl font-bold">142</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-secondary" />
                    <span className="font-medium">New Customers</span>
                  </div>
                  <span className="text-2xl font-bold">38</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-success" />
                    <span className="font-medium">This Week</span>
                  </div>
                  <span className="text-2xl font-bold">23</span>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold mb-4">How to Use Your QR Code</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-semibold text-xs">1</span>
                  </div>
                  <p>Display your QR code prominently in your store or business location</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-semibold text-xs">2</span>
                  </div>
                  <p>Customers scan the code with their smartphone camera or QR app</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-semibold text-xs">3</span>
                  </div>
                  <p>They're instantly directed to your product catalog</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-semibold text-xs">4</span>
                  </div>
                  <p>Track scans and new customers through your analytics</p>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 glass">
              <h3 className="text-lg font-semibold mb-4">Marketing Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span>Add QR code to business cards and flyers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-secondary" />
                  <span>Place near your cash register or entrance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-success" />
                  <span>Share on social media and website</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-warning" />
                  <span>Print on receipts and packaging</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerQRCode;