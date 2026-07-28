import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPreviousOrdersAction } from '../store/actions/shoppingCartActions';

export default function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client.user);
  const previousOrders = useSelector((state) => state.shoppingCart?.previousOrders) || [];
  
  // Hangi sipariş satırının açık olduğunu tutan state (Akordiyon mantığı)
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    // T23: Protected routing mantığı - Giriş yapılmadıysa login'e fırlat
    if (!user || !user.token) {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new Event('navigationChange'));
      return;
    }
    dispatch(fetchPreviousOrdersAction());
  }, [user, dispatch]);

  const toggleOrder = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] py-10 px-4 md:px-8 text-[#252B42] text-left">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Başlık */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-black">Geçmiş Siparişlerim</h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">Daha önce vermiş olduğunuz siparişlerin detaylarını buradan inceleyebilirsiniz.</p>
        </div>

        {previousOrders.length === 0 ? (
          <div className="bg-white rounded-md border border-gray-200 p-12 text-center flex flex-col items-center gap-4 shadow-xs">
            <span className="text-4xl text-gray-300">📦</span>
            <p className="font-bold text-gray-500 text-sm">Henüz kayıtlı bir siparişiniz bulunmuyor.</p>
          </div>
        ) : (
          /* Sipariş Listesi / Tablo Görünümü */
          <div className="flex flex-col gap-4">
            {previousOrders.map((order) => {
              const isOpen = openOrderId === order.id;
              const formattedDate = new Date(order.order_date).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              });

              return (
                <div key={order.id} className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden transition-all">
                  
                  {/* Sipariş Satırı Ana Başlık Alanı */}
                  <div 
                    onClick={() => toggleOrder(order.id)} 
                    className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 select-none"
                  >
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs font-bold">
                      <div>
                        <p className="text-gray-400 font-medium">SİPARİŞ TARİHİ</p>
                        <p className="text-gray-700 mt-0.5">{formattedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium">SİPARİŞ NO</p>
                        <p className="text-gray-700 mt-0.5">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium font-semibold">TOPLAM TUTAR</p>
                        <p className="text-[#23A6F0] text-sm font-extrabold mt-0.5">${order.price?.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="bg-blue-50 text-[#23A6F0] text-[10px] font-extrabold px-2.5 py-1 rounded tracking-wider">
                        SİPARİŞ ALINDI
                      </span>
                      <span className={`text-[#23A6F0] font-bold text-sm transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* COLLAPSIBLE PANEL: DETAY ALANI (Açılıp Kapanan Kısım) */}
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/30 p-4 md:p-6 animate-fade-in flex flex-col gap-4 text-xs font-bold">
                      
                      <h4 className="font-black text-sm text-gray-700 border-b border-gray-100 pb-2">Sipariş İçeriği</h4>
                      
                      {/* Ürün Listesi */}
                      <div className="flex flex-col gap-3">
                        {order.products?.map((prod, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded p-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {/* Eğer API'den görsel linki gelmiyorsa varsayılan sepet ikonu veya boş kutu */}
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-normal">
                                📦
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-gray-800 text-sm font-extrabold">Ürün ID: #{prod.product_id}</span>
                                <span className="text-gray-400 font-medium text-[11px]">{prod.detail || 'Renk: Standart - Beden: Standart'}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500 font-semibold">Adet: <span className="text-gray-800 font-bold">{prod.count}</span></p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Kart / Teslimat Özeti */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-gray-100 pt-4 text-gray-600">
                        <div>
                          <p className="text-gray-400 font-medium">Ödeme Yapılan Kart</p>
                          <p className="text-gray-700 font-extrabold mt-0.5">💳 {order.card_name} (**** **** **** {String(order.card_no).slice(-4)})</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-medium">Teslimat Adres ID</p>
                          <p className="text-gray-700 font-extrabold mt-0.5">📍 Adres Konum ID: #{order.address_id}</p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}