import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col bg-white border-t border-gray-100">
      
      {/* Logo ve Sosyal Medya İkonları (Saf SVG) */}
      <div className="w-full bg-[#FAFAFA] py-10 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <a href="#" className="text-2xl font-bold text-[#252B42]">
            Elif<span className="text-[#23A6F0]">Shop</span>
          </a>
          
          {/* İkon paketine ihtiyaç duymayan saf SVG logoları */}
          <div className="flex items-center gap-5 text-[#23A6F0]">
            {/* Instagram SVG */}
            <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* Facebook SVG */}
            <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            {/* Twitter/X SVG */}
            <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Link Blokları */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 px-6 py-12 md:px-8 text-sm">
        <div className="flex flex-col gap-4 min-w-[120px]">
          <h5 className="font-bold text-[#252B42]">Company Info</h5>
          <div className="flex flex-col gap-2 font-bold text-[#737373]">
            <a href="#" className="hover:text-[#252B42]">About Us</a>
            <a href="#" className="hover:text-[#252B42]">Carrier</a>
            <a href="#" className="hover:text-[#252B42]">We are hiring</a>
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-[120px]">
          <h5 className="font-bold text-[#252B42]">Legal</h5>
          <div className="flex flex-col gap-2 font-bold text-[#737373]">
            <a href="#" className="hover:text-[#252B42]">Privacy Policy</a>
            <a href="#" className="hover:text-[#252B42]">Terms of Service</a>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-sm w-full">
          <h5 className="font-bold text-[#252B42]">Get In Touch</h5>
          <div className="w-full flex border border-[#E6E6E6] rounded-md overflow-hidden bg-[#F9F9F9]">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="flex-grow px-4 py-3 bg-[#F9F9F9] text-[#737373] text-sm focus:outline-none"
            />
            <button className="bg-[#23A6F0] text-white font-medium px-5">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Telif Hakkı */}
      <div className="w-full bg-[#FAFAFA] py-6 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto text-xs font-bold text-[#737373] text-center sm:text-left">
          <p>Made With Love By Elif Yüksek All Right Reserved</p>
        </div>
      </div>

    </footer>
  );
}