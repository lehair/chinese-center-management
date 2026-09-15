import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/api';

const AdminNotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [actionUrl, setActionUrl] = useState('');
    const [type, setType] = useState('GLOBAL');

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/notifications/admin');
            const data = res.data.data || [];
            // Sort to show newest first
            const sortedData = data.sort((a, b) => b.id - a.id);
            setNotifications(sortedData);
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    const handleCreateNotification = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/v1/notifications/admin', {
                title,
                message,
                imageUrl,
                actionUrl,
                type
            });
            alert('Tạo thông báo thành công!');
            fetchNotifications();
            setTitle('');
            setMessage('');
            setImageUrl('');
            setActionUrl('');
        } catch (error) {
            console.error('Error creating notification', error);
            alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteNotification = async (id) => {
        if (!window.confirm("Xóa thông báo này?")) return;
        try {
            await axiosInstance.delete(`/api/v1/notifications/admin/${id}`);
            fetchNotifications();
        } catch (error) {
            console.error('Error deleting notification', error);
        }
    };

    return (
        <div>
            <h2>Quản lý Thông báo (Banner / Chữ)</h2>
            
            <div style={{ backgroundColor: '#f4f7fe', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                <h3>Tạo Thông Báo Mới</h3>
                <form onSubmit={handleCreateNotification} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px', maxWidth: '500px' }}>
                    <input 
                        type="text" 
                        placeholder="Tiêu đề" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <textarea 
                        placeholder="Nội dung" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            placeholder="URL hình ảnh Banner (Hoặc tải lên từ máy)" 
                            value={imageUrl} 
                            onChange={(e) => setImageUrl(e.target.value)}
                            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <label style={{ padding: '10px 15px', backgroundColor: '#e2e8f0', color: '#333', border: '1px solid #cbd5e1', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Tải lên
                            <input 
                                type="file" 
                                style={{ display: 'none' }} 
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    try {
                                        const res = await axiosInstance.post('/api/v1/users/upload', formData);
                                        setImageUrl(res.data.data);
                                    } catch (err) {
                                        alert('Tải ảnh lên thất bại!');
                                    }
                                }} 
                            />
                        </label>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Link chuyển hướng khi click (tùy chọn)" 
                        value={actionUrl} 
                        onChange={(e) => setActionUrl(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <select 
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="GLOBAL">Thông báo chung</option>
                        <option value="BANNER">Banner Trang chủ</option>
                    </select>
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#4318ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Gửi Thông Báo
                    </button>
                </form>
            </div>

            <table className="admin-table" style={{ marginTop: '30px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Banner</th>
                        <th>Tiêu đề</th>
                        <th>Nội dung</th>
                        <th>Loại</th>
                        <th>Hành động</th>
                        <th>Thời gian tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notif => (
                        <tr key={notif.id}>
                            <td>{notif.id}</td>
                            <td>
                                {notif.imageUrl ? 
                                    <img src={notif.imageUrl} alt="Banner" style={{ width: '100px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /> 
                                : 'Không có'}
                            </td>
                            <td>{notif.title}</td>
                            <td>{notif.message}</td>
                            <td><span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: notif.type === 'BANNER' ? '#e3f2fd' : '#f5f5f5', color: notif.type === 'BANNER' ? '#1976d2' : '#333', fontSize: '12px', fontWeight: 'bold' }}>{notif.type}</span></td>
                            <td>{notif.actionUrl ? <a href={notif.actionUrl} target="_blank" rel="noreferrer" style={{ color: '#4318ff' }}>Link</a> : '-'}</td>
                            <td>{new Date(notif.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button 
                                    onClick={() => handleDeleteNotification(notif.id)}
                                    style={{ padding: '5px 10px', backgroundColor: '#ffe6e6', color: '#d93025', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminNotificationsPage;
