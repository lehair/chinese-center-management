import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, MessageCircle, Share2, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="logo mb-4" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.jpg" alt="Tiếng Trung 5s Logo" className="logo-img" style={{ height: '32px', width: 'auto', borderRadius: '50%', marginRight: '10px' }} />
              <span className="logo-text text-gradient">Tiếng Trung 5s</span>
            </div>
            <p className="text-muted mb-4">
              Nền tảng đào tạo tiếng Trung trực tuyến hàng đầu, mang đến cho bạn trải nghiệm học tập đỉnh cao và hiệu quả vượt trội.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><Globe size={20} /></a>
              <a href="#" className="social-icon"><MessageCircle size={20} /></a>
              <a href="#" className="social-icon"><Share2 size={20} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="heading-3 mb-4">Liên Kết Nhanh</h4>
            <ul className="footer-links">
              <li><Link to="/about">Về chúng tôi</Link></li>
              <li><Link to="/courses">Danh sách khóa học</Link></li>
              <li><Link to="/lich-khai-giang">Lịch khai giảng</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="heading-3 mb-4">Hỗ Trợ Học Viên</h4>
            <ul className="footer-links">
              <li><a href="#">Hướng dẫn đăng ký</a></li>
              <li><a href="#">Chính sách hoàn học phí</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Bảo mật thông tin</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="heading-3 mb-4">Liên Hệ</h4>
            <ul className="footer-contact">
              <li><MapPin size={18} className="contact-icon" /> 123 Đường Học Tập, Hà Nội</li>
              <li><Phone size={18} className="contact-icon" /> 1900 1234</li>
              <li><Mail size={18} className="contact-icon" /> support@hanngu.edu.vn</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom text-center">
          <p className="text-muted">&copy; {new Date().getFullYear()} Trung Tâm Hán Ngữ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
