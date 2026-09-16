# 📱 Capacitor Field Survey (Native App)

Dự án phát triển ứng dụng di động đa nền tảng (Cross-platform Mobile App) phục vụ công tác khảo sát hiện trường. Khác với kiến trúc PWA truyền thống, dự án này sử dụng **Capacitor** để đóng gói mã nguồn Web thành ứng dụng Native thực thụ trên Android/iOS, cho phép can thiệp sâu vào phần cứng thiết bị.

---

> 🔗 **Trải nghiệm trực tiếp ứng dụng (Live Demo Web Mode):** 
>
> [https://trcongthanh-field-survey-capacitor.netlify.app](https://trcongthanh-field-survey-capacitor.netlify.app)

*(Lưu ý: Link Demo chạy trên nền tảng Web. Để trải nghiệm 100% sức mạnh phần cứng như một Native App, vui lòng build qua Android Studio theo hướng dẫn bên dưới).*

---

## ✨ Điểm nổi bật về UX/UI (Bản nâng cấp)
* **Kiến trúc Multi-Screen:** Tách biệt màn hình Dashboard tổng quan và Màn hình Nhập liệu (Slide-up animation), loại bỏ hoàn toàn cảm giác "cuộn trang web".
* **Giao diện Industrial Pro:** Sử dụng tone màu Navy/Orange độ tương phản cao, tối ưu hiển thị ngoài trời nắng cho kỹ sư công trường.
* **Tối ưu Cảm ứng (Touch-first):** Thay thế các thẻ Dropdown cũ bằng Grid Buttons 1 chạm. Tích hợp Floating Action Button (FAB) và Sticky Submit Button.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

* **Core Framework:** Vue 3 (Composition API) + TypeScript + Vite
* **Native Bridge:** Ionic Capacitor (Core, Android, CLI)
* **Styling:** Tailwind CSS v4 (Soft UI / Material You Design)
* **Local Database:** Dexie.js (Offline-first architecture)
* **Deployment:** Netlify

---

## 🚀 Tính năng cốt lõi
1. **Offline-first & Auto-sync:** Hoạt động độc lập không cần Internet. Toàn bộ dữ liệu được lưu trữ an toàn qua IndexedDB và sẵn sàng đồng bộ khi có mạng.
2. **Hardware Access:** 
   * Thu thập tọa độ không gian (GPS) cực kỳ chính xác qua API hệ điều hành.
   * Truy cập Camera thiết bị để đính kèm hình ảnh hiện trường (Base64).
3. **Cross-Platform Build:** Khả năng biên dịch ra file `.apk` (Android) hoặc `.ipa` (iOS) để phân phối trực tiếp hoặc đưa lên App Store/Google Play.

---

## 💻 Hướng dẫn chạy dự án (Dành cho Developer)

### 1. Cài đặt môi trường
Đảm bảo máy tính đã cài đặt **Node.js** (v18+) và **Android Studio** (nếu muốn build APK).

```bash
# Clone dự án
git clone [https://github.com/trCongThanh/field-survey-capacitor.git](https://github.com/trCongThanh/field-survey-capacitor.git)
cd field-survey-capacitor

# Cài đặt thư viện
npm install
