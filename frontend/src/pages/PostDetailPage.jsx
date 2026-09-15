import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PostDetailPage.css';

const PostDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/v1/posts/${id}`);
                if (res.data && res.data.data) {
                    setPost(res.data.data);
                } else {
                    alert('Không tìm thấy bài viết');
                    navigate('/');
                }
            } catch (error) {
                console.error('Lỗi khi tải bài viết:', error);
                alert('Không tìm thấy bài viết hoặc có lỗi xảy ra');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, navigate]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="post-detail-main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <h2>Đang tải nội dung...</h2>
                </main>
                <Footer />
            </>
        );
    }

    if (!post) return null;

    return (
        <>
            <Header />
            <main className="post-detail-main">
                <div className="post-detail-container">
                    <h1 className="post-detail-title">{post.title}</h1>
                    <div className="post-detail-meta">
                        <span>Đăng ngày: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    
                    {/* Render HTML content safely */}
                    <div 
                        className="post-detail-content ql-editor"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PostDetailPage;
