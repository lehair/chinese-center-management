import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TuyenDungGiaoVienPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const rawHtml = `
<main class="w-full">
<div class="flex flex-col w-full font-body-md text-on-surface bg-background">
<!-- Hero Section -->
<section class="relative w-full pb-section-padding pt-stack-lg lg:pt-section-padding overflow-hidden">
<div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-fixed/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary-fixed/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
<div class="max-w-container-max mx-auto px-gutter relative z-10">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-center">
<div class="flex flex-col gap-stack-md">
<div class="inline-flex items-center gap-2 bg-primary-fixed/50 text-on-primary-fixed-variant px-4 py-1.5 rounded-full font-label-bold text-label-bold w-fit">
<span class="material-symbols-outlined text-[16px]">work</span>
            Cơ hội nghề nghiệp</div>
<h1 class="font-display-xl text-display-xl text-on-surface">Gia Nhập Đội Ngũ<br><span class="text-primary">Giáo Viên Tiếng Trung</span></h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-[500px]">
            Trở thành người truyền cảm hứng ngôn ngữ tại trung tâm tiếng Trung hàng đầu. Môi trường chuyên nghiệp, thu nhập hấp dẫn và lộ trình thăng tiến rõ ràng!
          </p>
<div class="flex flex-wrap items-center gap-stack-sm pt-base">
<a href="#ung-tuyen" class="bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold px-8 py-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-block text-center cursor-pointer">
              Ứng Tuyển Ngay
            </a>
</div>
</div>
<div class="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
<div class="absolute inset-0 bg-cover bg-center" data-alt="Professional teachers in a meeting room" style="background-image: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop')"></div>
<div class="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent flex items-end p-stack-md">
<div class="bg-surface/90 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 shadow-lg w-full max-w-[320px]">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined text-[24px]">school</span>
</div>
<div>
<div class="font-label-bold text-label-bold text-on-surface">Môi trường 5 Sao</div>
<div class="font-body-md text-body-md text-on-surface-variant text-sm">Cơ sở vật chất hiện đại</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<!-- JD Section -->
<section class="w-full py-section-padding bg-surface-container-lowest">
<div class="max-w-container-max mx-auto px-gutter">
<div class="flex flex-col gap-stack-sm text-center mb-stack-lg items-center">
<h2 class="font-headline-lg text-headline-lg text-on-surface">Thông Tin Tuyển Dụng</h2>
<div class="h-1 w-16 bg-primary rounded-full"></div>
<p class="font-body-md text-body-md text-on-surface-variant max-w-[600px]">Chúng tôi đang tìm kiếm những người đồng hành đầy nhiệt huyết, yêu thích giảng dạy và chia sẻ văn hóa Trung Hoa.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Yêu cầu công việc -->
    <div class="bg-surface p-8 rounded-2xl border border-outline-variant/50 shadow-md hover:shadow-lg transition-all h-full">
        <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center">
                <span class="material-symbols-outlined text-[28px]">assignment_ind</span>
            </div>
            <h3 class="font-headline-md text-[24px] text-on-surface">Yêu Cầu Công Việc</h3>
        </div>
        <ul class="flex flex-col gap-4">
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface">Tốt nghiệp Đại học chuyên ngành Tiếng Trung hoặc chứng chỉ <strong>HSK 5 trở lên</strong>.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface">Phát âm chuẩn, kỹ năng sư phạm tốt, truyền đạt dễ hiểu.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface">Có <strong>ít nhất 1 năm kinh nghiệm</strong> giảng dạy là một lợi thế.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
                <span class="font-body-md text-on-surface">Năng động, nhiệt tình, có trách nhiệm với học viên.</span>
            </li>
        </ul>
    </div>

    <!-- Quyền lợi -->
    <div class="bg-surface p-8 rounded-2xl border border-outline-variant/50 shadow-md hover:shadow-lg transition-all h-full">
        <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center">
                <span class="material-symbols-outlined text-[28px]">volunteer_activism</span>
            </div>
            <h3 class="font-headline-md text-[24px] text-on-surface">Quyền Lợi Hấp Dẫn</h3>
        </div>
        <ul class="flex flex-col gap-4">
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">stars</span>
                <span class="font-body-md text-on-surface">Thu nhập cạnh tranh: <strong>15.000.000đ - 25.000.000đ/tháng</strong> (Lương cứng + Thưởng KPI).</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">stars</span>
                <span class="font-body-md text-on-surface">Thưởng Lễ, Tết, lương tháng 13 và du lịch nghỉ mát hàng năm cùng công ty.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">stars</span>
                <span class="font-body-md text-on-surface">Đóng BHXH, BHYT đầy đủ theo quy định của pháp luật.</span>
            </li>
            <li class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary mt-0.5">stars</span>
                <span class="font-body-md text-on-surface">Được đào tạo định kỳ nâng cao kỹ năng sư phạm bởi các chuyên gia.</span>
            </li>
        </ul>
    </div>
</div>
</div>
</section>

<!-- Recruitment Process -->
<section class="w-full py-section-padding bg-surface-container-low relative overflow-hidden">
<div class="max-w-container-max mx-auto px-gutter relative z-10 flex flex-col items-center text-center">
<h2 class="font-headline-lg text-headline-lg text-on-surface mb-stack-lg">Quy Trình Ứng Tuyển</h2>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1000px]">
    <div class="bg-surface p-6 rounded-2xl shadow-sm flex flex-col items-center text-center border-t-4 border-t-tertiary">
        <div class="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-4 font-display-xl text-[32px]">1</div>
        <h4 class="font-headline-md text-[20px] text-on-surface mb-2">Nộp Hồ Sơ</h4>
        <p class="font-body-md text-on-surface-variant">Điền Form ứng tuyển hoặc gửi CV/Video giới thiệu bản thân qua Email tuyển dụng.</p>
    </div>
    
    <div class="bg-surface p-6 rounded-2xl shadow-sm flex flex-col items-center text-center border-t-4 border-t-primary">
        <div class="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-4 font-display-xl text-[32px]">2</div>
        <h4 class="font-headline-md text-[20px] text-on-surface mb-2">Phỏng Vấn & Dạy Thử</h4>
        <p class="font-body-md text-on-surface-variant">Tham gia phỏng vấn trực tiếp và dạy thử 15 phút chuyên đề tự chọn.</p>
    </div>
    
    <div class="bg-surface p-6 rounded-2xl shadow-sm flex flex-col items-center text-center border-t-4 border-t-secondary">
        <div class="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-4 font-display-xl text-[32px]">3</div>
        <h4 class="font-headline-md text-[20px] text-on-surface mb-2">Nhận Việc Ngay</h4>
        <p class="font-body-md text-on-surface-variant">Ký hợp đồng chính thức, tham gia khóa đào tạo tân binh và bắt đầu giảng dạy.</p>
    </div>
</div>
</div>
</section>

<!-- Form Section -->
<section id="ung-tuyen" class="w-full py-section-padding bg-surface-container-lowest">
<div class="max-w-container-max mx-auto px-gutter">
    <div class="bg-surface p-stack-lg rounded-3xl shadow-2xl border border-primary/20 max-w-[800px] mx-auto">
        <div class="text-center mb-8">
            <h2 class="font-headline-lg text-[32px] text-primary mb-2">Đăng Ký Ứng Tuyển</h2>
            <p class="font-body-md text-on-surface-variant">Hãy để lại thông tin, Bộ phận Nhân sự sẽ liên hệ với bạn trong vòng 24h làm việc.</p>
        </div>
        
        <form class="flex flex-col gap-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label class="block font-label-bold text-on-surface mb-2">Họ và Tên *</label>
                    <input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Nhập họ tên đầy đủ" type="text" />
                </div>
                <div>
                    <label class="block font-label-bold text-on-surface mb-2">Số điện thoại *</label>
                    <input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Nhập số điện thoại" type="tel" />
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label class="block font-label-bold text-on-surface mb-2">Email *</label>
                    <input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Nhập email liên hệ" type="email" />
                </div>
                <div>
                    <label class="block font-label-bold text-on-surface mb-2">Chứng chỉ HSK cao nhất</label>
                    <select class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface-variant focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue="">
                        <option disabled value="">Chọn chứng chỉ</option>
                        <option value="hsk4">HSK 4</option>
                        <option value="hsk5">HSK 5</option>
                        <option value="hsk6">HSK 6</option>
                        <option value="other">Khác (Tốt nghiệp Đại học, TOCFL...)</option>
                    </select>
                </div>
            </div>

            <div>
                <label class="block font-label-bold text-on-surface mb-2">Link CV của bạn (Google Drive, Dropbox...) *</label>
                <input class="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Dán đường link CV vào đây" type="text" />
            </div>

            <button class="w-full bg-primary hover:bg-primary-container text-on-primary font-label-bold text-label-bold py-4 rounded-lg mt-4 transition-all shadow-md text-[18px]" type="button">
                Gửi Hồ Sơ Ứng Tuyển
            </button>
        </form>
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

export default TuyenDungGiaoVienPage;
