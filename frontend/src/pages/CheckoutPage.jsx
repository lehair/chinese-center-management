import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchWithAuth } from '../utils/api';
import axiosInstance from '../utils/api';
import { CreditCard, ShieldCheck, ArrowLeft, CheckCircle2, QrCode } from 'lucide-react';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State quản lý việc hiển thị mã QR
  const [createdOrder, setCreatedOrder] = useState(null);

  // Cấu hình ngân hàng VietQR tĩnh
  const BANK_ID = import.meta.env.VITE_BANK_ID || 'MB';
  const ACCOUNT_NO = import.meta.env.VITE_ACCOUNT_NO || '0383216716';
  const ACCOUNT_NAME = import.meta.env.VITE_ACCOUNT_NAME || 'LE BA HAI';

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate(`/login?redirect=/checkout/${id}`);
          return;
        }

        const [courseRes, userRes] = await Promise.all([
          axiosInstance.get(`/api/v1/courses/${id}`),
          fetchWithAuth('/api/v1/users/me').then(res => res.json())
        ]);

        if (courseRes.data.code === 200) {
          setCourse(courseRes.data.data);
        } else {
          setError('Không thể tải thông tin khóa học');
        }

        if (userRes.code === 200) {
          setUser(userRes.data);
          if (userRes.data.phoneNumber) {
            setPhoneNumber(userRes.data.phoneNumber);
          }
        } else {
          setError('Lỗi lấy thông tin người dùng');
        }
      } catch (err) {
        console.error('Error in checkout init', err);
        setError('Có lỗi xảy ra, vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [id, navigate]);

  const handleBankTransfer = async () => {
    setProcessing(true);
    setError('');

    // Kiểm tra số điện thoại nếu là Live Online
    if (course.courseType === 'Live Online') {
      if (!phoneNumber || phoneNumber.trim() === '') {
        setError('Vui lòng nhập số điện thoại để đăng ký khóa học Live Online');
        setProcessing(false);
        return;
      }

      // Nếu số điện thoại thay đổi hoặc mới thêm, cập nhật user profile
      if (phoneNumber !== user.phoneNumber) {
        try {
          await fetchWithAuth('/api/v1/users/me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: user.fullName, phoneNumber: phoneNumber })
          });
        } catch (e) {
          console.error("Failed to update phone number", e);
        }
      }
    }

    try {
      // 1. Tạo đơn hàng với paymentMethod = BANK_TRANSFER
      const orderRes = await fetchWithAuth('/api/v1/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentId: user.id,
          courseIds: [course.id],
          paymentMethod: 'BANK_TRANSFER'
        })
      });
      const orderData = await orderRes.json();

      if (orderData.code !== 201) {
        setError(orderData.message || 'Lỗi khi tạo đơn hàng');
        setProcessing(false);
        return;
      }

      // Hiển thị phần QR
      setCreatedOrder(orderData.data);
      setProcessing(false);

    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối máy chủ khi xử lý đơn hàng');
      setProcessing(false);
    }
  };

  if (loading) return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải...</div>
      <Footer />
    </>
  );

  if (error && !course) return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>{error}</div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <div style={{ minHeight: '80vh', backgroundColor: 'var(--bg-color)', padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link to={`/courses/${id}`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <ArrowLeft size={20} style={{ marginRight: '8px' }} /> Quay lại khóa học
          </Link>

          <h1 className="font-display-lg text-on-surface" style={{ marginBottom: '30px', fontSize: '2rem' }}>Thanh toán đơn hàng</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

            {/* Cột trái: Thông tin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div className="glass-panel" style={{ padding: '25px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>Thông tin học viên</h3>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
                  <strong>Họ tên:</strong> {user.fullName}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px' }}>
                  <strong>Email:</strong> {user.email}
                </div>
                {course.courseType === 'Live Online' && (
                  <div style={{ background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Số điện thoại (Bắt buộc):</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Nhập số điện thoại của bạn"
                      style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                      required
                    />
                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '5px' }}>* Chúng tôi cần SĐT để liên hệ xếp lớp cho bạn.</small>
                  </div>
                )}
              </div>

              <div className="glass-panel" style={{ padding: '25px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>Sản phẩm</h3>
                <div style={{ display: 'flex', gap: '15px', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                  <img src={course.imageUrl || 'https://via.placeholder.com/150'} alt="Course" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{course.title}</h4>
                    <p style={{ margin: 0, color: 'var(--primary-color)', fontWeight: 'bold' }}>{course.price?.toLocaleString()} ₫</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Cột phải: Thanh toán hoặc QR */}
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '16px', height: 'fit-content', position: 'sticky', top: '20px' }}>

              {!createdOrder ? (
                <>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Tóm tắt đơn hàng</h3>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                    <span>Giá gốc</span>
                    <span style={{ textDecoration: course.originalPrice > course.price ? 'line-through' : 'none' }}>
                      {course.originalPrice ? course.originalPrice.toLocaleString() : course.price?.toLocaleString()} ₫
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                    <span>Giảm giá</span>
                    <span style={{ color: 'green' }}>
                      {course.originalPrice > course.price ? '-' + (course.originalPrice - course.price).toLocaleString() : '0'} ₫
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '1.3rem', fontWeight: 'bold' }}>
                    <span>Tổng cộng</span>
                    <span style={{ color: 'var(--primary-color)' }}>{course.price?.toLocaleString()} ₫</span>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(124, 58, 237, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid var(--primary-color)' }}>
                      <CheckCircle2 size={20} color="var(--primary-color)" />
                      <span style={{ fontWeight: '500' }}>Quét mã QR Ngân hàng</span>
                    </div>
                  </div>

                  {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    onClick={handleBankTransfer}
                    disabled={processing}
                  >
                    <QrCode size={20} />
                    {processing ? 'Đang tạo mã QR...' : 'Thanh Toán Bằng QR'}
                  </button>

                  <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <ShieldCheck size={16} /> Thanh toán tự động, miễn phí giao dịch
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--primary-color)' }}>Quét Mã Chuyển Khoản</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã
                  </p>

                  <div style={{ background: 'white', padding: '15px', borderRadius: '12px', display: 'inline-block', marginBottom: '20px', border: '1px solid #ddd' }}>
                    <img
                      src={`https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${course.price}&addInfo=Thanh toan don hang ${createdOrder.id}&accountName=${ACCOUNT_NAME.replace(/ /g, '%20')}`}
                      alt="VietQR"
                      style={{ width: '100%', maxWidth: '250px' }}
                    />
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px', textAlign: 'left', marginBottom: '20px' }}>
                    <div style={{ marginBottom: '8px' }}><strong>Ngân hàng:</strong> {BANK_ID}</div>
                    <div style={{ marginBottom: '8px' }}><strong>Chủ tài khoản:</strong> {ACCOUNT_NAME}</div>
                    <div style={{ marginBottom: '8px' }}><strong>Số tài khoản:</strong> {ACCOUNT_NO}</div>
                    <div style={{ marginBottom: '8px' }}><strong>Số tiền:</strong> <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{course.price?.toLocaleString()} ₫</span></div>
                    <div><strong>Nội dung CK:</strong> <span style={{ fontFamily: 'monospace', background: '#eee', padding: '2px 5px' }}>Thanh toan don hang {createdOrder.id}</span></div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    Hệ thống sẽ tự động xác nhận đơn hàng sau 1-3 phút kể từ khi bạn chuyển khoản thành công.
                  </p>

                  {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}


                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
