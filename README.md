# FastFood Express

FastFood Express là một dự án website bán đồ ăn nhanh được xây dựng theo kiến trúc microservices. Dự án nhằm cung cấp một nền tảng đặt đồ ăn nhanh, tiện lợi và dễ mở rộng, được phát triển bằng NodeJS, Express, React, Docker và tích hợp quy trình CI/CD.

---

## Mục Tiêu Dự Án

- **Cung cấp dịch vụ đặt đồ ăn nhanh:** Cho phép người dùng duyệt thực đơn, đặt hàng và thanh toán trực tuyến.
- **Kiến trúc microservices:** Phân tách hệ thống thành các dịch vụ độc lập (User, Menu, Order, Payment, Notification & Review) để tăng tính mở rộng và dễ bảo trì.
- **Tự động hóa quy trình phát triển:** Tích hợp Docker, Docker Compose và CI/CD để đảm bảo chất lượng và tốc độ phát triển.

---

## Kiến Trúc Hệ Thống

Dự án được chia thành các microservice chính:

- **User Service:** Quản lý người dùng, đăng ký, đăng nhập và quản lý thông tin cá nhân.
- **Menu Service:** Quản lý cửa hàng và thực đơn.
- **Order Service:** Xử lý giỏ hàng và đơn đặt hàng.
- **Payment Service:** Xử lý thanh toán và giao dịch.
- **Notification & Review Service:** Gửi thông báo và quản lý phản hồi, đánh giá của người dùng.

Các dịch vụ giao tiếp với nhau thông qua REST API và được container hóa bằng Docker để triển khai dễ dàng.

---

## Công Nghệ Sử Dụng

- **Backend:** NodeJS, Express
- **Frontend:** React (hoặc HTML/CSS/JS ban đầu, có thể chuyển dần sang React)
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions (hoặc Jenkins, GitLab CI)
- **Cơ sở dữ liệu:** (Có thể sử dụng MongoDB, PostgreSQL tùy theo yêu cầu)

---

### Yêu Cầu
- Docker và Docker Compose
- NodeJS (phiên bản 14+)

