import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    vi: {
        translation: {
            "Classroom": "Lớp học",
            "Home": "Trang chủ",
            "Calendar": "Lịch",
            "Enrolled": "Đã tham gia",
            "To-do": "Việc cần làm",
            "Teaching": "Đang dạy",
            "To-review": "Việc cần duyệt",
            "Manage": "Quản lý",
            "Archived Class": "Lưu trữ",
            "Settings": "Cài đặt",
            "Profile": "Hồ sơ",
            "Email Address": "Địa chỉ Email",
            "First Name": "Họ",
            "Last Name": "Tên",
            "Change Password": "Đổi mật khẩu",
            "SAVE": "LƯU",
            "Other": "Khác",
            "Languages": "Ngôn ngữ",
            "Stream": "Bảng tin",
            "Classwork": "Bài tập trên lớp",
            "People": "Mọi người",
            "Grades": "Chấm điểm",
            "Class code": "Mã lớp",
            "Upcoming": "Sắp đến hạn",
            "No work due soon": "Không có bài tập nào sắp đến hạn",
            "View all": "Xem tất cả",
            "Announce something to your class": "Thông báo nội dung nào đó cho lớp học của bạn",
            "This is where you can talk to your class": "Đây là nơi bạn giao tiếp với lớp học của mình",
            "Use the stream to share announcements, post assignments, and respond to student questions": "Sử dụng bảng tin để thông báo, đăng bài tập và trả lời câu hỏi của học viên",
            "Stream settings": "Cài đặt bảng tin",
            "Teachers": "Giáo viên",
            "Students": "Học sinh",
            "Invite teachers": "Mời giáo viên",
            "Input teacher emails": "Nhập email giáo viên",
            "Teachers you add can do everything you can, except delete the class.": "Giáo viên mà bạn thêm có thể làm mọi thứ bạn làm, trừ xóa lớp học",
            "Cancel": "Hủy",
            "Invite": "Mời",
            "Invite students": "Mời học sinh",
            "Invite link": "Đường liên kết mời",
            "Input student emails": "Nhập email học sinh",
            "Accounts": "Tài khoản",
            "Classes": "Lớp",
            "Hi": "Xin chào",
            "Manage your Account": "Quản lý tài khoản",
            "Sign out": "Đăng xuất",
            "You are banned from participating in any class activities at the moment. Please reach out to the administrators for assistance.": "Bạn bị cấm tham gia bất kỳ hoạt động nào của Lớp học vào lúc này. Vui lòng liên hệ với quản trị viên để được hỗ trợ.",
            "": "",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
    });

export default i18n;