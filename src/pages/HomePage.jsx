import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const mockProducts = [
  { id: 1, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
  { id: 2, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500" },
  { id: 3, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500" },
  { id: 4, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500" },
  { id: 5, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500" },
  { id: 6, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 7, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500" },
  { id: 8, title: "Graphic Design", department: "English Department", oldPrice: "16.48", newPrice: "6.48", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500" },
];

// Blog postları için mockup veriler
const mockPosts = [
  { id: 1, title: "Loudest à la Madison #1 (L'integral)", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500" },
  { id: 2, title: "Loudest à la Madison #1 (L'integral)", image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500" },
  { id: 3, title: "Loudest à la Madison #1 (L'integral)", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500" }
];

export default function HomePage({ onProductSelect }) {
  const topSlides = [
    { id: 1, tag: "SUMMER 2026", title: "NEW COLLECTION", description: "We know how large objects will act, but things on a small scale.", hasPrice: false, buttonText: "SHOP NOW", bgClass: "bg-[#00B2E2]", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" },
    { id: 2, tag: "SUMMER 2026", title: "Vita Classic Product", description: "We know how large objects will act, We know how are objects will act, We know", hasPrice: true, price: "$16.48", buttonText: "ADD TO CART", bgClass: "bg-[#23856D]", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800" }
  ];

  const bottomSlides = [
    { id: 2, tag: "SUMMER 2026", title: "Vita Classic Product", description: "We know how large objects will act, We know how are objects will act, We know", hasPrice: true, price: "$16.48", buttonText: "ADD TO CART", bgClass: "bg-[#23856D]", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800" },
    { id: 1, tag: "SUMMER 2026", title: "NEW COLLECTION", description: "We know how large objects will act, but things on a small scale.", hasPrice: false, buttonText: "SHOP NOW", bgClass: "bg-[#00B2E2]", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" }
  ];

  const [currentTopSlide, setCurrentTopSlide] = useState(0);
  const [currentBottomSlide, setCurrentBottomSlide] = useState(0);

  const nextTopSlide = () => setCurrentTopSlide((prev) => (prev === topSlides.length - 1 ? 0 : prev + 1));
  const prevTopSlide = () => setCurrentTopSlide((prev) => (prev === 0 ? topSlides.length - 1 : prev - 1));

  const nextBottomSlide = () => setCurrentBottomSlide((prev) => (prev === bottomSlides.length - 1 ? 0 : prev + 1));
  const prevBottomSlide = () => setCurrentBottomSlide((prev) => (prev === 0 ? bottomSlides.length - 1 : prev - 1));

  return (
    <div className="w-full flex flex-col gap-20 pb-20">
      
      {/* 1. ÜST GEÇİŞLİ SLIDER */}
      <section className={`w-full ${topSlides[currentTopSlide].bgClass} transition-colors duration-500 min-h-[500px] md:min-h-[650px] flex items-center relative text-white overflow-hidden`}>
        <button onClick={prevTopSlide} className="absolute left-4 z-10 p-2 text-3xl font-light hover:opacity-70 focus:outline-none select-none">&#10094;</button>
        <button onClick={nextTopSlide} className="absolute right-4 z-10 p-2 text-3xl font-light hover:opacity-70 focus:outline-none select-none">&#10095;</button>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-0 gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <h5 className="text-sm md:text-base font-bold tracking-widest uppercase">{topSlides[currentTopSlide].tag}</h5>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight">{topSlides[currentTopSlide].title}</h1>
            <p className="text-sm md:text-base max-w-sm text-white/90 font-medium leading-relaxed">{topSlides[currentTopSlide].description}</p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
              {topSlides[currentTopSlide].hasPrice && <span className="text-2xl font-bold">{topSlides[currentTopSlide].price}</span>}
              <button className="bg-[#2DC071] hover:bg-emerald-600 text-white font-bold text-sm px-8 py-4 rounded-md tracking-wider transition-colors shadow-md uppercase">{topSlides[currentTopSlide].buttonText}</button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-end h-[350px] md:h-[650px] relative">
            <img src={topSlides[currentTopSlide].image} alt="Showcase" className="h-full w-auto object-contain object-bottom select-none" />
          </div>
        </div>
      </section>

      {/* 2. EDITOR'S PICK ALANI */}
      <section className="w-full bg-[#FAFAFA] py-16 px-6 md:px-8 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold text-[#252B42] tracking-wider uppercase">EDITOR'S PICK</h2>
          <p className="text-sm font-medium text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 justify-center">
          <div className="w-full md:w-1/2 h-[500px] flex relative bg-gray-200 overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=600" alt="Men" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
            <div className="absolute bottom-6 left-6"><button className="bg-white hover:bg-gray-100 text-[#252B42] font-bold text-sm px-10 py-3 shadow-sm">MEN</button></div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-1/2 h-[500px] flex relative bg-gray-200 overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600" alt="Women" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <div className="absolute bottom-6 left-6"><button className="bg-white hover:bg-gray-100 text-[#252B42] font-bold text-sm px-8 py-3 shadow-sm">WOMEN</button></div>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-8 h-[500px]">
              <div className="w-full h-1/2 flex relative bg-gray-200 overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600" alt="Accessories" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                <div className="absolute bottom-6 left-6"><button className="bg-white hover:bg-gray-100 text-[#252B42] font-bold text-sm px-6 py-3 shadow-sm">ACCESSORIES</button></div>
              </div>
              <div className="w-full h-1/2 flex relative bg-gray-200 overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600" alt="Kids" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                <div className="absolute bottom-6 left-6"><button className="bg-white hover:bg-gray-100 text-[#252B42] font-bold text-sm px-8 py-3 shadow-sm">KIDS</button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VITRIN / BESTSELLER PRODUCTS ALANI */}
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-6 md:px-8 gap-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h4 className="text-sm font-bold text-[#737373] tracking-wide uppercase">Featured Products</h4>
          <h2 className="text-2xl font-bold text-[#252B42] tracking-wider">BESTSELLER PRODUCTS</h2>
          <p className="text-sm font-medium text-[#737373]">Problems trying to resolve the conflict between</p>
        </div>
        <div className="w-full flex flex-wrap -m-4">
          {mockProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 p-4 flex">
              <ProductCard product={product} onSelect={onProductSelect} />
            </div>
          ))}
        </div>
      </section>

          {/* 6. EN ALT GEÇİŞLİ SLIDER (Yeşil ile Başlayan) */}
      <section className={`w-full ${bottomSlides[currentBottomSlide].bgClass} transition-colors duration-500 min-h-[500px] md:min-h-[650px] flex items-center relative text-white overflow-hidden`}>
        <button onClick={prevBottomSlide} className="absolute left-4 z-10 p-2 text-3xl font-light hover:opacity-70 focus:outline-none select-none">&#10094;</button>
        <button onClick={nextBottomSlide} className="absolute right-4 z-10 p-2 text-3xl font-light hover:opacity-70 focus:outline-none select-none">&#10095;</button>
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-0 gap-8">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
            <h5 className="text-sm md:text-base font-bold tracking-widest uppercase">{bottomSlides[currentBottomSlide].tag}</h5>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight whitespace-pre-line">{bottomSlides[currentBottomSlide].title}</h1>
            <p className="text-sm md:text-base max-w-sm text-white/90 font-medium leading-relaxed">{bottomSlides[currentBottomSlide].description}</p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
              {bottomSlides[currentBottomSlide].hasPrice && <span className="text-2xl font-bold">{bottomSlides[currentBottomSlide].price}</span>}
              <button className="bg-[#2DC071] hover:bg-emerald-600 text-white font-bold text-sm px-8 py-4 rounded-md tracking-wider transition-colors shadow-md uppercase">{bottomSlides[currentBottomSlide].buttonText}</button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-end h-[350px] md:h-[650px] relative">
            <img src={bottomSlides[currentBottomSlide].image} alt="Showcase" className="h-full w-auto object-contain object-bottom select-none" />
          </div>
        </div>
        <div className="absolute bottom-6 w-full flex justify-center gap-2">
          {bottomSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentBottomSlide(index)} className={`h-1.5 transition-all duration-300 rounded-full ${currentBottomSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* 4. PART OF THE NEURAL UNIVERSE (Yeni Eklenen Çift Bölmeli Alan) */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-8 gap-12 py-10">
        {/* Sol Görsel Kapsayıcı */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="https://images.unsplash.com/photo-1463453091185-61582044d556?w=600" alt="Neural Universe Pair" className="w-full max-w-md h-auto object-cover" />
        </div>
        {/* Sağ İçerik Kapsayıcı */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6">
          <h5 className="text-sm font-bold text-[#BDBDBD] tracking-widest uppercase">SUMMER 2020</h5>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#252B42] tracking-wide leading-tight">Part of the Neural <br /> Universe</h2>
          <p className="text-sm md:text-base max-w-sm text-[#737373] font-medium leading-relaxed">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2 justify-center md:justify-start">
            <button className="bg-[#2DC071] hover:bg-emerald-600 text-white font-bold text-sm px-8 py-3 rounded-md transition-colors uppercase">BUY NOW</button>
            <button className="bg-transparent border border-[#2DC071] text-[#2DC071] hover:bg-[#2DC071] hover:text-white font-bold text-sm px-8 py-3 rounded-md transition-all uppercase">READ MORE</button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED POSTS / BLOG ALANI (Yeni Eklenen 3'lü Kart Alanı) */}
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-6 md:px-8 gap-12 py-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <h6 className="text-sm font-bold text-[#23A6F0] tracking-wide">Practice Advice</h6>
          <h2 className="text-2xl font-bold text-[#252B42] tracking-wider uppercase">Featured Posts</h2>
          <p className="text-sm font-medium text-[#737373] max-w-md">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
        </div>
        {/* 3'lü Esnek Kart Düzeni */}
        <div className="w-full flex flex-col md:flex-row gap-6">
          {mockPosts.map((post) => (
            <div key={post.id} className="w-full md:w-1/3 flex flex-col bg-white border border-[#E8E8E8] shadow-sm overflow-hidden rounded-sm">
              <div className="w-full aspect-[4/3] bg-gray-100 relative">
                <img src={post.image} alt="Blog post" className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-[#E74C3C] text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm">NEW</span>
              </div>
              <div className="flex flex-col p-6 gap-3">
                <div className="flex gap-4 text-xs text-[#737373]">
                  <span className="text-[#23A6F0]">Google</span>
                  <span>Trending</span>
                  <span>New</span>
                </div>
                <h4 className="text-lg font-bold text-[#252B42] line-clamp-2 leading-snug">{post.title}</h4>
                <p className="text-xs text-[#737373] line-clamp-2 leading-relaxed">We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
                <div className="flex justify-between items-center text-xs text-[#737373] font-bold pt-4 border-t border-[#F3F3F3] mt-2">
                  <span>22 April 2021</span>
                  <span>10 comments</span>
                </div>
                <a href="#" className="text-xs font-bold text-[#737373] hover:text-[#23A6F0] flex items-center gap-1 pt-2 transition-colors">Learn More &gt;</a>
              </div>
            </div>
          ))}
        </div>
      </section>

     
      
    </div>
  );
}