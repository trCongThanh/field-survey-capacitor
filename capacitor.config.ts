import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.truongcongthanh.fieldsurvey',
  appName: 'Field Survey Cap',
  webDir: 'dist',
  // THÊM ĐOẠN SERVER NÀY VÀO ĐỂ CODE LIVE RELOAD
  server: {
    url: 'http://192.168.1.89:5173', // THAY BẰNG IP IPv4 WIFI CỦA MÁY TÍNH BẠN
    cleartext: true
  }
};

export default config;