import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance, { fetchWithAuth } from '../utils/api';
import { 
  CheckCircle2, 
  PlayCircle, 
  Clock, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp,
  FileText,
  MonitorPlay
} from 'lucide-react';
import './CourseDetailPage.css';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModules, setOpenModules] = useState({});
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const reqs = [axiosInstance.get(`/api/v1/courses/${id}`)];
        if (token) {
           reqs.push(fetchWithAuth('/api/v1/users/me').then(r => r.json()));
        }

        const resArr = await Promise.all(reqs);
        const courseRes = resArr[0];
        setCourse(courseRes.data.data);
        
        // Open the first module by default if it exists
        if (courseRes.data.data.modules && courseRes.data.data.modules.length > 0) {
          setOpenModules({ [courseRes.data.data.modules[0].id]: true });
        }

        // Kiểm tra xem đã đăng ký chưa
        if (resArr.length > 1) {
           const userRes = resArr[1];
           if (userRes && userRes.code === 200) {
              const enrollRes = await fetchWithAuth(`/api/v1/enrollments/check?studentId=${userRes.data.id}&courseId=${id}`);
              const enrollData = await enrollRes.json();
              if (enrollData.code === 200 && enrollData.data === true) {
                 setIsEnrolled(true);
              }
           }
        }
      } catch (err) {
        console.error('Error fetching course detail', err);
        setError('Không thể tải thông tin khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseDetail();
  }, [id]);

  const toggleModule = (moduleId) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="course-detail-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loading-spinner">Đang tải dữ liệu...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !course) {
    return (
      <>
        <Header />
        <div className="course-detail-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="error-message">{error || 'Không tìm thấy khóa học!'}</div>
        </div>
        <Footer />
      </>
    );
  }

  const learningPoints = course.whatYouWillLearn 
    ? course.whatYouWillLearn.split('\n').filter(p => p.trim() !== '') 
    : [];

  const features = course.features 
    ? course.features.split('\n').filter(f => f.trim() !== '') 
    : [];

  // Calculate total lessons
  const totalLessons = course.modules?.reduce((total, mod) => total + (mod.lessons?.length || 0), 0) || 0;

  return (
    <>
      <Header />
      <div className="course-detail-page">
        {/* Hero Section */}
        <section className="course-hero">
          <div className="container">
            <div className="course-hero-content">
              <div className="course-meta-top">
                <span className={`course-badge ${course.courseType === 'Live Online' ? 'badge-green' : 'badge-blue'}`}>
                  {course.courseType}
                </span>
                <span className="course-badge badge-purple">{course.category}</span>
                <span className="course-badge badge-grey">{course.level || 'Mọi cấp độ'}</span>
              </div>
              
              <h1>{course.title}</h1>
              <p className="course-hero-desc">{course.description}</p>
              
              <div className="course-stats">
                <div className="stat-item">
                  <Star className="icon" size={20} />
                  <span>{course.rating || '5.0'} Đánh giá</span>
                </div>
                <div className="stat-item">
                  <Users className="icon" size={20} />
                  <span>{course.studentCount?.toLocaleString() || '1,200+'} Học viên</span>
                </div>
                <div className="stat-item">
                  <FileText className="icon" size={20} />
                  <span>{totalLessons} Bài học</span>
                </div>
              </div>
              
              {course.instructorName && course.instructorName !== 'Đang cập nhật' && (
                <div className="instructor-info">
                  <div className="instructor-avatar">
                    {course.instructorName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Giảng viên</div>
                    <div style={{ fontWeight: 'bold' }}>{course.instructorName}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="course-hero-sidebar">
              <div className="enrollment-card">
                <img 
                  src={course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'} 
                  alt={course.title} 
                  className="enrollment-image"
                />
                
                <div className="price-section">
                  <div className="current-price">{course.price?.toLocaleString()} đ</div>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="original-price">{course.originalPrice.toLocaleString()} đ</div>
                  )}
                </div>
                
                {isEnrolled ? (
                  <button className="btn-enroll" style={{ backgroundColor: 'var(--success-color, #10b981)' }} onClick={() => {
                    const firstModuleId = course.modules && course.modules.length > 0 ? course.modules[0].id : null;
                    if (firstModuleId && !openModules[firstModuleId]) {
                      toggleModule(firstModuleId);
                    }
                    // scroll to content
                    document.querySelector('.course-content-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Đã Đăng Ký - Vào Học Tiếp
                  </button>
                ) : (
                  <button className="btn-enroll" onClick={() => navigate(localStorage.getItem('accessToken') ? `/checkout/${course.id}` : `/login?redirect=/checkout/${course.id}`)}>
                    Đăng Ký Học Ngay
                  </button>
                )}
                
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Đảm bảo hoàn tiền trong 7 ngày
                </div>
                
                <ul className="course-includes">
                  <li>
                    <MonitorPlay className="icon" size={18} />
                    <span>Truy cập trọn đời</span>
                  </li>
                  <li>
                    <Clock className="icon" size={18} />
                    <span>Học mọi lúc mọi nơi</span>
                  </li>
                  <li>
                    <FileText className="icon" size={18} />
                    <span>Tài liệu đính kèm</span>
                  </li>
                  {features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 className="icon" size={18} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="course-content-section">
          <div className="container">
            <div className="content-grid">
              <div className="content-main">
                {/* What you'll learn */}
                {learningPoints.length > 0 && (
                  <div className="content-block">
                    <h2>Bạn sẽ học được gì?</h2>
                    <ul className="learning-list">
                      {learningPoints.map((point, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={20} className="icon" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Curriculum */}
                <div className="content-block">
                  <h2>Nội dung khóa học</h2>
                  <div style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
                    {course.modules?.length || 0} chương • {totalLessons} bài học
                  </div>
                  
                  <div className="curriculum-accordion">
                    {course.modules?.map((module, idx) => {
                      const isOpen = openModules[module.id];
                      return (
                        <div key={module.id} className="curriculum-module">
                          <div className="module-header" onClick={() => toggleModule(module.id)}>
                            <div className="module-title-wrap">
                              {isOpen ? <ChevronUp className="module-icon" size={20} /> : <ChevronDown className="module-icon" size={20} />}
                              <span className="module-title">Chương {idx + 1}: {module.title}</span>
                            </div>
                            <div className="module-meta">
                              {module.lessons?.length || 0} bài học
                            </div>
                          </div>
                          
                          {isOpen && module.lessons && module.lessons.length > 0 && (
                            <div className="module-lessons">
                              {module.lessons.map((lesson, lIdx) => (
                                <div key={lesson.id} className="lesson-item">
                                    <div className="lesson-left">
                                      {lesson.lessonType === 'VIDEO' ? (
                                        <PlayCircle className="lesson-icon" size={18} />
                                      ) : (
                                        <FileText className="lesson-icon" size={18} />
                                      )}
                                      <span className="lesson-title">{lIdx + 1}. {lesson.title}</span>
                                      
                                      {(lesson.isPreview || isEnrolled) && lesson.lessonType === 'VIDEO' && (
                                        <button 
                                          className="preview-badge"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewVideo(lesson.videoUrl);
                                          }}
                                        >
                                          {isEnrolled ? 'Vào học' : 'Học thử'}
                                        </button>
                                      )}
                                    </div>
                                  <div className="lesson-duration">
                                    {lesson.duration || '00:00'}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    
                    {(!course.modules || course.modules.length === 0) && (
                      <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        Nội dung khóa học đang được cập nhật.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="content-sidebar">
                {/* Empty block for layout balancing since enrollment card is sticky in hero */}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="video-modal-overlay" onClick={() => setPreviewVideo(null)}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setPreviewVideo(null)}>×</button>
            <div className="video-wrapper">
              <iframe 
                src={(() => {
                  if (!previewVideo) return "";
                  const match = previewVideo.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
                  const videoId = match && match[1] ? match[1] : "";
                  return videoId ? `https://www.youtube.com/embed/${videoId}` : previewVideo;
                })()} 
                title="Video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default CourseDetailPage;
