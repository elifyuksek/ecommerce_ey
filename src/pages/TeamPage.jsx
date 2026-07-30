import React from 'react';

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Gökhan Özdemir",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" // Şık bir profil görseli
    },
    {
      id: 2,
      name: "Elif Yüksek",
      role: "Full-Stack Software Developer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500" // Elif için şık bir profil görseli
    },
    {
      id: 3,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
    },
    {
      id: 4,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500"
    },
    {
      id: 5,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500"
    },
    {
      id: 6,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500"
    },
    {
      id: 7,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500"
    },
    {
      id: 8,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500"
    },
    {
      id: 9,
      name: "Username",
      role: "Profession",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500"
    }
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      
      <section className="w-full text-center py-12 flex flex-col items-center gap-4 px-6">
        <span className="text-sm font-bold text-[#737373] tracking-wider uppercase">What we do</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#252B42]">
          Innovation tailored for you
        </h1>
        <div className="flex items-center gap-2 text-sm font-bold mt-2">
          <a href="/" className="text-[#252B42] hover:underline">Home</a>
          <span className="text-[#BDBDBD] font-normal">&gt;</span>
          <span className="text-[#BDBDBD]">Team</span>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 pb-16">
        <div className="w-full flex flex-col md:flex-row gap-2.5">
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-[530px] overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" 
              alt="Fashion main" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-wrap gap-2.5">
            <div className="w-[calc(50%-5px)] h-[120px] sm:h-[260px] overflow-hidden rounded-sm">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" alt="Fashion 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-5px)] h-[120px] sm:h-[260px] overflow-hidden rounded-sm">
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400" alt="Fashion 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-5px)] h-[120px] sm:h-[260px] overflow-hidden rounded-sm">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" alt="Fashion 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(50%-5px)] h-[120px] sm:h-[260px] overflow-hidden rounded-sm">
              <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400" alt="Fashion 4" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-12">
          <h2 className="text-3xl font-bold text-[#252B42] text-center">Meet Our Team</h2>
          
          <div className="w-full flex flex-wrap -m-4 justify-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center">
                <div className="w-full max-w-[316px] flex flex-col items-center text-center bg-white border border-gray-100 shadow-sm rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h5 className="font-bold text-[#252B42] text-base">{member.name}</h5>
                    <span className="text-sm font-bold text-[#737373]">{member.role}</span>
                    
                    <div className="flex items-center justify-center gap-4 text-[#23A6F0] mt-3">
                      <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                      <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </a>
                      <a href="#" className="hover:text-[#252B42] transition-colors" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] py-20 px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold text-[#252B42]">Start your 14 days free trial</h2>
        <p className="text-sm text-[#737373] max-w-sm leading-relaxed font-medium">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
        </p>
        
        <button className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm px-10 py-4 rounded-md transition-colors tracking-wide mt-2">
          Try it free now
        </button>

        <div className="flex items-center gap-6 text-[#252B42] mt-4">
          <a href="#" className="hover:text-[#23A6F0] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </a>
          <a href="#" className="hover:text-[#23A6F0] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="hover:text-[#23A6F0] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="hover:text-[#23A6F0] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </section>

    </div>
  );
}