import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import axiosInstance from '../../utils/api';
import './AdminCoursesPage.css'; // We'll create this next

const AdminCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const [currentCourse, setCurrentCourse] = useState({
        title: '', description: '', price: '', originalPrice: '',
        category: 'Tiếng Trung Giao Tiếp', courseType: 'Video Course', level: 'Nhập môn',
        imageUrl: '', features: '', whatYouWillLearn: '', status: 'DRAFT',
        modules: [], instructorId: ''
    });

    useEffect(() => {
        fetchCourses();
        fetchCategories();
        fetchTeachers();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/categories');
            setCategories(res.data.data);
            if (res.data.data.length > 0 && currentCourse.category === 'Tiếng Trung Giao Tiếp') {
                setCurrentCourse(prev => ({...prev, category: res.data.data[0].name}));
            }
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/users/admin/teachers');
            setTeachers(res.data.data || []);
        } catch (error) {
            console.error('Error fetching teachers', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/courses/admin');
            setCourses(res.data.data);
        } catch (error) {
            console.error('Error fetching courses', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCourse({ ...currentCourse, [name]: value });
    };

    const openAddModal = () => {
        setIsEditing(false);
        setActiveTab(1);
        setCurrentCourse({
            title: '', description: '', price: '', originalPrice: '',
            category: 'Tiếng Trung Giao Tiếp', courseType: 'Video Course', level: 'Nhập môn',
            imageUrl: '', features: '', whatYouWillLearn: '', status: 'DRAFT',
            modules: [], instructorId: '', schedule: ''
        });
        setShowModal(true);
    };

    const openEditModal = (course) => {
        setIsEditing(true);
        setActiveTab(1);
        setCurrentCourse({
            id: course.id,
            title: course.title,
            description: course.description || '',
            price: course.price || '',
            originalPrice: course.originalPrice || '',
            category: course.category || 'Tiếng Trung Giao Tiếp',
            courseType: course.courseType || 'Video Course',
            level: course.level || 'Nhập môn',
            imageUrl: course.imageUrl || '',
            features: course.features || '',
            whatYouWillLearn: course.whatYouWillLearn || '',
            status: course.status || 'DRAFT',
            modules: course.modules || [],
            instructorId: course.instructorId || '',
            schedule: course.schedule || ''
        });
        setShowModal(true);
    };

    const [saveError, setSaveError] = useState(null);

    const handleSaveCourse = async (e) => {
        e.preventDefault();
        setSaveError(null);
        
        const payload = {
            ...currentCourse,
            price: currentCourse.price ? parseFloat(currentCourse.price) : 0,
            originalPrice: currentCourse.originalPrice ? parseFloat(currentCourse.originalPrice) : null,
            instructorId: currentCourse.instructorId ? parseInt(currentCourse.instructorId) : null,
        };
        
        try {
            if (isEditing) {
                await axiosInstance.put(`/api/v1/courses/admin/${currentCourse.id}`, payload);
            } else {
                await axiosInstance.post('/api/v1/courses/admin', payload);
            }
            setShowModal(false);
            fetchCourses();
        } catch (error) {
            console.error('Full Error Object:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Lỗi không xác định';
            const errorDetails = error.response?.data || error;
            setSaveError(`Lỗi: ${errorMsg}. Chi tiết: ${JSON.stringify(errorDetails)}`);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) return;
        try {
            await axiosInstance.delete(`/api/v1/courses/admin/${courseId}`);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course', error);
            alert('Có lỗi xảy ra khi xóa khóa học!');
        }
    };

    // --- CURRICULUM BUILDER LOGIC ---
    const addModule = () => {
        const newModules = [...currentCourse.modules];
        newModules.push({
            title: `Chương ${newModules.length + 1}: `,
            orderIndex: newModules.length + 1,
            lessons: []
        });
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    const updateModule = (mIndex, field, value) => {
        const newModules = [...currentCourse.modules];
        newModules[mIndex][field] = value;
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    const removeModule = (mIndex) => {
        if (!window.confirm("Bạn có chắc xóa toàn bộ chương này?")) return;
        const newModules = [...currentCourse.modules];
        newModules.splice(mIndex, 1);
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    const addLesson = (mIndex) => {
        const newModules = [...currentCourse.modules];
        const lessons = newModules[mIndex].lessons || [];
        lessons.push({
            title: 'Bài học mới',
            duration: '00:00',
            lessonType: 'VIDEO',
            videoUrl: '',
            orderIndex: lessons.length + 1,
            isPreview: false
        });
        newModules[mIndex].lessons = lessons;
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    const updateLesson = (mIndex, lIndex, field, value) => {
        const newModules = [...currentCourse.modules];
        newModules[mIndex].lessons[lIndex][field] = value;
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    const removeLesson = (mIndex, lIndex) => {
        const newModules = [...currentCourse.modules];
        newModules[mIndex].lessons.splice(lIndex, 1);
        setCurrentCourse({ ...currentCourse, modules: newModules });
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Quản lý Khóa học</h2>
                <button onClick={openAddModal} className="btn-primary">
                    + Thêm Khóa Học
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Khóa Học</th>
                        <th>Danh Mục</th>
                        <th>Thể Loại</th>
                        <th>Giá (VND)</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.category}</td>
                            <td>{course.courseType}</td>
                            <td>{course.price?.toLocaleString()} đ</td>
                            <td>
                                <span className={`status-badge ${course.status === 'PUBLISHED' ? 'published' : 'draft'}`}>
                                    {course.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => openEditModal(course)} className="btn-edit">Sửa</button>
                                    <button onClick={() => handleDeleteCourse(course.id)} className="btn-delete">Xóa</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container modal-large">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Sửa Khóa Học' : 'Thêm Khóa Học Mới'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        
                        <div className="modal-tabs">
                            <button className={`tab-btn ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>1. Thông tin chung</button>
                            <button className={`tab-btn ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>2. Chi tiết & Mức giá</button>
                            <button className={`tab-btn ${activeTab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>3. Chương trình học</button>
                        </div>

                        <form onSubmit={handleSaveCourse} className="modal-body">
                            
                            {saveError && (
                                <div style={{ padding: '15px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '15px', wordBreak: 'break-all' }}>
                                    {saveError}
                                </div>
                            )}

                            {/* TAB 1: BASIC INFO */}
                            {activeTab === 1 && (
                                <div className="tab-content">
                                    <div className="form-group">
                                        <label>Tên khóa học</label>
                                        <input type="text" name="title" value={currentCourse.title} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Danh mục</label>
                                            <select name="category" value={currentCourse.category} onChange={handleInputChange}>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                ))}
                                                {categories.length === 0 && <option value="">Chưa có danh mục</option>}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Trình độ</label>
                                            <select name="level" value={currentCourse.level} onChange={handleInputChange}>
                                                <option value="Nhập môn">Nhập môn</option>
                                                <option value="Trung cấp">Trung cấp</option>
                                                <option value="Cao cấp">Cao cấp</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Thể loại</label>
                                            <select name="courseType" value={currentCourse.courseType} onChange={handleInputChange}>
                                                <option value="Video Course">Video Course</option>
                                                <option value="Live Online">Live Online</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Lịch học (VD: 20:00 - 21:30 T2-4-6)</label>
                                        <input type="text" name="schedule" value={currentCourse.schedule || ''} onChange={handleInputChange} placeholder="Dành cho khóa Live Online" />
                                    </div>
                                    <div className="form-group">
                                        <label>Link hình ảnh đại diện (URL)</label>
                                        <input type="text" name="imageUrl" value={currentCourse.imageUrl} onChange={handleInputChange} placeholder="https://..." />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select name="status" value={currentCourse.status} onChange={handleInputChange}>
                                                <option value="DRAFT">DRAFT (Nháp)</option>
                                                <option value="PUBLISHED">PUBLISHED (Hiển thị)</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Giảng viên phụ trách</label>
                                            <select name="instructorId" value={currentCourse.instructorId || ''} onChange={handleInputChange}>
                                                <option value="">-- Chưa chọn --</option>
                                                {teachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.fullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: DETAILS & PRICING */}
                            {activeTab === 2 && (
                                <div className="tab-content">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Giá bán (VNĐ)</label>
                                            <input type="number" name="price" value={currentCourse.price} onChange={handleInputChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label>Giá gốc (VNĐ) - Dùng để gạch ngang khuyến mãi</label>
                                            <input type="number" name="originalPrice" value={currentCourse.originalPrice} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả chi tiết</label>
                                        <textarea name="description" value={currentCourse.description} onChange={handleInputChange} rows={3}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Bạn sẽ học được gì (What you will learn) - Mỗi dòng 1 mục (Tích cam)</label>
                                        <textarea name="whatYouWillLearn" value={currentCourse.whatYouWillLearn} onChange={handleInputChange} placeholder="VD: Nắm vững 300 từ vựng..." rows={4}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Khóa học bao gồm (Features) - Mỗi dòng 1 mục (Tích đỏ)</label>
                                        <textarea name="features" value={currentCourse.features} onChange={handleInputChange} placeholder="VD: Giáo trình PDF..." rows={3}></textarea>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: CURRICULUM BUILDER */}
                            {activeTab === 3 && (
                                <div className="tab-content curriculum-builder">
                                    <div className="curriculum-header">
                                        <h4>Chương trình giảng dạy</h4>
                                        <button type="button" onClick={addModule} className="btn-add-module">+ Thêm Chương</button>
                                    </div>
                                    
                                    <div className="modules-list">
                                        {currentCourse.modules.map((module, mIndex) => (
                                            <div key={mIndex} className="module-item">
                                                <div className="module-header">
                                                    <GripVertical size={18} className="drag-handle" />
                                                    <input 
                                                        type="text" 
                                                        value={module.title} 
                                                        onChange={(e) => updateModule(mIndex, 'title', e.target.value)}
                                                        className="module-title-input"
                                                        placeholder="Tên chương (VD: Module 1: Everyday Life)"
                                                    />
                                                    <button type="button" onClick={() => removeModule(mIndex)} className="btn-icon-delete"><Trash2 size={16}/></button>
                                                </div>
                                                
                                                <div className="lessons-list">
                                                    {(module.lessons || []).map((lesson, lIndex) => (
                                                        <div key={lIndex} className="lesson-item">
                                                            <GripVertical size={16} className="drag-handle-sm" />
                                                            <div className="lesson-inputs">
                                                                <input 
                                                                    type="text" 
                                                                    value={lesson.title} 
                                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                                                    placeholder="Tên bài học"
                                                                    className="flex-2"
                                                                />
                                                                <input 
                                                                    type="text" 
                                                                    value={lesson.duration} 
                                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'duration', e.target.value)}
                                                                    placeholder="Thời lượng (12:45)"
                                                                    className="flex-1"
                                                                />
                                                                <select value={lesson.lessonType} onChange={(e) => updateLesson(mIndex, lIndex, 'lessonType', e.target.value)} className="flex-1">
                                                                    <option value="VIDEO">Video</option>
                                                                    <option value="TEXT">Văn bản</option>
                                                                    <option value="QUIZ">Bài tập</option>
                                                                </select>
                                                                <input 
                                                                    type="text" 
                                                                    value={lesson.videoUrl} 
                                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'videoUrl', e.target.value)}
                                                                    placeholder="Link Video (Tùy chọn)"
                                                                    className="flex-2"
                                                                />
                                                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
                                                                    <input 
                                                                        type="checkbox" 
                                                                        checked={lesson.isPreview || false}
                                                                        onChange={(e) => updateLesson(mIndex, lIndex, 'isPreview', e.target.checked)}
                                                                    />
                                                                    Học thử
                                                                </label>
                                                            </div>
                                                            <button type="button" onClick={() => removeLesson(mIndex, lIndex)} className="btn-icon-delete"><Trash2 size={16}/></button>
                                                        </div>
                                                    ))}
                                                    <button type="button" onClick={() => addLesson(mIndex)} className="btn-add-lesson">+ Thêm bài học</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="modal-footer">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">Hủy</button>
                                <button type="submit" className="btn-save">{isEditing ? 'Cập nhật Khóa Học' : 'Lưu Khóa Học'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCoursesPage;
