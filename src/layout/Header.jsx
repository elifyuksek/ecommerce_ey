import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Redux store'dan verileri çekiyoruz
  const user = useSelector((state) => state.client.user);
  const isLoggedIn = user && user.token;
  const categories = useSelector((state) => state.product.categories) || [];
  const cart = useSelector((state) => state.shoppingCart?.cart) || [];

  const totalCartCount = cart.reduce((total, item) => total + item.count, 0);

  // KATEGORİ FİLTRELEME
  // Kadın: Tişört, Elbise, Gömlek kaldı (Ayakkabı, Ceket, Etek, Kazak, Pantolon temizlendi)
  const womenCategories = categories.filter(
    (c) => c.gender === 'k' && !['ayakkabi', 'ceket', 'etek', 'kazak', 'pantalon'].includes(c.code?.split(':')[1]?.toLowerCase())
  );

  // Erkek: Sadece Tişört ve Kazak kaldı
  const menCategories = categories.filter(
    (c) => c.gender === 'e' && ['tisort', 'kazak'].includes(c.code?.split(':')[1]?.toLowerCase())
  );

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    const navEvent = new Event('navigationChange');
    window.dispatchEvent(navEvent);
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleCategoryClick = (genderCode, categoryTitle, categoryId) => {
    const genderPath = genderCode === 'k' ? 'kadin' : 'erkek';
    const categoryPath = categoryTitle
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-');

    navigateTo(`/shop/${genderPath}/${categoryPath}/${categoryId}`);
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full flex flex-col bg-white border-b border-gray-100 sticky top-0 z-50">
      
      {/* 1. ÜST ŞERİT */}
      <div className="hidden md:flex w-full bg-[#252B42] text-white text-xs font-bold py-3 px-6 justify-between items-center border-b border-gray-100/10">
        <div className="flex items-center gap-5">
          <a href="tel:+905550000118" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +90 (555) 000 1015
          </a>
          <a href="mailto:contact@elifshop.com" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#23A6F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            contact@elifshop.com
          </a>
        </div>
        <div>
          <span className="text-gray-300">Welcome to Elif Shop – Discover Best Deals!</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Follow Us :</span>
          <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9"/></svg>
          </a>
          <a href="#" className="hover:text-[#23A6F0] transition-colors" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>

      {/* 2. ANA NAVİGASYON */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-8">
        <div className="flex items-center gap-20">
          <button onClick={() => navigateTo('/')} className="text-2xl font-bold text-[#252B42] tracking-wide focus:outline-none cursor-pointer">
            Elif<span className="text-[#23A6F0]">Shop</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#737373]">
            <button onClick={() => navigateTo('/')} className="hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer">Home</button>
            
            {/* SHOP DROPDOWN */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => navigateTo('/shop')}
                className="hover:text-[#23A6F0] transition-colors focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                Shop
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              {isDropdownOpen && categories.length > 0 && (
                <div className="absolute left-0 top-full bg-white border border-gray-100 shadow-lg rounded-md p-6 flex gap-12 z-50 min-w-[320px] text-[#737373]">
                  {/* Kadın */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-[#23A6F0] border-b border-gray-100 pb-1 text-sm tracking-wide">Kadın</h3>
                    <div className="flex flex-col gap-2">
                      {womenCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.gender, cat.title, cat.id)}
                          className="text-left text-xs font-semibold text-[#737373] hover:text-[#23A6F0] transition-colors py-0.5 cursor-pointer"
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Erkek */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-[#23A6F0] border-b border-gray-100 pb-1 text-sm tracking-wide">Erkek</h3>
                    <div className="flex flex-col gap-2">
                      {menCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.gender, cat.title, cat.id)}
                          className="text-left text-xs font-semibold text-[#737373] hover:text-[#23A6F0] transition-colors py-0.5 cursor-pointer"
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => navigateTo('/team')} className="hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer">Team</button>
            <button onClick={() => navigateTo('/about')} className="hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer">About</button>
            <button onClick={() => navigateTo('/blog')} className="hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer">Blog</button>
            <button onClick={() => navigateTo('/contact')} className="hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer">Contact</button>
          </nav>
        </div>

        {/* SAĞ Taraf */}
        <div className="flex items-center gap-6 text-[#23A6F0] text-sm font-bold">
          {isLoggedIn ? (
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsProfileDropdownOpen(true)}
              onMouseLeave={() => setIsProfileDropdownOpen(false)}
            >
              <div className="hidden md:flex items-center gap-2 text-[#252B42] cursor-pointer select-none">
                <img 
                  src={user.avatarUrl || `https://www.gravatar.com/avatar/${btoa(user.email)}?d=mp`} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                />
                <span className="font-bold text-sm tracking-wide text-[#252B42] hover:text-[#23A6F0] transition-colors">
                  {user.name} <span className="text-[10px] inline-block align-middle ml-0.5">▼</span>
                </span>
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full bg-white border border-gray-100 shadow-2xl rounded-md py-1.5 z-50 w-44 flex flex-col text-[#252B42] font-bold text-xs text-left">
                  <button 
                    onClick={() => navigateTo('/previous-orders')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50/50 hover:text-[#23A6F0] transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>📦</span> Siparişlerim
                  </button>
                  <hr className="border-gray-50 my-1" />
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/login';
                    }}
                    className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50/30 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>🚪</span> Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DÜZELTİLEN LOGIN / REGISTER AYRI AYRI LINK YAPISI */
            <div className="hidden md:flex items-center gap-2 text-[#23A6F0]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <button 
                onClick={() => navigateTo('/login')} 
                className="hover:underline focus:outline-none cursor-pointer"
              >
                Login
              </button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => navigateTo('/signup')} 
                className="hover:underline focus:outline-none cursor-pointer"
              >
                Register
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button className="p-1 hover:opacity-70 transition-opacity cursor-pointer text-[#23A6F0]" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            {/* SEPET */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <button 
                className="p-1 text-[#23A6F0] hover:opacity-75 transition-opacity flex items-center gap-1 cursor-pointer focus:outline-none" 
                aria-label="Cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
                {totalCartCount > 0 && (
                  <span className="text-xs font-bold bg-[#23A6F0] text-white rounded-full px-1.5 py-0.5 ml-0.5 shadow-sm animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 top-full bg-white border border-gray-100 shadow-2xl rounded-md p-4 z-50 w-[350px] flex flex-col gap-4 text-[#252B42]">
                  <h3 className="font-bold text-[#252B42] text-sm border-b border-gray-100 pb-2 flex justify-between items-center">
                    <span>Sepetim</span>
                    <span className="text-xs text-[#23A6F0] font-extrabold bg-[#23A6F0]/10 px-2 py-0.5 rounded-full border border-[#23A6F0]/20">
                      {totalCartCount} Ürün
                    </span>
                  </h3>

                  {cart.length === 0 ? (
                    <div className="text-center py-6 text-sm text-gray-400 font-medium">
                      Sepetiniz henüz boş.
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-1 scrollbar-thin">
                        {cart.map((item) => {
                          const imgUrl = item.product.images && item.product.images.length > 0 
                            ? item.product.images[0].url 
                            : (item.product.image || 'https://via.placeholder.com/60');

                          return (
                            <div key={item.product.id} className="flex gap-3 items-start border-b border-gray-100 pb-3 hover:bg-gray-50 p-1 rounded transition-colors">
                              <img 
                                src={imgUrl} 
                                alt={item.product.name} 
                                className="w-16 h-20 object-cover rounded border border-gray-200"
                              />
                              <div className="flex-grow flex flex-col gap-1">
                                <h4 className="text-xs font-bold text-[#252B42] line-clamp-2 leading-tight text-left">
                                  {item.product.name}
                                </h4>
                                <span className="text-[11px] text-gray-400 font-semibold text-left">
                                  Adet: {item.count}
                                </span>
                                <span className="text-sm font-bold text-[#23A6F0] text-left">
                                  ${(item.product.price * item.count).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={() => navigateTo('/cart')}
                          className="border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold text-xs py-3 rounded-md transition-all text-center cursor-pointer"
                        >
                          Sepete Git
                        </button>
                        <button 
                          onClick={() => navigateTo('/checkout')}
                          className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-md transition-all text-center cursor-pointer shadow-lg shadow-sky-100"
                        >
                          Siparişi Tamamla
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="p-1 hover:opacity-70 transition-opacity cursor-pointer text-[#23A6F0]" aria-label="Favorites">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span className="text-xs font-normal text-[#23A6F0] ml-0.5">(0)</span>
            </button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-[#252B42] hover:text-[#23A6F0] p-1 transition-colors cursor-pointer"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* 3. MOBİL MENÜ */}
      {isMenuOpen && (
        <div className="w-full flex flex-col items-center bg-white py-8 md:hidden border-t border-gray-100">
          <nav className="flex flex-col items-center gap-6 text-xl font-medium text-gray-500">
            <button onClick={() => navigateTo('/')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">Home</button>
            <button onClick={() => navigateTo('/shop')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">Shop</button>
            <button onClick={() => navigateTo('/team')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">Team</button>
            <button onClick={() => navigateTo('/about')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">About</button>
            <button onClick={() => navigateTo('/blog')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">Blog</button>
            <button onClick={() => navigateTo('/contact')} className="hover:text-[#23A6F0] focus:outline-none cursor-pointer">Contact</button>
            
            {isLoggedIn ? (
              <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-100 w-full justify-center text-xs font-bold">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.avatarUrl || `https://www.gravatar.com/avatar/${btoa(user.email)}?d=mp`} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="font-bold text-[#252B42] text-sm">{user.name}</span>
                </div>
                <button 
                  onClick={() => navigateTo('/previous-orders')}
                  className="text-[#23A6F0] hover:underline mt-2 cursor-pointer"
                >
                  📦 Siparişlerim
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 w-full justify-center text-[#23A6F0] font-bold">
                <button 
                  onClick={() => navigateTo('/login')} 
                  className="hover:underline focus:outline-none cursor-pointer"
                >
                  Login
                </button>
                <span>/</span>
                <button 
                  onClick={() => navigateTo('/signup')} 
                  className="hover:underline focus:outline-none cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}