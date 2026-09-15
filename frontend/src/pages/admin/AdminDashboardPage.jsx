import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/api';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as XLSX from 'xlsx';

const AdminDashboardPage = () => {
    const [userStats, setUserStats] = useState({ totalStudents: 0, totalTeachers: 0 });
    const [courseStats, setCourseStats] = useState({ totalCourses: 0 });
    const [registrationStats, setRegistrationStats] = useState([]);
    const [revenueStats, setRevenueStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            try {
                // Fetch basic stats
                const userRes = await axiosInstance.get('/api/v1/users/admin/dashboard-stats');
                setUserStats(userRes.data.data);

                const courseRes = await axiosInstance.get('/api/v1/courses/admin/dashboard-stats');
                setCourseStats(courseRes.data.data);

                // Fetch monthly stats
                const regRes = await axiosInstance.get('/api/v1/users/admin/registration-stats');
                setRegistrationStats(regRes.data.data);

                const revRes = await axiosInstance.get('/api/v1/orders/admin/revenue-stats');
                setRevenueStats(revRes.data.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const exportToExcel = () => {
        const data = [];
        for (let i = 0; i < 12; i++) {
            data.push({
                'Tháng': `Tháng ${i + 1}`,
                'Số người đăng ký mới': registrationStats[i]?.users || 0,
                'Doanh thu (VNĐ)': revenueStats[i]?.revenue || 0
            });
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        
        // Auto fit width for columns
        const colWidths = [
            { wch: 10 }, // Tháng
            { wch: 25 }, // Số người đăng ký mới
            { wch: 20 }  // Doanh thu (VNĐ)
        ];
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Thống Kê");
        
        const currentYear = new Date().getFullYear();
        XLSX.writeFile(workbook, `bao_cao_thong_ke_${currentYear}.xlsx`);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
                <button 
                    onClick={exportToExcel}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors"
                >
                    Xuất Báo Cáo (Excel)
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                    <h3 className="text-lg text-gray-600 font-medium">Tổng Học Viên</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{userStats.totalStudents}</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                    <h3 className="text-lg text-gray-600 font-medium">Tổng Giáo Viên</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{userStats.totalTeachers}</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                    <h3 className="text-lg text-gray-600 font-medium">Tổng Khóa Học</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{courseStats.totalCourses}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Biểu đồ Doanh Thu */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Doanh Thu Theo Tháng (VNĐ)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueStats} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN').format(value)} />
                                <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ'} />
                                <Legend />
                                <Bar dataKey="revenue" name="Doanh thu" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ Người Dùng */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Học Viên Đăng Ký Mới</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={registrationStats} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" name="Số lượng học viên" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
