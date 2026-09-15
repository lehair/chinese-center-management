import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PaymentSuccessPage = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: 'var(--bg-color)' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={40} color="#22c55e" />
            </div>
          </div>
          
          <h1 className="heading-2" style={{ marginBottom: '15px', fontSize: '1.8rem' }}>Thanh Toán Thành Công!</h1>
          <p className="text-muted" style={{ marginBottom: '30px', lineHeight: '1.6' }}>
            Cảm ơn bạn đã đăng ký khóa học. Giao dịch đã được xử lý thành công. 
            Khóa học hiện đã được thêm vào tài khoản của bạn.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/profile" className="btn btn-primary" style={{ padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              Vào học ngay <ArrowRight size={18} />
            </Link>
            <Link to="/" className="btn btn-secondary" style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccessPage;
