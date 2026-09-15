import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import './Sections.css';

const mockTestimonials = [
  {
    id: 1,
    name: 'Đỗ Văn Ri',
    course: 'Tiếng Trung Giao Tiếp',
    text: 'Siuu!',
    avatar: 'https://assets.goal.com/images/v3/blt7f03c0be37ff2ded/cc0acdf7dc2968346cc8d86dc76b6763cbb8b8dd.jpg'
  },
  {
    id: 2,
    name: 'T1 Faker',
    course: 'Tiếng Trung Giao Tiếp',
    text: 'Là một người Hàn Quốc học tiếng Trung bằng tiếng Việt, mặc dù tôi không biết tiếng Việt nhưng sau một khoá học tôi đã thành thạo cả 3 thứ tiếng. Cảm ơn Tiếng Trung 5s!',
    avatar: 'https://cdn2.fptshop.com.vn/unsafe/800x0/faker_la_ai_1_f11b796110.jpg'
  },
  {
    id: 3,
    name: 'J97',
    course: 'Tiếng Trung Thương Mại',
    text: 'Khóa học thực sự bổ ích cho công việc của mình. Mình đã tự tin đàm phán với đối tác Trung Quốc.',
    avatar: 'https://i.pinimg.com/736x/fa/fc/4b/fafc4b1052deae2438681e45ff7335a5.jpg'
  },
  {
    id: 4,
    name: 'Sơn Tùng M-TP',
    course: 'Tiếng Trung Giao Tiếp',
    text: 'Âm nhạc không biên giới, ngôn ngữ cũng vậy. Nhờ Tiếng Trung 5s, mình đã có thể tự tin hát bài "Chắc Ai Đó Sẽ Về" bản tiếng Trung cực kỳ mượt mà. Đỉnh của chóp!',
    avatar: 'https://photo-zmp3.zadn.vn/avatars/5/9/6/9/59696c9dba7a914d587d886049c10df6.jpg'
  },
  {
    id: 5,
    name: 'Messi',
    course: 'Luyện thi HSK 4',
    text: 'Que mirás bobo? Học tiếng Trung xong đi sang giải Trung Quốc đá dưỡng già là hợp lý nhất. 10 điểm cho chất lượng giảng dạy!',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg'
  },
  {
    id: 6,
    name: 'Đen Vâu',
    course: 'Tiếng Trung Thương Mại',
    text: 'Mang tiền về cho mẹ, đừng mang ưu phiền về cho mẹ. Học tiếng Trung xong chốt deal liên tục, doanh thu tăng vọt, mẹ tôi rất vui.',
    avatar: 'https://thanhnien.mediacdn.vn/Uploaded/duyphuc/2021_12_30/hinh-1-5084.jpg'
  }
];

const TestimonialSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockTestimonials.length / itemsPerPage);

  const currentItems = mockTestimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section className="section testimonial-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-2">Cảm Nhận Học Viên</h2>
          <p className="text-muted">Lắng nghe những chia sẻ từ các học viên đã thành công.</p>
        </div>

        <div className="grid-cards" style={{ minHeight: '300px' }}>
          {currentItems.map((item) => (
            <div key={item.id} className="glass-panel testimonial-card">
              <Quote size={48} className="quote-icon" />
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ overflow: 'hidden', padding: 0 }}>
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="heading-3" style={{ fontSize: '1.1rem' }}>{item.name}</h4>
                  <span className="tag level-tag">{item.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentPage === index ? 'var(--primary-color)' : 'rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: currentPage === index ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Trang ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
