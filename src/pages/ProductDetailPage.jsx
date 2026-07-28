import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductByIdAction } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product) || {};
  const fetchState = useSelector((state) => state.product.fetchState);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // URL'den productId'yi yakalama (Sondaki parametre)
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const id = parseInt(pathSegments[pathSegments.length - 1], 10);
    
    if (!isNaN(id)) {
      dispatch(fetchProductByIdAction(id));
    }
  }, [dispatch, window.location.pathname]);

  const handleBack = () => {
    window.history.back();
  };

  // Spinner Gösterimi
  if (fetchState === 'FETCHING') {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <svg className="animate-spin h-12 w-12 text-[#23A6F0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-[#737373] font-bold text-sm">Getting amazing product details...</p>
      </div>
    );
  }

  if (fetchState === 'FAILED' || !product.id) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-red-500 font-bold text-lg">Failed to load product details.</p>
        <button onClick={handleBack} className="bg-[#23A6F0] text-white font-bold px-6 py-2 rounded-md cursor-pointer">
          Go Back
        </button>
      </div>
    );
  }

  // Görselleri ve ana görseli belirleme
  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImage = images[activeImageIndex]?.url || 'https://via.placeholder.com/600x800?text=No+Image';

  return (
    <div className="w-full bg-[#FAFAFA] py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* BACK BUTTON & BREADCRUMB */}
        <div className="flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-bold text-[#737373] hover:text-[#23A6F0] transition-colors focus:outline-none cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Shop
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#BDBDBD]">
            <span className="text-[#252B42]">Home</span>
            <span>&gt;</span>
            <span className="text-[#252B42]">Shop</span>
            <span>&gt;</span>
            <span className="truncate max-w-[150px]">{product.name}</span>
          </div>
        </div>

        {/* PRODUCT DETAIL CONTENT */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-md border border-gray-100 shadow-sm">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-50 border border-gray-100">
              <img 
                src={currentImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            {/* Küçük Görseller */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-24 rounded overflow-hidden border-2 transition-all focus:outline-none cursor-pointer flex-shrink-0
                      ${activeImageIndex === idx ? 'border-[#23A6F0]' : 'border-transparent opacity-75 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="flex flex-col justify-between gap-6 py-2">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-[#252B42] tracking-wide text-left">{product.name}</h1>
              
              {/* Rating & Review */}
              <div className="flex items-center gap-2.5">
                <div className="flex text-yellow-400 text-sm">
                  ★ ★ ★ ★ ☆ <span className="text-[#737373] text-xs font-bold ml-1.5 mt-0.5">({product.rating})</span>
                </div>
                <span className="text-[#737373] font-bold text-xs border-l border-gray-200 pl-2.5">
                  {product.sell_count} Reviews
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-3xl font-bold text-[#252B42] text-left">${product.price}</span>
                <span className="text-xs font-bold flex items-center gap-1.5 mt-1">
                  Availability: 
                  {product.stock > 0 ? (
                    <span className="text-[#2DC071]">In Stock ({product.stock})</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#858585] leading-relaxed mt-3 border-t border-gray-100 pt-5 text-left">
                {product.description}
              </p>
            </div>

            {/* Actions (Colors, Size, Add to Cart) */}
            <div className="flex flex-col gap-6 border-t border-gray-100 pt-6 mt-4">
              {/* Renk Seçimi */}
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-[#737373]">Select Color:</span>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#23A6F0] cursor-pointer border border-transparent hover:scale-110 transition-transform" />
                  <span className="w-6 h-6 rounded-full bg-[#23856D] cursor-pointer border border-transparent hover:scale-110 transition-transform" />
                  <span className="w-6 h-6 rounded-full bg-[#E77C40] cursor-pointer border border-transparent hover:scale-110 transition-transform" />
                  <span className="w-6 h-6 rounded-full bg-[#252B42] cursor-pointer border border-transparent hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex items-center gap-4 flex-wrap mt-2">
                <button 
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm px-10 py-4 rounded-md transition-all shadow-sm hover:shadow cursor-pointer flex-grow sm:flex-grow-0"
                >
                  Add to Cart
                </button>
                <div className="flex items-center gap-2">
                  <button className="border border-[#E8E8E8] hover:bg-gray-50 p-3.5 rounded-full text-[#252B42] transition-colors cursor-pointer" aria-label="Add to Favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                  <button 
                    onClick={() => dispatch(addToCart(product))}
                    className="border border-[#E8E8E8] hover:bg-gray-50 p-3.5 rounded-full text-[#252B42] transition-colors cursor-pointer" 
                    aria-label="Add to Cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}