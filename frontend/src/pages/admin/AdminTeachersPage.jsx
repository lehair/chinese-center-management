import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/api';
import './AdminTeachersPage.css';
import { Plus, Edit2, Trash2, BookOpen, X } from 'lucide-react';

const AdminTeachersPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [selectedTeacherName, setSelectedTeacherName] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        dateOfBirth: '',
        avatarUrl: ''
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/users/admin/teachers');
            setTeachers(res.data.data || []);
        } catch (error) {
            console.error('Error fetching teachers', error);
        }
    };

    const handleOpenModal = (teacher = null) => {
        if (teacher) {
            setEditingTeacher(teacher);
            setFormData({
                username: teacher.username,
                email: teacher.email,
                fullName: teacher.fullName,
                phoneNumber: teacher.phoneNumber || '',
                dateOfBirth: teacher.dateOfBirth || '',
                avatarUrl: teacher.avatarUrl || ''
            });
        } else {
            setEditingTeacher(null);
            setFormData({
                username: '',
                email: '',
                fullName: '',
                phoneNumber: '',
                dateOfBirth: '',
                avatarUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTeacher(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await axiosInstance.post('/api/v1/users/upload', uploadData);
            if (res.data.code === 200) {
                setFormData(prev => ({ ...prev, avatarUrl: res.data.data }));
            }
        } catch (error) {
            alert('Lỗi khi tải ảnh lên');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prepare data to send, handle empty string for date
        const dataToSend = { ...formData };
        if (!dataToSend.dateOfBirth) {
            dataToSend.dateOfBirth = null;
        }

        try {
            if (editingTeacher) {
                await axiosInstance.put(`/api/v1/users/admin/teachers/${editingTeacher.id}`, dataToSend);
                alert('Cập nhật thành công');
            } else {
                await axiosInstance.post('/api/v1/users/admin/teachers', dataToSend);
                alert('Thêm giáo viên thành công. Mật khẩu mặc định là 123456');
            }
            fetchTeachers();
            handleCloseModal();
        } catch (error) {
            alert(error.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giáo viên này?')) {
            try {
                await axiosInstance.delete(`/api/v1/users/admin/teachers/${id}`);
                fetchTeachers();
            } catch (error) {
                alert('Có lỗi khi xóa');
            }
        }
    };

    const handleViewCourses = async (teacher) => {
        setSelectedTeacherName(teacher.fullName);
        try {
            const res = await axiosInstance.get(`/api/v1/courses/instructor/${teacher.id}`);
            setTeacherCourses(res.data.data || []);
            setIsCourseModalOpen(true);
        } catch (error) {
            alert('Không thể tải danh sách khóa học');
        }
    };

    return (
        <div className="admin-teachers-page">
            <div className="page-header">
                <h2>Quản lý Giáo viên</h2>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={18} style={{ marginRight: '8px' }} /> Thêm Giáo viên
                </button>
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>ID</th>
                            <th>Họ tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher.id}>
                                <td>
                                    {teacher.avatarUrl ? (
                                        <img src={teacher.avatarUrl} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc' }}></div>
                                    )}
                                </td>
                                <td>{teacher.id}</td>
                                <td>{teacher.fullName}</td>
                                <td>{teacher.username}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td className="actions">
                                    <button className="action-btn view" title="Xem lớp dạy" onClick={() => handleViewCourses(teacher)}>
                                        <BookOpen size={16} />
                                    </button>
                                    <button className="action-btn edit" title="Sửa" onClick={() => handleOpenModal(teacher)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="action-btn delete" title="Xóa" onClick={() => handleDelete(teacher.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {teachers.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Chưa có giáo viên nào</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Add/Edit Teacher */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editingTeacher ? 'Sửa thông tin giáo viên' : 'Thêm giáo viên mới'}</h3>
                            <button className="close-btn" onClick={handleCloseModal}><X size={20}/></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group" style={{ alignItems: 'center' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary-color)', marginBottom: '10px' }}>
                                    {formData.avatarUrl ? (
                                        <img src={formData.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
                                    )}
                                </div>
                                <label style={{ cursor: 'pointer', color: 'var(--primary-color)', fontSize: '0.9rem' }}>
                                    Tải ảnh lên
                                    <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Tên đăng nhập *</label>
                                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required disabled={!!editingTeacher} />
                            </div>
                            <div className="form-group">
                                <label>Họ và tên *</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label>Ngày sinh</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                            </div>
                            {!editingTeacher && (
                                <div className="form-info">
                                    <p>Lưu ý: Mật khẩu mặc định sẽ là <b>123456</b></p>
                                </div>
                            )}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Hủy</button>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal View Courses */}
            {isCourseModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>Lớp học của: {selectedTeacherName}</h3>
                            <button className="close-btn" onClick={() => setIsCourseModalOpen(false)}><X size={20}/></button>
                        </div>
                        <div className="modal-body">
                            {teacherCourses.length > 0 ? (
                                <ul className="course-list">
                                    {teacherCourses.map(course => (
                                        <li key={course.id} className="course-item">
                                            <strong>{course.title}</strong> - {course.courseType}
                                            <span className={`status-badge ${course.status.toLowerCase()}`}>{course.status}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="empty-msg">Giáo viên này chưa dạy lớp nào.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTeachersPage;
