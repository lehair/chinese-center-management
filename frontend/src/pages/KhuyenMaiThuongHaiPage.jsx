import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const KhuyenMaiThuongHaiPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rawHtml = `
<main class="w-full">
<div class="flex flex-col w-full font-body-md text-on-surface bg-background">
<!-- Hero Section -->
<section class="relative w-full pb-section-padding pt-stack-lg lg:pt-section-padding overflow-hidden">
<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-fixed/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-fixed/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
<div class="max-w-container-max mx-auto px-gutter relative z-10">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
<div class="flex flex-col gap-stack-md">
<div class="inline-flex items-center gap-2 bg-secondary-fixed/50 text-on-secondary-fixed-variant px-4 py-1.5 rounded-full font-label-bold text-label-bold w-fit">
<span class="material-symbols-outlined text-[16px]">flight_takeoff</span>
            Siêu Ưu Đãi Tháng 6</div>
<h1 class="font-display-xl text-display-xl text-on-surface">Đăng Ký Liền Tay<br><span class="text-primary">Vi Vu Thượng Hải</span></h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-[500px]">
            Học tiếng Trung chuẩn 5S - Trúng ngay chuyến du lịch Thượng Hải 4 Ngày 3 Đêm trị giá 25.000.000 VNĐ. Cơ hội duy nhất trong năm!
          </p>
<div class="flex flex-wrap items-center gap-stack-sm pt-base">
<a href="#the-le" class="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-block text-center cursor-pointer">
              Xem Thể Lệ Ngay
            </a>
</div>
</div>
<div class="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
<div class="absolute inset-0 bg-cover bg-center" data-alt="Beautiful view of Shanghai skyline at night with The Bund and Oriental Pearl Tower" style="background-image: url('https://images.unsplash.com/photo-1548247661-3d7905940716?q=80&w=2000&auto=format&fit=crop')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end p-stack-md">
<div class="bg-surface/90 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 shadow-lg w-full max-w-[320px]">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span class="material-symbols-outlined text-[24px]">airplane_ticket</span>
</div>
<div>
<div class="font-label-bold text-label-bold text-on-surface">Tour Thượng Hải</div>
<div class="font-body-md text-body-md text-on-surface-variant text-sm">Miễn phí toàn bộ chi phí</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<!-- About Shanghai Trip Section -->
<section class="w-full py-section-padding bg-surface-container-low">
<div class="max-w-container-max mx-auto px-gutter">
<div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
    <div class="order-2 md:order-1 relative w-full aspect-square md:aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=2000&auto=format&fit=crop')"></div>
    </div>
    <div class="order-1 md:order-2 flex flex-col gap-stack-md">
        <h2 class="font-headline-lg text-headline-lg text-on-surface">Khám Phá Thượng Hải Phồn Hoa</h2>
        <div class="h-1 w-16 bg-secondary rounded-full"></div>
        <p class="font-body-md text-body-md text-on-surface-variant">
            Giải nhất của chương trình là một chuyến đi 4 Ngày 3 Đêm trọn gói đến Thượng Hải - thành phố sầm uất và hiện đại bậc nhất Trung Quốc. 
            Bạn sẽ có cơ hội được thực hành tiếng Trung trực tiếp với người bản xứ ngay tại quê hương của họ.
        </p>
        <ul class="flex flex-col gap-4 mt-2">
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface"><strong>Vé máy bay khứ hồi:</strong> Hãng hàng không quốc gia hạng sang.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface"><strong>Khách sạn 5 sao:</strong> Nghỉ dưỡng tại trung tâm Bến Thượng Hải sầm uất.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface"><strong>Tour Ẩm thực:</strong> Thưởng thức Tiểu Long Bao và các món ăn trứ danh.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface"><strong>Hướng dẫn viên VIP:</strong> Hỗ trợ và dẫn đoàn trong suốt chuyến đi.</span>
            </li>
        </ul>
    </div>
</div>
</div>
</section>

<!-- Prizes Section -->
<section class="w-full py-section-padding bg-surface-container-lowest">
<div class="max-w-container-max mx-auto px-gutter">
<div class="flex flex-col gap-stack-sm text-center mb-stack-lg items-center">
<h2 class="font-headline-lg text-headline-lg text-on-surface">Cơ Cấu Giải Thưởng</h2>
<div class="h-1 w-16 bg-secondary rounded-full"></div>
<p class="font-body-md text-body-md text-on-surface-variant max-w-[600px]">Dành riêng cho 100 học viên đăng ký đầu tiên. Bốc thăm trúng thưởng công khai vào cuối tháng.</p>
</div>
<div class="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-surface p-6 rounded-2xl border-2 border-secondary/50 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div class="absolute top-0 right-0 bg-secondary text-on-secondary px-4 py-1 rounded-bl-xl font-label-bold text-sm">Đặc Biệt</div>
        <div class="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container mb-4">
            <span class="material-symbols-outlined text-[32px]">emoji_events</span>
        </div>
        <h3 class="font-headline-md text-[20px] text-on-surface mb-2">1 Giải Nhất</h3>
        <p class="font-body-md text-on-surface-variant">Chuyến du lịch Thượng Hải 4N3Đ trọn gói cho 1 người, nghỉ dưỡng khách sạn 5 sao.</p>
    </div>
    <div class="bg-surface p-6 rounded-2xl border border-outline-variant shadow-md hover:shadow-lg transition-all">
        <div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface mb-4">
            <span class="material-symbols-outlined text-[32px]">laptop_mac</span>
        </div>
        <h3 class="font-headline-md text-[20px] text-on-surface mb-2">2 Giải Nhì</h3>
        <p class="font-body-md text-on-surface-variant">Học bổng 100% học phí toàn khóa học + iPad Gen 10 hỗ trợ học tập.</p>
    </div>
    <div class="bg-surface p-6 rounded-2xl border border-outline-variant shadow-md hover:shadow-lg transition-all">
        <div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface mb-4">
            <span class="material-symbols-outlined text-[32px]">redeem</span>
        </div>
        <h3 class="font-headline-md text-[20px] text-on-surface mb-2">10 Giải Ba</h3>
        <p class="font-body-md text-on-surface-variant">Voucher giảm giá 50% học phí + Bộ giáo trình HSK độc quyền.</p>
    </div>
</div>
</div>
</section>

<!-- Rules Section -->
<section id="the-le" class="w-full py-section-padding bg-secondary-fixed-dim/20 relative overflow-hidden">
<div class="max-w-container-max mx-auto px-gutter relative z-10 flex flex-col items-center text-center">
<div class="inline-block bg-secondary text-on-secondary px-4 py-1.5 rounded-full font-label-bold text-label-bold uppercase w-fit tracking-wider mb-4">
    Thể lệ chương trình
</div>
<h2 class="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Làm Sao Để Tham Gia?</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[900px]">
    <div class="bg-surface p-6 rounded-2xl shadow-md flex flex-col items-center text-center border border-outline-variant/30">
        <div class="w-16 h-16 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-4">
            <span class="material-symbols-outlined text-[32px]">how_to_reg</span>
        </div>
        <h4 class="font-headline-md text-[18px] text-on-surface mb-2">Bước 1: Đăng ký khóa học</h4>
        <p class="font-body-md text-on-surface-variant">Liên hệ chuyên viên tư vấn và hoàn tất thủ tục nhập học bất kỳ khóa học nào trước ngày 30/06.</p>
    </div>
    
    <div class="bg-surface p-6 rounded-2xl shadow-md flex flex-col items-center text-center border border-outline-variant/30">
        <div class="w-16 h-16 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-4">
            <span class="material-symbols-outlined text-[32px]">confirmation_number</span>
        </div>
        <h4 class="font-headline-md text-[18px] text-on-surface mb-2">Bước 2: Nhận mã dự thưởng</h4>
        <p class="font-body-md text-on-surface-variant">Mỗi học viên đăng ký thành công sẽ nhận được 01 mã số may mắn qua Email cá nhân.</p>
    </div>
    
    <div class="bg-surface p-6 rounded-2xl shadow-md flex flex-col items-center text-center border border-outline-variant/30">
        <div class="w-16 h-16 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-4">
            <span class="material-symbols-outlined text-[32px]">live_tv</span>
        </div>
        <h4 class="font-headline-md text-[18px] text-on-surface mb-2">Bước 3: Đón xem bốc thăm</h4>
        <p class="font-body-md text-on-surface-variant">Livestream bốc thăm công khai trên Fanpage Trung tâm vào lúc 20:00 ngày 05/07.</p>
    </div>
</div>

<div class="mt-stack-lg">
    <button class="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-10 py-4 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-lg">
        Liên Hệ Chuyên Viên Ngay
    </button>
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

export default KhuyenMaiThuongHaiPage;
