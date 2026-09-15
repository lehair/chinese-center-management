import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';
import axiosInstance from '../utils/api';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/api/v1/categories');
        setCategories(res.data.data);
      } catch (error) {
        console.error('Error fetching categories in header:', error);
      }
    };
    fetchCategories();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled glass-panel' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.jpg" alt="Tiếng Trung 5s Logo" className="logo-img" style={{ height: '32px', width: 'auto', borderRadius: '50%', marginRight: '10px' }} />
          <span className="logo-text text-gradient">Tiếng Trung 5s</span>
        </Link>
        
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/about">Giới thiệu</Link></li>
            <li className="dropdown">
              <Link to="/courses">Khóa học</Link>
              <ul className="dropdown-menu">
                {categories.length > 0 ? categories.map(cat => (
                  <li key={cat.id}><Link to={`/courses?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link></li>
                )) : (
                  <li><Link to="/courses">Đang tải...</Link></li>
                )}
              </ul>
            </li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          {localStorage.getItem('accessToken') ? (
            <Link to="/profile" title="Thông tin tài khoản" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 10px rgba(14, 165, 233, 0.3)', overflow: 'hidden' }}>
              {localStorage.getItem('avatarUrl') ? (
                <img src={localStorage.getItem('avatarUrl')} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={20} />
              )}
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Bắt đầu học
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
