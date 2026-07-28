import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAction } from '../store/actions/productActions';
import ProductCard from '../components/ProductCard';

export default function ShopPage({ onProductSelect }) {
  const dispatch = useDispatch();

  // Redux Store verileri
  const categoriesFromStore = useSelector((state) => state.product.categories) || [];
  const productList = useSelector((state) => state.product.productList) || [];
  const totalProducts = useSelector((state) => state.product.total) || 0;
  const fetchState = useSelector((state) => state.product.fetchState);

  // --- T14 & T15 FILTRELEME, SIRALAMA VE PAGINATION STATE'LERI ---
  const [filterInput, setFilterInput] = useState(''); 
  const [activeFilter, setActiveFilter] = useState(''); 
  const [sortOption, setSortOption] = useState(''); 
  const [categoryId, setCategoryId] = useState(null); 

  // Pagination Ayarları
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 25; // Sayfa başına gösterilecek ürün limiti

  // URL değiştiğinde kategori id'sini extract etme ve Sayfayı 1'e sıfırlama
  useEffect(() => {
    const parseUrlParams = () => {
      const pathSegments = window.location.pathname.split('/');
      if (pathSegments.length >= 5 && pathSegments[1] === 'shop') {
        const id = parseInt(pathSegments[4], 10);
        setCategoryId(isNaN(id) ? null : id);
      } else {
        setCategoryId(null);
      }
      // Kategori değiştiğinde her zaman 1. sayfadan başla
      setCurrentPage(1);
    };

    parseUrlParams();

    window.addEventListener('popstate', parseUrlParams);
    window.addEventListener('navigationChange', parseUrlParams);

    return () => {
      window.removeEventListener('popstate', parseUrlParams);
      window.removeEventListener('navigationChange', parseUrlParams);
    };
  }, []);

  // --- T15 REMARKABLE POINT: Parametrelerden biri (Page dahil) değiştiğinde tetiklenen API isteği ---
  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(fetchProductsAction(categoryId, activeFilter, sortOption, limit, offset));
  }, [dispatch, categoryId, activeFilter, sortOption, currentPage]);

  // Toplam sayfa sayısını hesaplama
  const totalPages = Math.ceil(totalProducts / limit) || 1;

  // En popüler 5 kategori
  const topCategories = [...categoriesFromStore]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

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

    window.history.pushState({}, '', `/shop/${genderPath}/${categoryPath}/${categoryId}`);
    window.dispatchEvent(new Event('navigationChange'));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setActiveFilter(filterInput);
    setCurrentPage(1); // Filtre değişince 1. sayfaya dön
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Sıralama değişince 1. sayfaya dön
  };

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Sayfa değişince yukarı kaydır
    }
  };

  return (
    <div className="w-full flex flex-col gap-12 pb-16 bg-white">
      
      {/* 1. BREADCRUMB */}
      <div className="w-full bg-[#FAFAFA] py-6 px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-[#252B42]">Shop</h2>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-[#252B42] hover:underline cursor-pointer" onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('navigationChange'));
            }}>Home</span>
            <span className="text-[#BDBDBD] font-normal">&gt;</span>
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>
      </div>

      {/* 2. TOP 5 KATEGORİ */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        {topCategories.length === 0 ? (
          <div className="text-center py-12 text-[#737373] font-bold">Popular categories loading...</div>
        ) : (
          <div className="w-full flex flex-wrap lg:flex-nowrap gap-4 justify-center">
            {topCategories.map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.gender, cat.title, cat.id)}
                className={`w-full sm:w-[47%] lg:w-1/5 h-64 flex relative overflow-hidden group cursor-pointer bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-all
                  ${categoryId === cat.id ? 'ring-4 ring-[#23A6F0]' : ''}`}
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex flex-col items-center justify-center text-white p-4 text-center">
                  <h3 className="font-bold text-base tracking-wider uppercase">{cat.title}</h3>
                  <span className="text-xs font-bold mt-1.5">Rating: ★ {cat.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. FİLTRELEME VE ARAMA BARI */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 text-sm font-bold text-[#737373]">
          <div>
            Showing {(currentPage - 1) * limit + 1} - {Math.min(currentPage * limit, totalProducts)} of {totalProducts} results
          </div>
          
          <form onSubmit={handleFilterSubmit} className="flex items-center gap-4 flex-wrap justify-center w-full lg:w-auto">
            <input 
              type="text"
              placeholder="Search products..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="border border-[#E0E0E0] bg-[#F9F9F9] px-4 py-3 rounded text-sm text-[#737373] font-medium focus:outline-none focus:border-[#23A6F0] w-64"
            />

            <select 
              value={sortOption}
              onChange={handleSortChange}
              className="border border-[#E0E0E0] bg-[#F9F9F9] px-4 py-3 rounded text-sm text-[#737373] font-medium focus:outline-none cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>

            <button 
              type="submit"
              className="bg-[#23A6F0] hover:bg-sky-600 text-white px-8 py-3 rounded text-sm transition-colors tracking-wide cursor-pointer"
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      {/* 4. ÜRÜN LİSTELEME VE SPINNER BÖLÜMÜ */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-8 min-h-[300px] flex items-center justify-center">
        {fetchState === 'FETCHING' ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <svg className="animate-spin h-12 w-12 text-[#23A6F0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-[#737373] font-bold text-sm">Loading page {currentPage}...</p>
          </div>
        ) : fetchState === 'FAILED' ? (
          <div className="text-center py-12 text-red-500 font-bold">
            Failed to load products. Please try again.
          </div>
        ) : productList.length === 0 ? (
          <div className="text-center py-12 text-[#737373] font-bold flex flex-col gap-2">
            <span className="text-lg">No products found on this page.</span>
            <span className="text-xs font-normal">Try going back or changing filters!</span>
          </div>
        ) : (
          <div className="w-full flex flex-wrap -m-4">
            {productList.map((product) => (
              <div key={product.id} className="w-full sm:w-1/2 lg:w-1/4 p-4 flex">
                <ProductCard product={product} onSelect={onProductSelect} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. DİNAMİK PAGINATION BUTONLARI (T15 Geliştirmesi) */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center py-8">
          <div className="flex border border-[#E8E8E8] rounded-md overflow-hidden font-bold text-sm shadow-sm select-none">
            {/* First Butonu */}
            <button 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
              className={`px-6 py-4 transition-colors ${currentPage === 1 ? 'bg-[#F3F3F3] text-[#BDBDBD] cursor-not-allowed' : 'bg-white text-[#23A6F0] hover:bg-gray-50'}`}
            >
              First
            </button>

            {/* Dinamik Sayfa Numaraları */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-5 py-4 border-x border-[#E8E8E8] transition-colors cursor-pointer
                  ${currentPage === page ? 'bg-[#23A6F0] text-white' : 'bg-white text-[#23A6F0] hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}

            {/* Next Butonu */}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-6 py-4 transition-colors ${currentPage === totalPages ? 'bg-[#F3F3F3] text-[#BDBDBD] cursor-not-allowed' : 'bg-white text-[#23A6F0] hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* 6. LOGOLAR */}
      <section className="w-full bg-[#FAFAFA] py-12 px-6 md:px-8 mt-6">
        <div className="w-full max-w-7xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-10 md:gap-16 opacity-60">
          <span className="text-3xl font-extrabold tracking-tight text-[#737373]">hooli</span>
          <span className="text-3xl font-black italic text-[#737373]">lyft</span>
          <span className="text-2xl font-bold tracking-wide text-[#737373] flex items-center gap-1">🪶 pied piper</span>
          <span className="text-3xl font-black tracking-tight text-[#737373]">stripe</span>
          <span className="text-2xl font-bold text-[#737373]">aws</span>
          <span className="text-2xl font-extrabold text-[#737373] flex items-center gap-1">👽 reddit</span>
        </div>
      </section>

    </div>
  );
}