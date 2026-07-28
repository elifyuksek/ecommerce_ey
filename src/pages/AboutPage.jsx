import React from 'react';

export default function AboutPage() {
  const stats = [
    { value: "15K", label: "Happy Customers" },
    { value: "150K", label: "Monthly Visitors" },
    { value: "15", label: "Countries Worldwide" },
    { value: "100+", label: "Top Partners" }
  ];

  const team = [
    { id: 1, name: "Username", role: "Profession", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
    { id: 2, name: "Username", role: "Profession", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
    { id: 3, name: "Username", role: "Profession", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" }
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <span className="text-sm font-bold text-[#252B42] tracking-wider uppercase hidden md:inline">About Company</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#252B42] leading-tight">
            ABOUT US
          </h1>
          <p className="text-sm md:text-base text-[#737373] max-w-sm leading-relaxed">
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm px-8 py-4 rounded-md transition-colors tracking-wide mt-2">
            Get Quote Now
          </button>
        </div>

        {/* Sağ Alışveriş Yapan Kadın Görseli */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-[#FFEBEB] rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600" 
            alt="About us model" 
            className="w-full max-w-[420px] object-contain rounded-sm"
          />
        </div>
      </section>

      {/* 2. PROBLEMS TRYING SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-2/5 flex flex-col gap-3">
          <span className="text-sm text-[#E74040] font-bold">Problems trying</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] leading-snug">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </h2>
        </div>
        <div className="w-full md:w-1/2 text-sm text-[#737373] leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-col sm:flex-row flex-wrap justify-around items-center gap-12 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col gap-2 min-w-[150px]">
            <span className="text-5xl md:text-6xl font-bold text-[#252B42]">{stat.value}</span>
            <span className="text-sm font-bold text-[#737373]">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* 4. VIDEO PREVIEW AREA (Dağ manzarası & Play Butonu) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="w-full aspect-video md:h-[540px] bg-gray-100 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200" 
            alt="Video mountain view" 
            className="w-full h-full object-cover"
          />
          {/* Mavi Yuvarlak Play Butonu */}
          <button className="absolute z-10 w-20 h-20 bg-[#23A6F0] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="w-full bg-white py-16 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-[#252B42]">Meet Our Team</h2>
            <p className="text-sm text-[#737373] max-w-md font-medium">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          
          <div className="w-full flex flex-wrap -m-4 justify-center">
            {team.map((member) => (
              <div key={member.id} className="w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center">
                <div className="w-full max-w-[316px] flex flex-col items-center text-center bg-white border border-gray-50 shadow-sm rounded-sm overflow-hidden">
                  <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h5 className="font-bold text-[#252B42] text-base">{member.name}</h5>
                    <span className="text-sm font-bold text-[#737373]">{member.role}</span>
                    <div className="flex items-center justify-center gap-4 text-[#23A6F0] mt-3">
                      <a href="#" className="hover:text-[#252B42]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                      <a href="#" className="hover:text-[#252B42]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                      <a href="#" className="hover:text-[#252B42]"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNERS SECTION */}
      <section className="w-full bg-[#FAFAFA] py-16 px-6 md:px-8 text-center flex flex-col items-center gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-[#252B42]">Big Companies Are Here</h2>
          <p className="text-sm text-[#737373] max-w-md font-medium">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>
        
        <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-10 md:gap-16 opacity-50">
          <span className="text-3xl font-extrabold tracking-tight text-[#737373]">hooli</span>
          <span className="text-3xl font-black italic text-[#737373]">lyft</span>
          <span className="text-2xl font-bold tracking-wide text-[#737373] flex items-center gap-1">🪶 pied piper</span>
          <span className="text-3xl font-black tracking-tight text-[#737373]">stripe</span>
          <span className="text-2xl font-bold text-[#737373]">aws</span>
          <span className="text-2xl font-extrabold text-[#737373] flex items-center gap-1">👽 reddit</span>
        </div>
      </section>

      {/* 7. WORK WITH US SECTION (Mavi ve Pembe Asimetrik Blok) */}
      <section className="w-full flex flex-col md:flex-row bg-[#2A7CC7] text-white">
        {/* Sol Mavi Alan */}
        <div className="w-full md:w-[60%] p-12 md:p-24 flex flex-col justify-center items-start gap-6">
          <span className="text-sm font-bold tracking-wider uppercase">Work With Us</span>
          <h2 className="text-4xl font-bold leading-tight">Now Let's grow Yours</h2>
          <p className="text-sm text-[#FFFFFF]/80 max-w-sm leading-relaxed">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
          </p>
          <button className="border border-white hover:bg-white hover:text-[#2A7CC7] transition-all font-bold text-sm px-8 py-3.5 rounded-md tracking-wider">
            Button
          </button>
        </div>
        
        {/* Sağ Pembe Elbiseli Manken Alanı */}
        <div className="w-full md:w-[40%] min-h-[350px] md:min-h-0 relative">
          <img 
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600" 
            alt="Work with us fashion model" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

    </div>
  );
}