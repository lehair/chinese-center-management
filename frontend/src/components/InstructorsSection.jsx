import React, { useState, useEffect } from 'react';
import { UserCircle, Calendar } from 'lucide-react';
import axiosInstance from '../utils/api';
import './Sections.css';

const InstructorsSection = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructorsInfo = async () => {
      try {
        const profileRes = await axiosInstance.get('/api/v1/users/teachers');
        const teachers = profileRes.data?.data || [];
        
        const predefinedBios = [
          'Giảng viên Tiếng Trung nhiệt huyết, với nhiều năm kinh nghiệm giảng dạy và luôn tận tâm với học viên.',
          'Chuyên gia luyện thi HSK với phương pháp truyền đạt dễ hiểu, giúp học viên nắm bắt kiến thức nhanh chóng.',
          'Tốt nghiệp Thạc sĩ chuyên ngành Ngôn ngữ học tại Trung Quốc, phong cách giảng dạy năng động và hiện đại.'
        ];

        const updatedInstructors = teachers.map((teacher, index) => ({
            id: teacher.id,
            name: teacher.fullName || 'Đang cập nhật',
            role: 'Giảng viên',
            bio: predefinedBios[index % predefinedBios.length],
            avatarUrl: teacher.avatarUrl
        }));

        setInstructors(updatedInstructors);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách giảng viên:', error);
      }
    };
    
    fetchInstructorsInfo();
  }, []);

  return (
    <section className="section instructors-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="heading-2">Đội Ngũ Giảng Viên</h2>
          <p className="text-muted">Đồng hành cùng bạn là những giảng viên tâm huyết và giàu kinh nghiệm.</p>
        </div>
        
        <div className="grid-cards">
          {instructors.length > 0 ? instructors.map((instructor, idx) => (
            <div key={idx} className="glass-panel instructor-card">
              <div className="instructor-avatar" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {instructor.avatarUrl ? (
                   <img src={instructor.avatarUrl} alt={instructor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                   <UserCircle size={64} />
                )}
              </div>
              <h3 className="heading-3">{instructor.name}</h3>
              <p className="text-gradient font-medium my-2">{instructor.role}</p>
              
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '20px', fontStyle: 'italic', lineHeight: '1.5' }}>
                "{instructor.bio}"
              </p>
            </div>
          )) : (
            <div style={{ width: '100%', textAlign: 'center', gridColumn: '1 / -1' }}>
              <p className="text-muted">Đang cập nhật đội ngũ giảng viên...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
