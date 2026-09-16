<template>
  <div class="max-w-md mx-auto bg-gray-50 h-screen flex flex-col font-sans relative overflow-hidden shadow-2xl selection:bg-orange-200">
    
    <!-- ==================== MÀN HÌNH 1: TRANG CHỦ (DASHBOARD) ==================== -->
    <Transition name="fade">
      <div v-if="activeScreen === 'home'" class="absolute inset-0 flex flex-col h-full bg-slate-50">
        
        <!-- App Bar (Navy Blue) -->
        <header class="bg-slate-900 px-5 pt-8 pb-6 rounded-b-[32px] shadow-lg relative z-10">
          <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-black text-white tracking-wide">SURVEY<span class="text-orange-500">CAPACITOR</span></h1>
            <div class="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <div :class="isOnline ? 'bg-green-400' : 'bg-red-500'" class="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              <span class="text-[10px] font-bold text-slate-200 uppercase tracking-widest">{{ isOnline ? 'Online' : 'Offline' }}</span>
            </div>
          </div>
          
          <!-- Thống kê nhanh -->
          <div class="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center text-white">
            <div>
              <p class="text-xs text-slate-300 font-medium uppercase tracking-wider mb-1">Tổng số bản ghi</p>
              <p class="text-3xl font-black">{{ drafts.length }}<span class="text-sm font-normal text-slate-400 ml-1">mục</span></p>
            </div>
            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30">
              📊
            </div>
          </div>
        </header>

        <!-- Danh sách -->
        <main class="flex-1 overflow-y-auto px-5 py-6 pb-24">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Hoạt động gần đây</h3>
          
          <div v-if="drafts.length === 0" class="flex flex-col items-center justify-center py-16 opacity-50">
            <svg class="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-slate-500 font-bold">Chưa có dữ liệu khảo sát</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in drafts" :key="item.id" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <img v-if="item.photoBase64" :src="item.photoBase64" class="w-14 h-14 rounded-xl object-cover bg-slate-100" />
              <div v-else class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-xl">📄</div>
              
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-slate-800 text-sm truncate">{{ item.title }}</h4>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{{ item.category }}</span>
                  <span :class="item.condition === 'Kém' ? 'text-red-500' : 'text-green-600'" class="text-[10px] font-bold">• {{ item.condition }}</span>
                </div>
              </div>
              
              <!-- Nút trạng thái -->
              <div :class="item.status === 'draft' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-green-50 text-green-600 border-green-200'" class="w-8 h-8 rounded-full border flex items-center justify-center shadow-sm">
                <svg v-if="item.status === 'draft'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>
        </main>

        <!-- Nút FAB (Floating Action Button) cực ngầu -->
        <button @click="activeScreen = 'form'" class="absolute bottom-6 right-6 w-16 h-16 bg-orange-500 text-white rounded-2xl shadow-[0_8px_20px_rgba(249,115,22,0.4)] flex items-center justify-center text-3xl font-light hover:bg-orange-600 active:scale-90 transition-all z-20">
          +
        </button>
      </div>
    </Transition>

    <!-- ==================== MÀN HÌNH 2: FORM NHẬP LIỆU ==================== -->
    <Transition name="slide-up">
      <div v-if="activeScreen === 'form'" class="absolute inset-0 flex flex-col h-full bg-white z-50">
        <!-- Header có nút Back -->
        <header class="bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button @click="activeScreen = 'home'" class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h2 class="text-lg font-black text-slate-800 tracking-tight">Thêm Bản Ghi Mới</h2>
        </header>

        <!-- Gọi Component Form -->
        <main class="flex-1 overflow-y-auto">
          <SurveyForm @saved="handleSaved" />
        </main>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SurveyForm from './components/SurveyForm.vue';
import { db, type SurveyRecord } from './db/database';

const isOnline = ref(navigator.onLine);
const drafts = ref<SurveyRecord[]>([]);
const activeScreen = ref<'home' | 'form'>('home'); // Quản lý chuyển trang

window.addEventListener('online', () => isOnline.value = true);
window.addEventListener('offline', () => isOnline.value = false);

const loadDrafts = async () => {
  drafts.value = await db.surveys.orderBy('id').reverse().toArray();
};

const handleSaved = () => {
  loadDrafts();
  activeScreen.value = 'home'; // Lưu xong tự động quay về trang chủ
};

onMounted(() => {
  loadDrafts();
});
</script>

<style>
/* CSS cho hiệu ứng chuyển trang y hệt Native App */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.slide-up-enter-from { transform: translateY(100%); }
.slide-up-leave-to { transform: translateY(100%); }

::-webkit-scrollbar { display: none; }
body { background-color: #0f172a; margin: 0; padding: 0; }
</style>