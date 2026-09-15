import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react';

const PaymentFailedPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const errorParam = searchParams.get('error');

  return (
    <>
      <Header />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: 'var(--bg-color)' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle size={40} color="#ef4444" />
            </div>
          </div>
          
          <h1 className="heading-2" style={{ marginBottom: '15px', fontSize: '1.8rem' }}>Thanh Toán Thất Bại</h1>
          <p className="text-muted" style={{ marginBottom: '30px', lineHeight: '1.6' }}>
            Rất tiếc, giao dịch của bạn không thể hoàn thành hoặc đã bị hủy.
            {errorParam === 'invalid_signature' && " (Lý do: Lỗi xác thực chữ ký VNPay)"}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Link to="/courses" className="btn btn-primary" style={{ padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <RefreshCcw size={18} /> Thử lại
            </Link>
            <Link to="/" className="btn btn-secondary" style={{ padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={18} /> Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailedPage;
