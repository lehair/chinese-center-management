import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminTeachersPage from './pages/admin/AdminTeachersPage'
import AdminCoursesPage from './pages/admin/AdminCoursesPage'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'
import AdminPostsPage from './pages/admin/AdminPostsPage'
import PostDetailPage from './pages/PostDetailPage'
import LichKhaiGiangPage from './pages/LichKhaiGiangPage'
import KhuyenMaiThuongHaiPage from './pages/KhuyenMaiThuongHaiPage'
import TuyenDungGiaoVienPage from './pages/TuyenDungGiaoVienPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import PaymentFailedPage from './pages/PaymentFailedPage'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="164464636628-l621esvk8d9pehlo1vm6tkl759pfqtok.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/lich-khai-giang" element={<LichKhaiGiangPage />} />
          <Route path="/khuyen-mai-thuong-hai" element={<KhuyenMaiThuongHaiPage />} />
          <Route path="/tuyen-dung-giao-vien" element={<TuyenDungGiaoVienPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failed" element={<PaymentFailedPage />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="teachers" element={<AdminTeachersPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="posts" element={<AdminPostsPage />} />
          </Route>
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </GoogleOAuthProvider>
    </ErrorBoundary>
  )
}

export default App
