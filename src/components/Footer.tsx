import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border mt-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="Tourism Insight" className="object-none" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              관광 컨설팅 및 데이터 분석 전문 기업
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/company" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/news" className="hover:text-accent transition-colors">Signals</Link></li>
              <li><Link to="/intelligence" className="hover:text-accent transition-colors">Intelligence</Link></li>
              <li><Link to="/portfolio" className="hover:text-accent transition-colors">Impact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent" />
                서울특별시 서초구 강남대로30길 40, 202호
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent" />
                010-7179-7743 / 02-3445-5333
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent" />
                service@tourisminsight.co.kr / touinssa@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2022 Tourism Insight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
