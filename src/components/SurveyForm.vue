<template>
  <form @submit.prevent="saveSurvey" class="p-5 space-y-6 pb-24">
    
    <!-- 1. Tên khu vực (Input dạng gạch chân / Underline style) -->
    <div class="relative bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mã / Tên Đối Tượng</label>
      <input 
        v-model="formData.title" required type="text" 
        class="w-full bg-transparent text-slate-900 font-bold text-lg outline-none" 
        placeholder="Nhập tên khu vực..." 
      />
    </div>

    <!-- 2. Loại hình (Grid Options thay vì Select Box để chọn nhanh bằng 1 chạm) -->
    <div>
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Phân loại hạng mục</label>
      <div class="grid grid-cols-2 gap-3">
        <label v-for="cat in ['Hạ tầng', 'Môi trường', 'Dân cư', 'Khẩn cấp']" :key="cat" class="cursor-pointer">
          <input type="radio" v-model="formData.category" :value="cat" class="peer sr-only" />
          <div class="text-center py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-bold transition-all peer-checked:border-slate-900 peer-checked:bg-slate-900 peer-checked:text-white">
            {{ cat }}
          </div>
        </label>
      </div>
    </div>

    <!-- 3. Tình trạng -->
    <div>
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Mức độ cảnh báo</label>
      <div class="flex bg-slate-100 p-1 rounded-xl">
        <label v-for="option in ['Tốt', 'Khá', 'Kém']" :key="option" class="flex-1 cursor-pointer">
          <input type="radio" v-model="formData.condition" :value="option" class="peer sr-only" />
          <div class="text-center py-2.5 rounded-lg text-sm font-bold text-slate-500 transition-all peer-checked:bg-white peer-checked:text-orange-600 peer-checked:shadow-sm">
            {{ option }}
          </div>
        </label>
      </div>
    </div>

    <!-- 4. Tọa độ GPS -->
    <div>
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Dữ liệu không gian</label>
      <div class="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p class="text-sm font-bold text-slate-800">Tọa độ vệ tinh</p>
          <p class="text-xs text-orange-600 font-mono font-bold mt-1">
            {{ formData.latitude ? `${formData.latitude.toFixed(5)}, ${formData.longitude?.toFixed(5)}` : 'Chưa đồng bộ' }}
          </p>
        </div>
        <button type="button" @click="getLocation" class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md active:scale-90 transition-all">
          <svg v-if="!isLocating" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span v-else class="animate-spin font-bold text-sm">⏳</span>
        </button>
      </div>
    </div>

    <!-- 5. Ghi chú -->
    <div class="relative bg-slate-50 p-3 rounded-xl border border-slate-200 focus-within:border-orange-500 transition-all">
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ghi chú hiện trường</label>
      <textarea 
        v-model="formData.description" rows="2" 
        class="w-full bg-transparent text-slate-700 text-sm outline-none resize-none" 
        placeholder="Nhập mô tả chi tiết..."></textarea>
    </div>

    <!-- 6. Camera -->
    <div>
      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tài liệu hình ảnh</label>
      <div v-if="!formData.photoBase64" class="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center active:bg-slate-100 transition-all">
        <input type="file" accept="image/*" capture="environment" @change="handlePhotoUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <svg class="w-8 h-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <span class="text-sm font-bold text-slate-500">Mở Máy Ảnh</span>
      </div>
      <div v-else class="relative">
        <img :src="formData.photoBase64" class="w-full h-48 object-cover rounded-xl border border-slate-200 shadow-sm" />
        <button type="button" @click="formData.photoBase64 = null" class="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full text-white flex items-center justify-center hover:bg-red-500 transition-all z-20">
          ✕
        </button>
      </div>
    </div>

    <!-- Nút Submit cố định đáy -->
    <div class="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 z-20">
      <button type="submit" class="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-transform">
        LƯU DỮ LIỆU
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { db, type SurveyRecord } from '../db/database';

const formData = ref<Partial<SurveyRecord>>({
  title: '', category: 'Hạ tầng', condition: 'Tốt', description: '', latitude: null, longitude: null, photoBase64: null,
});
const isLocating = ref(false);
const emit = defineEmits(['saved']);

const getLocation = () => {
  isLocating.value = true;
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => { formData.value.latitude = pos.coords.latitude; formData.value.longitude = pos.coords.longitude; isLocating.value = false; },
      () => { alert('Lỗi GPS. Vui lòng cấp quyền vị trí!'); isLocating.value = false; },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }
};

const handlePhotoUpload = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => formData.value.photoBase64 = ev.target?.result as string;
    reader.readAsDataURL(file);
  }
};

const saveSurvey = async () => {
  try {
    await db.surveys.add({
      title: formData.value.title || 'Không tên', category: formData.value.category || 'Khác', condition: formData.value.condition || 'Tốt', description: formData.value.description || '', latitude: formData.value.latitude || null, longitude: formData.value.longitude || null, photoBase64: formData.value.photoBase64 || null, status: navigator.onLine ? 'synced' : 'draft', createdAt: new Date().toISOString()
    });
    formData.value = { title: '', category: 'Hạ tầng', condition: 'Tốt', description: '', latitude: null, longitude: null, photoBase64: null };
    emit('saved');
  } catch (error) { alert('Lỗi khi lưu!'); }
};
</script>