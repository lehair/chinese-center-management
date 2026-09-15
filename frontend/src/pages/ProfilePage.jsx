import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../utils/api';
import { ArrowLeft, User, Mail, LogOut, Edit2, Save, Calendar, Phone, Book } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const [profile, setProfile] = useState({
    id: null,
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    avatarUrl: ''
  });
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [pwdData, setPwdData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        const userRes = await fetchWithAuth('/api/v1/users/me');
        
        if (!userRes.ok) return;

        const userData = await userRes.json();
        
        if (userData.code === 200) {
          const user = userData.data;
          setProfile({
            id: user.id,
            fullName: user.fullName || '',
            email: user.email || '',
            dateOfBirth: user.dateOfBirth || '',
            phoneNumber: user.phoneNumber || '',
            avatarUrl: user.avatarUrl || ''
          });
          
          if (user.id) {
            const courseRes = await fetchWithAuth(`/api/v1/enrollments/student/${user.id}`);
            
            if (!courseRes.ok) return;

            const courseData = await courseRes.json();
            if (courseData.code === 200) {
              setCourses(courseData.data || []);
            }
          }
        } else {
          setError('Không thể tải thông tin tài khoản');
        }
      } catch (err) {
        setError('Lỗi kết nối máy chủ');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [token, navigate]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetchWithAuth('/api/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: profile.fullName,
          dateOfBirth: profile.dateOfBirth || null,
          phoneNumber: profile.phoneNumber || null
        })
      });

      if (!res.ok) return;

      const data = await res.json();
      if (data.code === 200) {
        setIsEditing(false);
        localStorage.setItem('fullName', profile.fullName); // Cập nhật lại cache
      } else {
        setError(data.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      setError('Lỗi khi cập nhật thông tin');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetchWithAuth('/api/v1/users/me/avatar', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) return;

      const data = await res.json();
      if (data.code === 200) {
        setProfile({ ...profile, avatarUrl: data.data });
        localStorage.setItem('avatarUrl', data.data); // Cập nhật Header
      } else {
        alert(data.message || 'Lỗi tải ảnh lên');
      }
    } catch (err) {
      alert('Lỗi kết nối khi tải ảnh');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');
    
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      setPwdError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (pwdData.newPassword.length < 6) {
      setPwdError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    try {
      const res = await fetchWithAuth('/api/v1/users/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pwdData)
      });
      const data = await res.json();
      if (data.code === 200) {
        setPwdSuccess('Đổi mật khẩu thành công');
        setPwdData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPwdError(data.message || 'Lỗi đổi mật khẩu');
      }
    } catch (err) {
      setPwdError('Lỗi kết nối khi đổi mật khẩu');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('fullName');
    localStorage.removeItem('avatarUrl');
    navigate('/login');
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đang tải...</div>;

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} style={{ marginRight: '8px' }}/> Quay lại trang chủ
        </Link>
        
        <div className="glass-panel" style={{ padding: '30px', position: 'relative' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary-color)', marginBottom: '15px' }}>
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={50} style={{ color: 'var(--text-muted)' }} />
                </div>
              )}
              {isEditing && (
                <label style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.8rem', padding: '5px', textAlign: 'center', cursor: 'pointer' }}>
                  Đổi ảnh
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            <h2 className="heading-2" style={{ fontSize: '1.8rem', margin: 0 }}>{profile.fullName}</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-secondary)' }}>Thông tin liên hệ</h3>
            {!isEditing ? (
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit2 size={16} /> Chỉnh sửa
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={16} /> {saving ? 'Đang lưu...' : 'Lưu lại'}
              </button>
            )}
          </div>
          
          {error && <div style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Cột 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.03)', padding: '15px', borderRadius: '8px' }}>
                <User size={20} style={{ color: 'var(--primary-color)', marginRight: '15px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Họ và tên</div>
                  {isEditing ? (
                    <input type="text" value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '4px', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ fontWeight: '500' }}>{profile.fullName}</div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.03)', padding: '15px', borderRadius: '8px' }}>
                <Mail size={20} style={{ color: 'var(--primary-color)', marginRight: '15px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email (Không thể sửa)</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-muted)' }}>{profile.email}</div>
                </div>
              </div>
            </div>
            
            {/* Cột 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.03)', padding: '15px', borderRadius: '8px' }}>
                <Calendar size={20} style={{ color: 'var(--primary-color)', marginRight: '15px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ngày tháng năm sinh</div>
                  {isEditing ? (
                    <input type="date" value={profile.dateOfBirth} onChange={e => setProfile({...profile, dateOfBirth: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '4px', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ fontWeight: '500' }}>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.03)', padding: '15px', borderRadius: '8px' }}>
                <Phone size={20} style={{ color: 'var(--primary-color)', marginRight: '15px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Số điện thoại</div>
                  {isEditing ? (
                    <input type="tel" value={profile.phoneNumber} onChange={e => setProfile({...profile, phoneNumber: e.target.value})} style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '4px', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ fontWeight: '500' }}>{profile.phoneNumber || 'Chưa cập nhật'}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-secondary)' }}>Đổi mật khẩu</h3>
          {pwdError && <div style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>{pwdError}</div>}
          {pwdSuccess && <div style={{ color: 'green', marginBottom: '15px' }}>{pwdSuccess}</div>}
          
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mật khẩu hiện tại</label>
              <input type="password" value={pwdData.oldPassword} onChange={e => setPwdData({...pwdData, oldPassword: e.target.value})} required style={{ width: '100%', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mật khẩu mới</label>
              <input type="password" value={pwdData.newPassword} onChange={e => setPwdData({...pwdData, newPassword: e.target.value})} required style={{ width: '100%', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Xác nhận mật khẩu mới</label>
              <input type="password" value={pwdData.confirmPassword} onChange={e => setPwdData({...pwdData, confirmPassword: e.target.value})} required style={{ width: '100%', background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px', borderRadius: '4px' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '10px', alignSelf: 'flex-start', marginTop: '10px' }}>Đổi mật khẩu</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 className="heading-2" style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Book size={24} style={{ color: 'var(--primary-color)' }} /> Khóa học đã đăng ký
          </h2>
          
          {courses.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '20px 0' }}>Bạn chưa đăng ký khóa học nào.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {courses.map(course => (
                <Link to={`/courses/${course.courseId}`} key={course.id} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', color: 'inherit', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{course.courseTitle}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Đăng ký ngày: {new Date(course.enrolledAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '1.2rem' }}>{course.progress}%</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tiến độ</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', alignSelf: 'flex-end', width: '200px' }}>
          <LogOut size={18} /> Đăng xuất
        </button>

      </div>
    </div>
  );
};

export default ProfilePage;
