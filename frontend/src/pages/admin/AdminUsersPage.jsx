import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/api';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get('/api/v1/users/admin');
            setUsers(res.data.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosInstance.put(`/api/v1/users/admin/${userId}/role`, { role: newRole });
            fetchUsers();
        } catch (error) {
            console.error('Error changing role', error);
        }
    };

    return (
        <div>
            <h2>Quản lý Học viên & Giáo viên</h2>
            <table className="admin-table" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    style={{ padding: '5px', borderRadius: '4px' }}
                                >
                                    <option value="STUDENT">Học viên</option>
                                    <option value="TEACHER">Giáo viên</option>
                                    <option value="ADMIN">Quản trị viên</option>
                                </select>
                            </td>
                            <td>
                                <button style={{ padding: '5px 10px', backgroundColor: '#a3aed1', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Khóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;
