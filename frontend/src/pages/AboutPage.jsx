import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle, Users, BookOpen, Trophy } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-color/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="container relative z-10 text-center">
          <h1 className="heading-1 mb-6">
            Về Chúng Tôi<br/>
            <span className="text-primary">Tiếng Trung 5s</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
            Hành trình kiến tạo một môi trường học Tiếng Trung năng động, hiệu quả và khác biệt dành cho mọi lứa tuổi tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="heading-2 mb-6">Câu chuyện của chúng tôi</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Tiếng Trung 5s được thành lập với một sứ mệnh duy nhất: <strong>Đập tan rào cản ngôn ngữ</strong> cho người Việt. Chúng tôi hiểu rằng việc học tiếng Hán đôi khi mang lại nhiều thử thách về mặt chữ tượng hình và phát âm. 
              </p>
              <p className="text-muted mb-6" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Vì vậy, chúng tôi mang đến phương pháp 5S độc quyền: Sinh động - Sâu sát - Sáng tạo - Sẵn sàng - Thành công. Qua nhiều năm hoạt động, chúng tôi tự hào đã chắp cánh cho hàng ngàn học viên tự tin giao tiếp, thăng tiến trong sự nghiệp và đạt điểm cao trong các kỳ thi HSK.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle className="text-primary" size={24} /> Cơ sở vật chất hiện đại</li>
                <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle className="text-primary" size={24} /> Đội ngũ giảng viên 100% bằng Cử nhân/Thạc sĩ</li>
                <li className="flex items-center gap-3 text-lg font-medium"><CheckCircle className="text-primary" size={24} /> Lộ trình học cá nhân hóa</li>
              </ul>
            </div>
            <div className="relative">
              <div className="glass-panel p-2 rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Lớp học tiếng Trung" className="rounded-xl w-full h-auto object-cover shadow-lg" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid-cards mt-20">
            <div className="glass-panel text-center p-10">
              <Users size={48} className="text-primary mx-auto mb-4" />
              <h3 className="heading-1 text-gradient mb-2">5,000+</h3>
              <p className="text-muted font-medium">Học viên tin tưởng</p>
            </div>
            <div className="glass-panel text-center p-10">
              <BookOpen size={48} className="text-primary mx-auto mb-4" />
              <h3 className="heading-1 text-gradient mb-2">200+</h3>
              <p className="text-muted font-medium">Khóa học đã mở</p>
            </div>
            <div className="glass-panel text-center p-10">
              <Trophy size={48} className="text-primary mx-auto mb-4" />
              <h3 className="heading-1 text-gradient mb-2">98%</h3>
              <p className="text-muted font-medium">Tỉ lệ đỗ HSK</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-primary-light/30 -z-10"></div>
         <div className="container">
            <h2 className="heading-2 mb-6">Sẵn sàng bắt đầu hành trình của bạn?</h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
              Tham gia cùng cộng đồng hàng ngàn học viên tại Tiếng Trung 5s và mở khóa tiềm năng ngôn ngữ của bạn ngay hôm nay.
            </p>
            <Link to="/courses" className="btn btn-primary px-10 py-4 text-lg">
              Khám Phá Khóa Học Ngay
            </Link>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
