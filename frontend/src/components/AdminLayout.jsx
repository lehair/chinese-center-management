import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('fullName');
        localStorage.removeItem('avatarUrl');
        localStorage.removeItem('role');
        navigate('/login');
    };

    React.useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('accessToken');
        if (!token || role !== 'ADMIN') {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>CMS Admin</h2>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className="admin-nav-item">Dashboard</Link>
                    <Link to="/admin/users" className="admin-nav-item">Quản lý Học viên</Link>
                    <Link to="/admin/teachers" className="admin-nav-item">Quản lý Giáo viên</Link>
                    <Link to="/admin/courses" className="admin-nav-item">Quản lý Khóa học</Link>
                    <Link to="/admin/categories" className="admin-nav-item">Quản lý Danh mục</Link>
                    <Link to="/admin/notifications" className="admin-nav-item">Thông báo</Link>
                    <Link to="/admin/posts" className="admin-nav-item">Quản lý Bài viết</Link>
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">Đăng xuất</button>
                </div>
            </aside>
            <main className="admin-main-content">
                <header className="admin-header">
                    <h1>Trang Quản Trị</h1>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
