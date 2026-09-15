# Hệ Thống Quản Lý Trung Tâm Tiếng Trung 5S (Chinese Center Management)

Đây là hệ thống quản lý trung tâm giảng dạy tiếng Trung được xây dựng theo kiến trúc Microservices, bao gồm hệ thống Backend đa dịch vụ và Frontend ứng dụng React (Vite).

## 🚀 Tính Năng Chính
- **Quản lý khóa học:** Xem danh sách, chi tiết khóa học, lộ trình học tập.
- **Thanh toán & Đăng ký:** Hỗ trợ tính năng thanh toán tự động (VietQR/Thủ công), ghi nhận đơn hàng và tự động cấp quyền vào học.
- **Quản lý học viên:** Đăng nhập, đăng ký, xem tiến độ học tập.
- **Thông báo:** Thông báo thời gian thực về trạng thái học tập và thanh toán.

## 🏗 Kiến Trúc Hệ Thống (Microservices)
Hệ thống Backend được thiết kế dựa trên Spring Boot & Spring Cloud, bao gồm các thành phần sau:
- **`discovery-server`**: Service Registry (Eureka Server) để quản lý và định tuyến các dịch vụ.
- **`api-gateway`**: Cổng giao tiếp API tổng (Spring Cloud Gateway) định tuyến request từ Frontend tới các services.
- **`user-service`**: Quản lý thông tin tài khoản người dùng, phân quyền.
- **`course-service`**: Quản lý dữ liệu khóa học, bài học.
- **`order-service`**: Xử lý logic tạo đơn hàng, thanh toán và liên kết ngân hàng.
- **`enrollment-service`**: Quản lý ghi danh khóa học, cấp quyền học và theo dõi tiến độ học tập.
- **`notification-service`**: Dịch vụ thông báo (email, hệ thống) dựa trên message queue.
- **`ai-service`**: Dịch vụ tích hợp AI (ví dụ: chấm điểm phát âm, trả lời tự động).
- **`common-libs`**: Chứa các thư viện và DTO dùng chung cho nhiều dịch vụ.

## 🛠 Công Nghệ Sử Dụng
- **Backend**: Java (JDK 17+), Spring Boot, Spring Cloud, JPA/Hibernate.
- **Frontend**: React.js (Vite), Tailwind CSS, Lucide React, Axios.
- **Cơ sở hạ tầng & Database**: Docker, PostgreSQL (Database), Redis (Caching), RabbitMQ (Message Broker).

## 📋 Yêu Cầu Cài Đặt
Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt các phần mềm sau:
- [Java Development Kit (JDK) 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) hoặc cao hơn.
- [Node.js](https://nodejs.org/) (Phiên bản 18+).
- [Docker & Docker Compose](https://www.docker.com/).

## 💻 Hướng Dẫn Chạy Dự Án (Local Development)

### Bước 1: Khởi động cơ sở hạ tầng (Database & Services)
Dự án yêu cầu PostgreSQL, Redis và RabbitMQ. Đảm bảo Docker đang chạy trên máy tính của bạn, sau đó mở Terminal tại thư mục gốc của dự án và chạy:
```bash
docker compose up -d
```

### Bước 2: Khởi động hệ thống Backend Microservices
Bạn có thể khởi động toàn bộ các dịch vụ tự động thông qua script PowerShell đã được chuẩn bị sẵn:
1. Mở PowerShell dưới quyền quản trị hoặc tại thư mục gốc.
2. Chạy lệnh:
   ```powershell
   .\start-all.ps1
   ```
*Lưu ý: Bạn cũng có thể khởi chạy thủ công từng service bằng lệnh `./mvnw spring-boot:run -pl <tên-service>` nếu muốn theo dõi log chi tiết của một service cụ thể.*

### Bước 3: Khởi động Frontend
1. Mở một cửa sổ Terminal mới và di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện (chỉ cần làm lần đầu tiên):
   ```bash
   npm install
   ```
3. Khởi động server phát triển Vite:
   ```bash
   npm run dev
   ```
4. Truy cập giao diện ứng dụng tại URL: `http://localhost:5173`

## ⚙️ Cấu Hình Khác
- **Biến môi trường Frontend**: Tham khảo hoặc tạo file `.env` trong thư mục `frontend/` để cấu hình thông tin ngân hàng thanh toán (như `VITE_BANK_ID`, `VITE_ACCOUNT_NO`, v.v.).
- **Tạo Dữ liệu mẫu ban đầu**: File `init.sql` ở thư mục gốc sẽ tự động chạy trong lần khởi tạo Docker PostgreSQL đầu tiên để tạo các database cần thiết.
