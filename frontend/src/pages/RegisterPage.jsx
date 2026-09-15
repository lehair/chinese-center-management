import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleStandardRegister = async () => {
    if (!fullName || !email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    // Tạo username tạm từ email (trước chữ @)
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);

    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, fullName, password })
      });
      const data = await response.json();
      if (response.ok && data.code === 201) {
        setSuccess('Đăng ký thành công! Đang chuyển hướng...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialResponse.credential })
      });
      const data = await response.json();
      if (response.ok && data.code === 200) {
        localStorage.setItem('accessToken', data.data.accessToken);
        navigate('/');
      } else {
        setError(data.message || 'Xác thực Google thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-muted)' }}>
            <ArrowLeft size={20} /> Quay lại trang chủ
          </Link>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <img src="/logo.jpg" alt="Tiếng Trung 5s Logo" className="logo-img" style={{ height: '40px', width: 'auto', borderRadius: '50%', marginRight: '10px' }} />
            <span className="logo-text text-gradient" style={{ fontSize: '2rem' }}>Tiếng Trung 5s</span>
          </div>
          <h2 className="heading-2" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Đăng ký tài khoản</h2>
          <p className="text-muted">Tham gia ngay hệ thống học tập của chúng tôi!</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ color: 'var(--primary-color)', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
          {success && <div style={{ color: '#10b981', textAlign: 'center', fontWeight: '500' }}>{success}</div>}
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Họ và tên</label>
            <input 
              type="text" 
              placeholder="Nhập họ và tên..." 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              placeholder="Nhập email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Tạo mật khẩu..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none', paddingRight: '40px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={handleStandardRegister} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>hoặc</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin 
              onSuccess={handleGoogleSuccess} 
              onError={() => setError('Đăng nhập Google thất bại')} 
              useOneTap
              theme="outline"
              size="large"
              text="signup_with"
              shape="rectangular"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Đã có tài khoản? </span>
            <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
