import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/api';
import { Editor } from '@tinymce/tinymce-react';

const AdminPostsPage = () => {
    const editorRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [isHtmlMode, setIsHtmlMode] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/posts');
            if (res.data && res.data.data) {
                setPosts(res.data.data);
            }
        } catch (error) {
            console.error('Lỗi lấy bài viết', error);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');
        let editorContent = content;
        if (!isHtmlMode && editorRef.current) {
            editorContent = editorRef.current.getContent();
        }
        
        if (!title || !editorContent) {
            alert('Vui lòng nhập đủ tiêu đề và nội dung');
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.post('/api/v1/posts/admin', {
                title,
                content: editorContent
            });
            alert('Tạo bài viết thành công!');
            fetchPosts();
            setTitle('');
            setContent('');
            if (editorRef.current) {
                editorRef.current.setContent('');
            }
        } catch (error) {
            console.error('Lỗi tạo bài viết', error);
            alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
        
        try {
            await axiosInstance.delete(`/api/v1/posts/admin/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post', error);
            alert('Có lỗi xảy ra khi xóa!');
        }
    };

    return (
        <div className="admin-posts-page" style={{ padding: '20px' }}>
            <style>{`.tox-notifications-container, .tox-statusbar__right-container { display: none !important; }`}</style>
            <h2>Quản lý Bài viết / Trang tĩnh</h2>
            <div style={{ backgroundColor: '#f4f7fe', padding: '20px', borderRadius: '10px', marginTop: '20px', marginBottom: '40px' }}>
                <h3>Tạo Bài viết Mới</h3>
                <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                    <input 
                        type="text" 
                        placeholder="Tiêu đề bài viết" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
                        <button 
                            type="button" 
                            onClick={() => {
                                if (!isHtmlMode && editorRef.current) {
                                    setContent(editorRef.current.getContent());
                                }
                                setIsHtmlMode(!isHtmlMode);
                            }}
                            style={{ 
                                padding: '5px 15px', 
                                backgroundColor: isHtmlMode ? '#10b981' : '#f59e0b', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}>
                            {isHtmlMode ? 'Chuyển về Giao diện kéo thả (TinyMCE)' : 'Chuyển sang Nhập Code HTML/CSS'}
                        </button>
                    </div>
                    
                    <div style={{ backgroundColor: 'white' }}>
                        {isHtmlMode ? (
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ width: '100%', height: '500px', padding: '15px', fontFamily: 'monospace', fontSize: '14px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#1e293b', color: '#f8fafc', boxSizing: 'border-box' }}
                                placeholder="Nhập mã HTML và <style>...</style> của bạn vào đây..."
                            />
                        ) : (
                            <Editor
                                tinymceScriptSrc="/tinymce/tinymce.min.js"
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={content}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    promotion: false,
                                    license_key: 'gpl',
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'table image link | code | removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    object_resizing: true,
                                    valid_elements: '*[*]',
                                    valid_children: '+body[style],+body[script],+div[style],+div[script]',
                                    extended_valid_elements: 'style[type],script[src|type]'
                                }}
                            />
                        )}
                    </div>

                    <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#4318ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '200px', marginTop: '20px' }}>
                        {loading ? 'Đang lưu...' : 'Lưu Bài viết'}
                    </button>
                </form>
            </div>

            <h3>Danh sách Bài viết</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#e2e8f0', textAlign: 'left' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Tiêu đề</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>URL để dán vào Banner</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{post.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{post.title}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={`http://localhost:5173/posts/${post.id}`} 
                                    style={{ width: '100%', padding: '5px' }}
                                    onClick={(e) => e.target.select()}
                                />
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                <a href={`/posts/${post.id}`} target="_blank" rel="noreferrer" style={{ marginRight: '10px', color: 'blue' }}>Xem</a>
                                <button onClick={() => handleDeletePost(post.id)} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPostsPage;
