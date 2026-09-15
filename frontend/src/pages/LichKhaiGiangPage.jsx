import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LichKhaiGiangPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rawHtml = `
<main class="w-full">
<div class="flex flex-col w-full font-body-md text-on-surface bg-background">
<section class="relative w-full pb-section-padding pt-stack-lg lg:pt-section-padding overflow-hidden">
<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-fixed/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-fixed/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
<div class="max-w-container-max mx-auto px-gutter relative z-10">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
<div class="flex flex-col gap-stack-md">
<div class="inline-flex items-center gap-2 bg-secondary-fixed/50 text-on-secondary-fixed-variant px-4 py-1.5 rounded-full font-label-bold text-label-bold w-fit">
<span class="material-symbols-outlined text-[16px]">calendar_month</span>
            Tháng 6 / 2026</div>
<h1 class="font-display-xl text-display-xl text-on-surface">Lịch Khai Giảng<br><span class="text-primary">Lớp Tiếng Trung Mới</span></h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-[500px]">
            Chinh phục tiếng Trung nhanh chóng và hiệu quả với lộ trình 5S độc quyền. Bắt đầu hành trình của bạn ngay hôm nay.
          </p>
<div class="flex flex-wrap items-center gap-stack-sm pt-base">
<button class="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Đăng ký ngay
            </button>

</div>
</div>
<div class="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
<div class="absolute inset-0 bg-cover bg-center" data-alt="A modern, brightly lit classroom with young Vietnamese students engaging enthusiastically in a Chinese language lesson. The teacher is pointing at a smartboard showing Chinese characters. Warm, optimistic lighting, high corporate educational aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLMQiteipnqpAGJOks33wi7WXtdq3ymq8zAUALKBtFkN5VoWhgvCKqPytnv15fxrgHAhG8V4JGKjW41dvQegsq2QKak8VawFpIMsMvspSiJ3gqfrOvYGwv_-JfEQbCvUXYQNHaDHte08anT-9tR89SPF-ExpY6oR_iajcX0O8bSGxrooOcIO6jWL0G_waVRlYYGles73_Tgl6MiKOT14KLCKAw9kKv0ioqNhFGpLJjJXC-h-mXe6al')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end p-stack-md">
<div class="bg-surface/90 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 shadow-lg w-full max-w-[320px]">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined text-[24px]">trending_up</span>
</div>
<div>
<div class="font-label-bold text-label-bold text-on-surface">Lộ trình 5S</div>
<div class="font-body-md text-body-md text-on-surface-variant text-sm">Tăng tốc học tập x2</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="w-full py-section-padding bg-surface-container-lowest">
<div class="max-w-container-max mx-auto px-gutter">
<div class="flex flex-col gap-stack-sm text-center mb-stack-lg items-center">
<h2 class="font-headline-lg text-headline-lg text-on-surface">Lịch Khai Giảng Chi Tiết</h2>
<div class="h-1 w-16 bg-secondary rounded-full"></div>
<p class="font-body-md text-body-md text-on-surface-variant max-w-[600px]">Chọn khóa học phù hợp với mục tiêu của bạn. Số lượng học viên mỗi lớp có hạn để đảm bảo chất lượng giảng dạy.</p>
</div>
<div class="overflow-x-auto pb-4">
<div class="min-w-[900px] w-full grid grid-cols-5 gap-4 bg-surface-container-low p-4 rounded-t-xl border-b-2 border-outline-variant font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
<div class="col-span-1">Khóa học</div>
<div class="col-span-1">Ngày khai giảng</div>
<div class="col-span-1">Lịch học</div>
<div class="col-span-1">Giảng viên</div>
<div class="col-span-1">Tình trạng</div>
</div>
<div class="flex flex-col gap-2 mt-2 min-w-[900px]">
<div class="grid grid-cols-5 gap-4 bg-surface p-4 rounded-lg items-center border border-outline-variant/30 hover:border-primary/30 hover:shadow-md transition-all group">
<div class="col-span-1 font-headline-md text-[18px] text-primary">HSK 1-2 Cơ bản</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-[20px]">calendar_today</span> 15/06/2026</div>
<div class="col-span-1 font-body-md text-body-md flex flex-col">
<span class="">Thứ 2 - 4 - 6</span>
<span class="text-on-surface-variant text-sm">18:30 - 20:30</span>
</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-3">
<img class="w-8 h-8 rounded-full object-cover" data-alt="Professional headshot of an Asian female Chinese teacher wearing a blazer." src="https://media.vov.vn/sites/default/files/styles/large/public/2025-09/luu-diec-phi-dai-su-toan-cau-bulgari-bvlgari-2023.jpg">
<span class="">Cô Lưu</span>
</div>
<div class="col-span-1 flex items-center justify-between">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-on-error-container text-sm font-label-bold">
<span class="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                Còn 5 chỗ
              </span>
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary-container">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
<div class="grid grid-cols-5 gap-4 bg-surface p-4 rounded-lg items-center border border-outline-variant/30 hover:border-primary/30 hover:shadow-md transition-all group">
<div class="col-span-1 font-headline-md text-[18px] text-primary">Giao tiếp Cơ bản</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-[20px]">calendar_today</span> 18/06/2026</div>
<div class="col-span-1 font-body-md text-body-md flex flex-col">
<span class="">Thứ 3 - 5 - 7</span>
<span class="text-on-surface-variant text-sm">19:00 - 21:00</span>
</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-3">
<img class="w-8 h-8 rounded-full object-cover" data-alt="Professional headshot of an Asian male Chinese teacher wearing a suit." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtRvumX0AuaHCUtk1KUiHMSXV0dZp59L3d4_Q4IP-vw&s=10">
<span class="">Thầy Hứa</span>
</div>
<div class="col-span-1 flex items-center justify-between">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-sm font-label-bold">
                Sắp khai giảng
              </span>
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary-container">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
<div class="grid grid-cols-5 gap-4 bg-surface p-4 rounded-lg items-center border border-outline-variant/30 hover:border-primary/30 hover:shadow-md transition-all group">
<div class="col-span-1 font-headline-md text-[18px] text-primary">HSK 3 Cấp tốc</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-2">
<span class="material-symbols-outlined text-outline text-[20px]">calendar_today</span> 22/06/2026</div>
<div class="col-span-1 font-body-md text-body-md flex flex-col">
<span class="">Thứ 7 - CN</span>
<span class="text-on-surface-variant text-sm">08:30 - 11:30</span>
</div>
<div class="col-span-1 font-body-md text-body-md flex items-center gap-3">
<img class="w-8 h-8 rounded-full object-cover" data-alt="Professional headshot of an Asian female Chinese teacher smiling." src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPXV-pScb_2NBSHJm3Fkusp3MmETfpnJB28JZKhbw5pDjJZt1gcGVoPXI&s=10">
<span class="">Thầy Tào</span>
</div>
<div class="col-span-1 flex items-center justify-between">
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-sm font-label-bold">
                Mới mở
              </span>
<button class="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary-container">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
<section class="w-full py-section-padding bg-secondary-fixed-dim/20 relative overflow-hidden">
<div class="max-w-container-max mx-auto px-gutter relative z-10">
<div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
<div class="flex flex-col gap-stack-md">
<div class="inline-block bg-secondary text-on-secondary px-4 py-1.5 rounded-full font-label-bold text-label-bold uppercase w-fit tracking-wider">
            Ưu đãi đặc biệt
          </div>
<h2 class="font-headline-lg text-headline-lg text-on-surface">Đăng Ký Sớm,<br>Nhận Ngay Ưu Đãi Lớn</h2>
<div class="flex flex-col gap-4 mt-4">
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-full bg-surface shadow-sm flex items-center justify-center text-secondary shrink-0 mt-1">
<span class="material-symbols-outlined">sell</span>
</div>
<div>
<h4 class="font-headline-md text-[18px] text-on-surface">Giảm 20% học phí</h4>
<p class="font-body-md text-body-md text-on-surface-variant">Áp dụng khi đăng ký và hoàn thành học phí trước ngày 10/06.</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-full bg-surface shadow-sm flex items-center justify-center text-secondary shrink-0 mt-1">
<span class="material-symbols-outlined">menu_book</span>
</div>
<div>
<h4 class="font-headline-md text-[18px] text-on-surface">Tặng bộ giáo trình độc quyền</h4>
<p class="font-body-md text-body-md text-on-surface-variant">Bao gồm PDF, bài tập thực hành và tài liệu nghe chuẩn HSK.</p>
</div>
</div>
<div class="flex items-start gap-4">
<div class="w-10 h-10 rounded-full bg-surface shadow-sm flex items-center justify-center text-secondary shrink-0 mt-1">
<span class="material-symbols-outlined">celebration</span>
</div>
<div>
<h4 class="font-headline-md text-[18px] text-on-surface">Miễn phí buổi học thử</h4>
<p class="font-body-md text-body-md text-on-surface-variant">Trải nghiệm phương pháp 5S miễn phí buổi đầu tiên.</p>
</div>
</div>
</div>
</div>
<div class="bg-surface p-stack-md rounded-2xl shadow-xl border border-secondary-fixed/50 flex flex-col gap-stack-sm">
<h3 class="font-headline-md text-headline-md text-center text-primary mb-2">Nhận tư vấn miễn phí</h3>
<p class="font-body-md text-body-md text-center text-on-surface-variant mb-4">Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong vòng 24h.</p>
<form class="flex flex-col gap-4">
<div>
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Họ và tên" type="text" />
</div>
<div>
<input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Số điện thoại" type="tel" />
</div>
<div>
<select class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue="">
<option disabled value="">Khóa học quan tâm</option>
<option value="hsk12">HSK 1-2 Cơ bản</option>
<option value="giaotiep">Giao tiếp Cơ bản</option>
<option value="hsk3">HSK 3 Cấp tốc</option>
</select>
</div>
<button class="w-full bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold py-4 rounded-lg mt-2 transition-all shadow-md" type="button">
              Đăng ký nhận tư vấn
            </button>
</form>
</div>
</div>
</div>
</section>
</div>
</main>
    `;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fcf9f8' }}>
            <Header />
            <div 
                className="bg-background font-body-md text-on-surface"
                dangerouslySetInnerHTML={{ __html: rawHtml }} 
                style={{ flex: 1 }}
            />
            <Footer />
        </div>
    );
};

export default LichKhaiGiangPage;
