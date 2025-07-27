import { Separator } from './ui/separator';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    Platform: [
      { label: 'Portfolio Analytics', href: '#' },
      { label: 'Market Intelligence', href: '#' },
      { label: 'Risk Management', href: '#' },
      { label: 'API Access', href: '#' }
    ],
    Company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' }
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Webinars', href: '#' },
      { label: 'Support Center', href: '#' }
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Compliance', href: '#' }
    ]
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">DF</span>
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                DeepFinance
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Advanced investment analytics platform powered by cutting-edge 3D visualization 
              technology for professional investors worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@deepfinance.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-primary" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-smooth text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 DeepFinance. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <span>Regulated by SEC & FINRA</span>
            <span>SIPC Protected</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-8 p-4 bg-muted/20 rounded-lg border border-border/30">
          <p className="text-xs text-muted-foreground">
            <strong>Investment Disclaimer:</strong> All investments involve risk of loss. Past performance 
            is not indicative of future results. Please consult with a financial advisor before making 
            investment decisions. DeepFinance is a registered investment advisor.
          </p>
        </div>
      </div>
    </footer>
  );
};