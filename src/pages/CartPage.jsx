import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  updateCartItemCount, 
  toggleCartItemCheck,
  addToCart
} from '../store/actions/shoppingCartActions';
import ProductCard from '../components/ProductCard';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart?.cart) || [];
  const favorites = useSelector((state) => state.shoppingCart?.favorites) || [];
  const productList = useSelector((state) => state.product?.productList) || [];

  const [activeTab, setActiveTab] = useState('favorites'); 

  const totalItemsCount = cart.reduce((acc, item) => acc + item.count, 0);
  
  const productsTotal = cart
    .filter((item) => item.checked)
    .reduce((acc, item) => acc + (item.product?.price || 0) * item.count, 0);

  const shippingPrice = productsTotal > 0 ? 29.99 : 0; 
  const shippingDiscount = productsTotal >= 150 ? -29.99 : 0; 
  
  const grandTotal = productsTotal + shippingPrice + shippingDiscount;

  const handleIncrement = (productId, currentCount) => {
    dispatch(updateCartItemCount(productId, currentCount + 1));
  };

  const handleDecrement = (productId, currentCount) => {
    if (currentCount > 1) {
      dispatch(updateCartItemCount(productId, currentCount - 1));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckboxChange = (productId) => {
    dispatch(toggleCartItemCheck(productId));
  };

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('navigationChange'));
  };

  const getProductImage = (product) => {
    if (!product) return 'https://via.placeholder.com/150x200?text=No+Image';
    if (product.images && product.images.length > 0) {
      const first = product.images[0];
      if (typeof first === 'string') return first;
      return first.url || first.imageUrl || first.image_url || 'https://via.placeholder.com/150x200?text=No+Image';
    }
    return product.image || product.imageUrl || product.image_url || 'https://via.placeholder.com/150x200?text=No+Image';
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        <h1 className="text-xl font-bold text-[#252B42] text-left">
          Sepetim ({totalItemsCount} Ürün)
        </h1>

        <div className="w-full bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-[#23A6F0] text-white flex items-center justify-center font-bold text-xs">✓</span>
          <p className="text-sm text-gray-700 font-semibold text-left">
            Sepetindeki Ürünleri Bireysel Veya Kurumsal Fatura Seçerek Alabilirsin.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-md p-12 text-center border border-gray-100 shadow-sm flex flex-col gap-4 items-center">
            <p className="text-gray-500 font-bold text-lg">Sepetinizde ürün bulunmamaktadır.</p>
            <button 
              onClick={() => navigateTo('/shop')}
              className="bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm px-8 py-3 rounded transition-colors cursor-pointer"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
            
            <div className="w-full lg:w-[70%] flex flex-col gap-4">
              {cart.map((item) => {
                const imgUrl = getProductImage(item.product);

                return (
                  <div key={item.product?.id || Math.random()} className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                    
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.product?.id)}
                          className="w-4 h-4 rounded text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 cursor-pointer accent-[#23A6F0]"
                        />
                        <span>Satıcı: <span className="text-[#252B42] hover:underline cursor-pointer">Elif Shop</span></span>
                        <span className="bg-[#2DC071] text-white px-1.5 py-0.5 rounded text-[10px]">9.8</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-[#23A6F0] px-2.5 py-1 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                          Kurumsal ⓘ
                        </span>
                        <span className="text-gray-400 font-normal">|</span>
                        <span className="text-[#23A6F0] hover:underline cursor-pointer">Tüm Ürünler &gt;</span>
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-emerald-50 border-b border-gray-100 flex items-center gap-2 text-xs font-bold text-[#2DC071]">
                      <span>🚚</span>
                      <span>Kargo Bedava!</span>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <input 
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleCheckboxChange(item.product?.id)}
                          className="w-5 h-5 rounded text-[#23A6F0] focus:ring-[#23A6F0] border-gray-300 cursor-pointer accent-[#23A6F0]"
                        />
                        <img 
                          src={imgUrl} 
                          alt={item.product?.name || 'Ürün'} 
                          className="w-20 h-28 object-cover rounded border border-gray-200 flex-shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150x200?text=No+Image';
                          }}
                        />
                        <div className="flex flex-col gap-1 text-left">
                          <h3 className="font-bold text-sm text-[#252B42] hover:text-[#23A6F0] cursor-pointer transition-colors line-clamp-2">
                            {item.product?.name}
                          </h3>
                          <span className="text-xs text-gray-500 font-medium">Beden: Standart</span>
                          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 mt-1">
                            ⚡ Bugün kargoda!
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden h-9">
                          <button 
                            onClick={() => handleDecrement(item.product?.id, item.count)}
                            className="px-3 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 transition-colors cursor-pointer h-full text-lg"
                          >
                            -
                          </button>
                          <span className="px-4 font-bold text-sm text-[#252B42] h-full flex items-center justify-center min-w-[32px]">
                            {item.count}
                          </span>
                          <button 
                            onClick={() => handleIncrement(item.product?.id, item.count)}
                            className="px-3 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 transition-colors cursor-pointer h-full text-lg"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-lg font-extrabold text-[#23A6F0] min-w-[100px] text-right">
                          ${((item.product?.price || 0) * item.count).toFixed(2)}
                        </span>

                        <button 
                          onClick={() => handleRemove(item.product?.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            <div className="w-full lg:w-[30%] flex flex-col gap-4">
              <button 
                disabled={productsTotal === 0}
                onClick={() => navigateTo('/checkout')}
                className={`w-full text-white font-bold text-sm py-4 rounded-md transition-all text-center flex items-center justify-center gap-2 shadow-md
                  ${productsTotal === 0 
                    ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                    : 'bg-[#23A6F0] hover:bg-sky-600 cursor-pointer shadow-sky-100'}`}
              >
                <span>Sepeti Onayla</span>
                <span className="text-xs">&gt;</span>
              </button>

              <div className="bg-white rounded-md border border-gray-200 p-5 shadow-sm flex flex-col gap-5">
                <h2 className="text-base font-bold text-[#252B42] text-left">
                  Sipariş Özeti
                </h2>
                
                <div className="flex flex-col gap-3.5 text-xs text-gray-600 font-bold">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-left font-semibold">Ürünün Toplamı</span>
                    <span className="text-[#252B42] text-sm">${productsTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-left font-semibold">Kargo Toplam</span>
                    <span className="text-[#252B42] text-sm">${shippingPrice.toFixed(2)}</span>
                  </div>

                  {shippingDiscount < 0 && (
                    <div className="flex justify-between items-center text-[#2DC071]">
                      <span className="text-left font-semibold max-w-[170px]">150$ ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                      <span className="text-sm font-extrabold">-${Math.abs(shippingDiscount).toFixed(2)}</span>
                    </div>
                  )}

                  <hr className="border-gray-100" />

                  <div className="flex justify-between items-center text-sm font-extrabold text-[#252B42]">
                    <span>Toplam</span>
                    <span className="text-[#23A6F0] text-lg">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white border border-gray-200 hover:border-[#23A6F0] py-3 rounded-md text-xs font-bold text-[#23A6F0] transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none">
                <span className="text-sm font-extrabold">+</span>
                <span>İNDİRİM KODU GİR</span>
              </button>

              <button 
                disabled={productsTotal === 0}
                onClick={() => navigateTo('/checkout')}
                className={`w-full text-white font-bold text-sm py-4 rounded-md transition-all text-center flex items-center justify-center gap-2 shadow-md
                  ${productsTotal === 0 
                    ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                    : 'bg-[#23A6F0] hover:bg-sky-600 cursor-pointer shadow-sky-100'}`}
              >
                <span>Sepeti Onayla</span>
                <span className="text-xs">&gt;</span>
              </button>
            </div>

          </div>
        )}

        
        <div className="w-full border-b border-gray-200 flex gap-8 text-sm font-bold text-gray-500 mt-12 overflow-x-auto select-none">
          <button 
            onClick={() => setActiveTab('previous')}
            className={`pb-3 whitespace-nowrap cursor-pointer focus:outline-none transition-colors ${
              activeTab === 'previous' ? 'border-b-2 border-[#23A6F0] text-[#23A6F0]' : 'hover:text-gray-800'
            }`}
          >
            Önceden Eklediklerim
          </button>
          
          <button 
            onClick={() => setActiveTab('recommended')}
            className={`pb-3 whitespace-nowrap cursor-pointer focus:outline-none transition-colors ${
              activeTab === 'recommended' ? 'border-b-2 border-[#23A6F0] text-[#23A6F0]' : 'hover:text-gray-800'
            }`}
          >
            Önerilen Ürünler
          </button>
          
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 whitespace-nowrap cursor-pointer focus:outline-none transition-colors flex items-center gap-1.5 ${
              activeTab === 'favorites' ? 'border-b-2 border-[#23A6F0] text-[#23A6F0]' : 'hover:text-gray-800'
            }`}
          >
            Favorilerim ({favorites.length})
          </button>
        </div>

        {/* SEKME İÇERİKLERİ */}
        <div className="w-full mt-4">
          {activeTab === 'favorites' && (
            favorites.length === 0 ? (
              <p className="text-sm font-semibold text-gray-400 py-8 text-center">Henüz favorilere eklenmiş bir ürününüz bulunmuyor.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {favorites.map(prod => (
                  <ProductCard key={prod.id} product={prod} onSelect={() => navigateTo(`/shop/erkek/product/1/${prod.name}/${prod.id}`)} />
                ))}
              </div>
            )
          )}

          {activeTab === 'recommended' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {productList.slice(0, 4).map(prod => (
                <ProductCard key={prod.id} product={prod} onSelect={() => navigateTo(`/shop/erkek/product/1/${prod.name}/${prod.id}`)} />
              ))}
            </div>
          )}

          {activeTab === 'previous' && (
            <p className="text-sm font-semibold text-gray-400 py-8 text-center">Daha önce eklediğiniz ürün bulunmuyor.</p>
          )}
        </div>

      </div>
    </div>
  );
}