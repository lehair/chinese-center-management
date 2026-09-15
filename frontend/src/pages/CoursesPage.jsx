import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoursesSection from '../components/CoursesSection';
import '../components/Sections.css';

const CoursesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Danh sách Khóa học - Tiếng Trung 5s';
  }, []);

  return (
    <div className="courses-page" style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '40px' }}>
            <h1 className="heading-2" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
              Tất Cả <span className="text-gradient">Khóa Học</span>
            </h1>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Lựa chọn lộ trình học tập phù hợp nhất với mục tiêu của bạn. Từ người mới bắt đầu đến thi lấy chứng chỉ quốc tế.
            </p>
          </div>
          
          <CoursesSection hideHeader={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
