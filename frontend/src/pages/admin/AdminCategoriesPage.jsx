import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/api';
import './AdminCategoriesPage.css';

const AdminCategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/categories');
            setCategories(res.data.data);
        } catch (err) {
            console.error('Lỗi khi tải danh mục', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentCategory({ name: '', description: '' });
        setError(null);
        setShowModal(true);
    };

    const openEditModal = (category) => {
        setIsEditing(true);
        setCurrentCategory({ id: category.id, name: category.name, description: category.description || '' });
        setError(null);
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isEditing) {
                await axiosInstance.put(`/api/v1/categories/${currentCategory.id}`, currentCategory);
            } else {
                await axiosInstance.post('/api/v1/categories', currentCategory);
            }
            setShowModal(false);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa danh mục này? Các khóa học thuộc danh mục này có thể bị ảnh hưởng.')) return;
        try {
            await axiosInstance.delete(`/api/v1/categories/${id}`);
            fetchCategories();
        } catch (err) {
            alert('Lỗi khi xóa danh mục');
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Quản lý Danh Mục</h2>
                <button onClick={openAddModal} className="btn-primary">+ Thêm Danh Mục</button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Danh Mục</th>
                        <th>Mô Tả</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => openEditModal(cat)} className="btn-edit">Sửa</button>
                                    <button onClick={() => handleDelete(cat.id)} className="btn-delete">Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {categories.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Chưa có danh mục nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave} className="modal-body">
                            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                            <div className="form-group">
                                <label>Tên danh mục</label>
                                <input type="text" name="name" value={currentCategory.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea name="description" value={currentCategory.description} onChange={handleInputChange} rows={3}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Hủy</button>
                                <button type="submit" className="btn-save">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategoriesPage;
