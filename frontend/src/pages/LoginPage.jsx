import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getRedirectPath = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('redirect') || '/';
  };

  const handleStandardLogin = async () => {
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.code === 200) {
        localStorage.setItem('accessToken', data.data.accessToken);
        if (data.data.fullName) localStorage.setItem('fullName', data.data.fullName);
        if (data.data.avatarUrl) localStorage.setItem('avatarUrl', data.data.avatarUrl);
        if (data.data.role) localStorage.setItem('role', data.data.role);
        
        if (data.data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate(getRedirectPath());
        }
      } else {
        setError(data.message || 'Đăng nhập thất bại');
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
        if (data.data.fullName) localStorage.setItem('fullName', data.data.fullName);
        if (data.data.avatarUrl) localStorage.setItem('avatarUrl', data.data.avatarUrl);
        if (data.data.role) localStorage.setItem('role', data.data.role);

        if (data.data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate(getRedirectPath());
        }
      } else {
        setError(data.message || 'Xác thực Google thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: 'var(--text-muted)' }}>
            <ArrowLeft size={20} /> Quay lại trang chủ
          </Link>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <img src="/logo.jpg" alt="Tiếng Trung 5s Logo" className="logo-img" style={{ height: '40px', width: 'auto', borderRadius: '50%', marginRight: '10px' }} />
            <span className="logo-text text-gradient" style={{ fontSize: '2rem' }}>Tiếng Trung 5s</span>
          </div>
          <h2 className="heading-2" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Đăng nhập</h2>
          <p className="text-muted">Chào mừng bạn quay lại hệ thống học tập!</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ color: 'var(--primary-color)', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email hoặc Tên đăng nhập</label>
            <input 
              type="text" 
              placeholder="Nhập email..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu..." 
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
          <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={handleStandardLogin} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
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
              text="signin_with"
              shape="rectangular"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Chưa có tài khoản? </span>
            <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
