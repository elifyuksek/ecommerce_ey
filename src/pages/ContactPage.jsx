import React from 'react';

export default function ContactPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. HERO SECTION (Giriş Alanı) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        {/* Sol Taraf: Yazılar ve İletişim Bilgileri */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <span className="text-sm font-bold text-[#252B42] tracking-wider uppercase">Contact Us</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#252B42] leading-tight">
            Get in touch <br className="hidden md:inline" /> today!
          </h1>
          <p className="text-sm md:text-base text-[#737373] max-w-sm leading-relaxed">
            We know how large objects will act, but things on a small scale.
          </p>
          
          <div className="flex flex-col gap-2 text-base md:text-lg font-bold text-[#252B42] mt-2">
            <span>Phone : +451 215 215</span>
            <span>Fax : +451 215 215</span>
          </div>

          {/* Sosyal Medya İkonları (Saf SVG) */}
          <div className="flex items-center gap-6 text-[#252B42] mt-4">
            <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Sağ Taraf: Alışveriş Yapan Aile Görseli (Arkasında pembe dekoratif daire ile) */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-[#FFEBEB] rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img 
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600" 
            alt="Family shopping" 
            className="w-full max-w-[450px] object-contain"
          />
        </div>
      </section>

      {/* 2. OFFICE CARDS SECTION (Destek Kartları) */}
      <section className="w-full bg-[#FAFAFA] py-16 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-16">
          {/* Bölüm Başlığı */}
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-bold text-[#252B42] tracking-wider uppercase">Visit Our Office</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] max-w-md">
              We help small businesses with big ideas
            </h2>
          </div>

          {/* Kartlar (Figma Tasarımına Birebir Uygun) */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0">
            
            {/* Kart 1: Telefon Destek (Beyaz) */}
            <div className="w-full max-w-[328px] bg-white py-12 px-10 flex flex-col items-center text-center gap-4 rounded-sm shadow-sm md:shadow-none">
              <div className="text-[#23A6F0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="flex flex-col text-sm font-bold text-[#252B42]">
                <span>georgia.young@example.com</span>
                <span>georgia.young@ple.com</span>
              </div>
              <span className="text-base font-bold text-[#252B42] mt-2">Get Support</span>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-sm px-6 py-3.5 rounded-full hover:bg-sky-50 transition-colors">
                Submit Request
              </button>
            </div>

            {/* Kart 2: Konum Destek (Koyu Mavi - Daha Uzun) */}
            <div className="w-full max-w-[328px] bg-[#252B42] text-white py-16 px-10 flex flex-col items-center text-center gap-4 rounded-sm shadow-lg z-10">
              <div className="text-[#23A6F0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="flex flex-col text-sm font-bold">
                <span>georgia.young@example.com</span>
                <span>georgia.young@ple.com</span>
              </div>
              <span className="text-base font-bold mt-2">Get Support</span>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-sm px-6 py-3.5 rounded-full hover:bg-white/5 transition-colors">
                Submit Request
              </button>
            </div>

            {/* Kart 3: Mail Destek (Beyaz) */}
            <div className="w-full max-w-[328px] bg-white py-12 px-10 flex flex-col items-center text-center gap-4 rounded-sm shadow-sm md:shadow-none">
              <div className="text-[#23A6F0]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className="flex flex-col text-sm font-bold text-[#252B42]">
                <span>georgia.young@example.com</span>
                <span>georgia.young@ple.com</span>
              </div>
              <span className="text-base font-bold text-[#252B42] mt-2">Get Support</span>
              <button className="border border-[#23A6F0] text-[#23A6F0] font-bold text-sm px-6 py-3.5 rounded-full hover:bg-sky-50 transition-colors">
                Submit Request
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LET'S TALK SECTION (CTA Alanı) */}
      <section className="w-full bg-white py-20 px-6 text-center flex flex-col items-center gap-6">
        {/* Kıvrık Ok SVG Süsü */}
        <div className="text-[#23A6F0] transform rotate-[15deg]">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 10-4 4 6 6D"/><path d="M4 4c0 4 3 10 7 10"/></svg>
        </div>
        
        <span className="text-sm font-bold text-[#252B42] tracking-widest uppercase">We Can't Wait To Meet You</span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#252B42]">Let’s Talk</h2>
        
        <button className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm px-10 py-4 rounded-md transition-colors tracking-wide mt-2">
          Try it free now
        </button>
      </section>

    </div>
  );
}