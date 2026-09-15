import React from 'react';
import { Target, Users, Award } from 'lucide-react';
import './Sections.css';

const AboutSection = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="heading-2">Về Trung Tâm Hán Ngữ</h2>
            <p className="text-muted mb-4">
              Chúng tôi tự hào là đơn vị tiên phong trong lĩnh vực đào tạo tiếng Trung chất lượng cao. Với phương pháp giảng dạy hiện đại, lộ trình cá nhân hóa và đội ngũ giảng viên tận tâm, chúng tôi cam kết mang lại trải nghiệm học tập tốt nhất.
            </p>
            <ul className="about-features">
              <li>
                <div className="feature-icon"><Target size={24} /></div>
                <div>
                  <h4 className="heading-3">Lộ trình rõ ràng</h4>
                  <p className="text-muted">Đạt chứng chỉ HSK với lộ trình tối ưu nhất.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon"><Users size={24} /></div>
                <div>
                  <h4 className="heading-3">Cộng đồng học thuật</h4>
                  <p className="text-muted">Giao lưu và thực hành cùng hàng ngàn học viên.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon"><Award size={24} /></div>
                <div>
                  <h4 className="heading-3">Chất lượng đảm bảo</h4>
                  <p className="text-muted">Cam kết chuẩn đầu ra sau mỗi khóa học.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="about-image-wrapper">
            <div className="glass-panel about-image-card" style={{ padding: 0, overflow: 'hidden' }}>
              <img 
                src="/about-center.jpg" 
                alt="Hình ảnh Trung Tâm" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="about-image-placeholder" style={{ display: 'none' }}>
                <span className="text-gradient">Chưa có ảnh (Vui lòng thêm about-center.jpg)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
