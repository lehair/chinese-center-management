import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import axiosInstance from '../utils/api';
import './Sections.css';

const CoursesSection = ({ hideHeader = false }) => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/api/v1/courses');
        setCourses(res.data.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };
    fetchCourses();
  }, []);

  const getTagClass = (courseType, category) => {
    if (courseType === 'Live Online') return 'badge-green';
    if (category === 'Luyện Thi HSK') return 'badge-purple';
    return 'badge-blue';
  };

  const getButtonClass = (courseType) => {
    if (courseType === 'Live Online') return 'btn-dark-red';
    return 'btn-light-grey';
  };

  return (
    <section id="courses" className="section courses-section" style={{ background: hideHeader ? 'transparent' : 'var(--bg-color)' }}>
      <div className="container">
        {!hideHeader && (
          <div className="section-header text-center">
            <h2 className="heading-2">Các Khóa Học Tiêu Biểu</h2>
            <p className="text-muted">Lựa chọn khóa học phù hợp với mục tiêu của bạn.</p>
          </div>
        )}

        <div className="courses-grid-new">
          {(categoryFilter ? courses.filter(c => c.category === categoryFilter) : courses).map((course) => {
            const isPopular = course.courseType === 'Live Online';
            const featuresList = course.features ? course.features.split('\n').filter(f => f.trim() !== '') : [];
            const shortDesc = course.description && course.description.length > 80 
              ? course.description.substring(0, 80) + '...' 
              : course.description;
            
            return (
              <div key={course.id} className="course-card-premium glass-panel">
                <div className="course-card-image">
                  <img src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'} alt={course.title} />
                  
                  <div className={`course-badge ${getTagClass(course.courseType, course.category)}`}>
                    {course.courseType || course.category || 'Course'}
                  </div>
                  
                  <div className="course-price-badge">
                    {course.originalPrice && course.originalPrice > course.price ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: '1.2' }}>
                        <span style={{ textDecoration: 'line-through', fontSize: '0.75rem', opacity: 0.8 }}>
                          {course.originalPrice.toLocaleString()} đ
                        </span>
                        <span style={{ fontWeight: 'bold' }}>{course.price?.toLocaleString()} đ</span>
                      </div>
                    ) : (
                      <span>{course.price?.toLocaleString()} đ</span>
                    )}
                  </div>
                </div>
                
                <div className="course-card-content">
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-desc" style={{ minHeight: '45px' }}>{shortDesc}</p>
                  
                  {course.courseType === 'Live Online' && (
                    <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(162, 28, 36, 0.05)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Giảng viên:</span>
                        <span>{course.instructorName || 'Đang cập nhật'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>Lịch học:</span>
                        <span>{course.schedule || '20:00 - 21:30 (T2,4,6)'}</span>
                      </div>
                    </div>
                  )}

                  <ul className="course-features">
                    {featuresList.map((feature, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={18} className="feature-check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`btn-course-action ${getButtonClass(course.courseType)}`}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
