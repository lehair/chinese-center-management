import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import axiosInstance from '../utils/api';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Chào bạn! Mình là Trợ lý ảo tiếng trung 5s. Mình có thể giúp gì cho bạn hôm nay?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputValue('');
        setIsTyping(true);

        try {
            const res = await axiosInstance.post('/api/v1/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, { role: 'bot', content: res.data.data.reply }]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { role: 'bot', content: 'Xin lỗi, hiện tại hệ thống đang bận. Vui lòng thử lại sau.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-widget-container">
            {!isOpen && (
                <button className="chat-widget-button" onClick={() => setIsOpen(true)}>
                    💬
                </button>
            )}

            {isOpen && (
                <div className="chat-widget-window">
                    <div className="chat-widget-header">
                        <h3>Trợ lý ảo tiếng trung 5s</h3>
                        <button className="chat-widget-close" onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chat-widget-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-typing">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chat-widget-input" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            placeholder="Nhập tin nhắn..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isTyping}
                        />
                        <button type="submit" disabled={isTyping || !inputValue.trim()}>
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
