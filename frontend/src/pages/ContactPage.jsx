import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="page-wrapper">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container relative z-10 text-center">
          <h1 className="heading-1 mb-6">
            Liên Hệ Với<br/>
            <span className="text-primary">Tiếng Trung 5s</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Bạn có câu hỏi hoặc cần tư vấn lộ trình học? Đừng ngần ngại liên hệ với chúng tôi để được hỗ trợ nhanh nhất.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 mb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="heading-2 mb-8">Thông tin liên hệ</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="heading-3 mb-1" style={{ fontSize: '1.2rem' }}>Địa chỉ</h4>
                    <p className="text-muted">123 Đường Học Tập, Quận Tri Thức, TP. Hà Nội, Việt Nam</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="heading-3 mb-1" style={{ fontSize: '1.2rem' }}>Hotline Tư Vấn</h4>
                    <p className="text-muted">1900 8888 - 0987 654 321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="heading-3 mb-1" style={{ fontSize: '1.2rem' }}>Email</h4>
                    <p className="text-muted">lienhe@tiengtrung5s.edu.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="heading-3 mb-1" style={{ fontSize: '1.2rem' }}>Giờ làm việc</h4>
                    <p className="text-muted">Thứ 2 - Thứ 7: 08:00 - 21:00<br/>Chủ Nhật: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>

              {/* Map embedded */}
              <div className="mt-12 glass-panel p-2 rounded-2xl overflow-hidden h-64">
                <iframe 
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096814183571!2d105.77972177435166!3d21.028811887777174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3260b1a8b%3A0x862052392e3f478e!2zSGFub2k!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '12px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-panel p-10">
              <h2 className="heading-2 mb-2">Gửi tin nhắn</h2>
              <p className="text-muted mb-8">Điền thông tin và chúng tôi sẽ liên hệ lại với bạn sớm nhất.</p>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle size={20} />
                  <span>Cảm ơn bạn! Tin nhắn đã được gửi thành công. Chúng tôi sẽ sớm liên hệ lại.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Họ và Tên *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-color focus:ring-2 focus:ring-primary-light outline-none transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold mb-2">Số điện thoại *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-color focus:ring-2 focus:ring-primary-light outline-none transition-all"
                      placeholder="0987..."
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-color focus:ring-2 focus:ring-primary-light outline-none transition-all"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Nội dung tư vấn *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-color focus:ring-2 focus:ring-primary-light outline-none transition-all resize-none"
                    placeholder="Bạn muốn hỏi về khóa học nào..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-4">
                  <Send size={20} />
                  Gửi Tin Nhắn Ngay
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
