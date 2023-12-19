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
            "": "",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng:'vn',
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
    });

export default i18n;