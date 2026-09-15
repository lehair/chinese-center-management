import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './BannerCarousel.css';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/notifications/banners');
        if (res.data && res.data.data) {
          setBanners(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải banners", error);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(nextSlide, 5000); // Auto slide every 5s
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="banner-carousel">
      <button className="nav-btn prev-btn" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>

      <div className="banner-content-wrapper">
        {banners.map((item, index) => (
          <div 
            key={item.id} 
            className={`banner-slide ${index === currentIndex ? 'active' : 'inactive'}`}
          >
            <div className="banner-left">
              <h2 className="banner-title">{item.title}</h2>
              <p className="banner-desc">{item.message}</p>
              {item.actionUrl && (
                <a href={item.actionUrl} className="btn btn-primary banner-action" target="_blank" rel="noreferrer">
                  XEM CHI TIẾT
                </a>
              )}
            </div>
            <div className="banner-right">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="banner-image" />
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="nav-btn next-btn" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
