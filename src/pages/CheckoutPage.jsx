import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchAddressesAction, 
  addAddressAction, 
  updateAddressAction, 
  deleteAddressAction,
  setShippingAddress,
  setBillingAddress,
  fetchCardsAction,
  addCardAction,
  deleteCardAction,
  setSelectedCard,
  createOrderAction
} from '../store/actions/shoppingCartActions';

const TURKEY_CITIES = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Ankara", "Antalya", "İstanbul", "İzmir"];

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart?.cart) || [];
  
  const addressList = useSelector((state) => state.shoppingCart?.addressList) || [];
  const selectedShipping = useSelector((state) => state.shoppingCart?.selectedShippingAddress);
  const selectedBilling = useSelector((state) => state.shoppingCart?.selectedBillingAddress);
  const cardList = useSelector((state) => state.shoppingCart?.cardList) || [];
  const selectedCard = useSelector((state) => state.shoppingCart?.selectedCard);

  const [activeStep, setActiveStep] = useState(1);
  const [sameAddress, setSameAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [secure3D, setSecure3D] = useState(false);
  
  // T22: Sipariş Başarı State'i
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const [addressFormData, setAddressFormData] = useState({ title: '', name: '', surname: '', phone: '', city: 'istanbul', district: '', neighborhood: '' });
  const [cardFormData, setCardFormData] = useState({ card_no: '', expire_month: 1, expire_year: 2026, name_on_card: '' });
  const [cardCcv, setCardCcv] = useState('321'); // Varsayılan örnek CCV

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchAddressesAction());
      dispatch(fetchCardsAction());
    }
  }, [user, dispatch]);

  const productsTotal = cart.filter(i => i.checked).reduce((acc, i) => acc + i.product.price * i.count, 0);
  const shippingPrice = productsTotal > 0 ? 29.99 : 0;
  const shippingDiscount = productsTotal >= 150 ? -29.99 : 0;
  const grandTotal = productsTotal + shippingPrice + shippingDiscount;

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (isEditingAddress) {
      dispatch(updateAddressAction(addressFormData, () => setShowAddressForm(false)));
    } else {
      dispatch(addAddressAction(addressFormData, () => setShowAddressForm(false)));
    }
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...cardFormData,
      expire_month: parseInt(cardFormData.expire_month),
      expire_year: parseInt(cardFormData.expire_year)
    };
    dispatch(addCardAction(formattedData, () => {
      setShowCardForm(false);
      setCardFormData({ card_no: '', expire_month: 1, expire_year: 2026, name_on_card: '' });
    }));
  };

  // T22: SİPARİŞİ TAMAMLA VE POST ET
  const handleCompleteOrder = () => {
    if (!selectedShipping) return alert("Lütfen bir teslimat adresi seçin.");
    
    // Form açıksa veya kart seçilmemişse uyarı ver
    const activeCardNo = showCardForm ? cardFormData.card_no : selectedCard?.card_no;
    const activeCardName = showCardForm ? cardFormData.name_on_card : selectedCard?.name_on_card;
    const activeMonth = showCardForm ? cardFormData.expire_month : selectedCard?.expire_month;
    const activeYear = showCardForm ? cardFormData.expire_year : selectedCard?.expire_year;

    if (!activeCardNo || !activeCardName) {
      return alert("Lütfen geçerli bir kart bilgisi seçin veya doldurun.");
    }

    // İstenen tam payload veri yapısını oluşturuyoruz
    const orderPayload = {
      address_id: selectedShipping.id,
      order_date: new Date().toISOString(),
      card_no: parseInt(activeCardNo.replace(/\s/g, '')) || 1234123412341234,
      card_name: activeCardName,
      card_expire_month: parseInt(activeMonth),
      card_expire_year: parseInt(activeYear),
      card_ccv: parseInt(cardCcv) || 321,
      price: parseFloat(grandTotal.toFixed(2)),
      products: cart.filter(item => item.checked).map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: `Renk: Standart - Beden: Standart` // Varsa dinamik varyasyon detayı
      }))
    };

    dispatch(createOrderAction(
      orderPayload,
      (successData) => {
        // Sipariş Başarılı
        setOrderSuccessData(successData);
      },
      (error) => {
        alert("Sipariş verilirken bir hata oluştu, lütfen bilgileri kontrol edin.");
      }
    ));
  };

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('navigationChange'));
  };

  // T22: TEBRİKLER EKRANI (Mavi Konseptli)
  if (orderSuccessData) {
    return (
      <div className="w-full min-h-screen bg-[#F9F9F9] py-16 px-4 flex items-center justify-center text-[#252B42]">
        <div className="bg-white rounded-md max-w-xl w-full p-8 shadow-md border border-gray-100 flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-[#23A6F0] rounded-full flex items-center justify-center text-3xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-black text-[#252B42]">Siparişiniz Başarıyla Alındı!</h1>
          <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-md">
            Harika bir seçim yaptınız! Alışverişiniz için teşekkür ederiz. Sipariş özetiniz e-posta adresinize gönderilmiştir.
          </p>
          <div className="bg-gray-50 rounded p-4 w-full text-xs font-bold text-gray-600 flex flex-col gap-2 text-left">
            <p><span className="text-gray-400">Sipariş ID:</span> #{orderSuccessData.id || '28471'}</p>
            <p><span className="text-gray-400">Ödenen Tutar:</span> ${grandTotal.toFixed(2)}</p>
            <p><span className="text-gray-400">Teslimat Adresi:</span> {selectedShipping?.title} ({selectedShipping?.city})</p>
          </div>
          <button 
            onClick={() => navigateTo('/')}
            className="mt-2 px-8 py-3 bg-[#23A6F0] hover:bg-sky-600 text-white font-bold text-sm rounded shadow-md shadow-sky-100 transition-colors cursor-pointer"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] py-8 px-4 md:px-8 text-[#252B42]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* SOL ALAN */}
        <div className="w-full lg:w-[72%] flex flex-col gap-6">
          {/* ÜST ADIM NAVİGASYON ŞERİDİ */}
          <div className="w-full bg-white rounded-md border border-gray-200 flex shadow-sm overflow-hidden">
            <button onClick={() => setActiveStep(1)} className={`w-1/2 p-4 border-b-4 text-left focus:outline-none transition-all cursor-pointer ${activeStep === 1 ? 'border-[#23A6F0] bg-blue-50/20' : 'border-gray-100 opacity-60'}`}>
              <span className={`text-xl font-extrabold ${activeStep === 1 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>1. Adres Bilgileri</span>
              <p className="text-xs text-gray-500 font-bold mt-1">{selectedShipping ? `${selectedShipping.title} Adresi Seçili` : 'Teslimat adresi seçiniz'}</p>
            </button>
            <button disabled={!selectedShipping} onClick={() => setActiveStep(2)} className={`w-1/2 p-4 border-b-4 text-left focus:outline-none transition-all ${activeStep === 2 ? 'border-[#23A6F0] bg-blue-50/20' : 'border-gray-100 opacity-60'} ${!selectedShipping ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              <span className={`text-xl font-extrabold ${activeStep === 2 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>2. Ödeme Seçenekleri</span>
              <p className="text-xs text-gray-500 font-medium mt-1">Banka/Kredi Kartı güvenli ödeme adımı.</p>
            </button>
          </div>

          {/* ADIM 1 İÇERİĞİ */}
          {activeStep === 1 && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="w-full bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center gap-3 text-xs font-bold text-gray-600 text-left">
                <span className="text-blue-500 text-sm">ℹ</span>
                <p>Kurumsal faturalı alışveriş için "Faturamı Aynı Adrese Gönder" tikini kaldırıp kurumsal faturanızı seçebilirsiniz.</p>
              </div>
              <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm flex flex-col gap-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <h2 className="text-base font-bold">Teslimat Adresi</h2>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer accent-[#23A6F0]"><input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />Faturamı Aynı Adrese Gönder</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button onClick={() => { setIsEditingAddress(false); setAddressFormData({ title: '', name: '', surname: '', phone: '', city: 'istanbul', district: '', neighborhood: '' }); setShowAddressForm(true); }} className="border-2 border-dashed border-gray-300 hover:border-[#23A6F0] rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all min-h-[150px]"><span className="text-2xl font-bold text-gray-400 hover:text-[#23A6F0]">+</span><span className="text-sm font-bold text-gray-500">Yeni Adres Ekle</span></button>
                  {addressList.map((addr) => (
                    <div key={addr.id} className={`border rounded-md p-4 flex flex-col justify-between text-left min-h-[150px] ${selectedShipping?.id === addr.id ? 'border-[#23A6F0] ring-1 ring-[#23A6F0] bg-blue-50/5' : 'border-gray-200 bg-white'}`}>
                      <div className="flex justify-between items-start">
                        <label className="flex items-center gap-2 font-bold text-sm cursor-pointer accent-[#23A6F0]"><input type="radio" name="shippingAddress" checked={selectedShipping?.id === addr.id} onChange={() => dispatch(setShippingAddress(addr))} className="w-4 h-4" /><span>{addr.title}</span></label>
                        <div className="flex gap-2 text-xs font-bold text-[#23A6F0]"><button onClick={() => { setIsEditingAddress(true); setAddressFormData(addr); setShowAddressForm(true); }} className="hover:underline cursor-pointer">Düzenle</button><span className="text-gray-200">|</span><button onClick={() => dispatch(deleteAddressAction(addr.id))} className="hover:text-red-500 cursor-pointer">Sil</button></div>
                      </div>
                      <p className="text-xs font-bold text-gray-700 mt-2">{addr.name} {addr.surname}</p>
                      <p className="text-xs text-gray-500 font-semibold line-clamp-2">{addr.neighborhood} - {addr.district} / {addr.city}</p>
                      <p className="text-[11px] text-gray-400 font-bold border-t border-gray-50 pt-1.5 mt-2">📞 {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADIM 2 İÇERİĞİ */}
          {activeStep === 2 && (
            <div className="bg-white rounded-md border border-gray-200 p-6 shadow-sm flex flex-col gap-6 text-left animate-fade-in">
              <div className="border border-blue-100 bg-blue-50/20 rounded-md p-4 flex items-start gap-3">
                <input type="radio" defaultChecked className="w-5 h-5 accent-[#23A6F0] mt-0.5 cursor-pointer" />
                <div className="flex flex-col gap-0.5"><h3 className="font-bold text-sm">Kart ile Öde</h3><p className="text-xs text-gray-500 font-semibold">Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.</p></div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-3/5 flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h4 className="font-extrabold text-sm text-[#252B42]">Kart Bilgileri</h4>
                    <button onClick={() => setShowCardForm(!showCardForm)} className="text-xs font-bold text-[#23A6F0] hover:underline cursor-pointer">{showCardForm ? "Kayıtlı kartımla ödeme yap" : "Başka bir Kart ile Ödeme Yap"}</button>
                  </div>

                  {showCardForm ? (
                    <form onSubmit={handleCardSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-700">
                      <div className="flex flex-col gap-1.5"><label>Kart Numarası</label><input required type="text" maxLength="16" placeholder="1234123412341234" value={cardFormData.card_no} onChange={(e) => setCardFormData({...cardFormData, card_no: e.target.value})} className="border border-gray-300 rounded p-2.5 font-medium focus:border-[#23A6F0] focus:outline-none" /></div>
                      <div className="flex flex-col gap-1.5"><label>Kart Üzerindeki İsim</label><input required type="text" placeholder="Ali Baş" value={cardFormData.name_on_card} onChange={(e) => setCardFormData({...cardFormData, name_on_card: e.target.value})} className="border border-gray-300 rounded p-2.5 font-medium focus:border-[#23A6F0] focus:outline-none" /></div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1.5"><label>Son Kul. Ay</label><select value={cardFormData.expire_month} onChange={(e) => setCardFormData({...cardFormData, expire_month: e.target.value})} className="border border-gray-300 rounded p-2.5 font-medium focus:border-[#23A6F0] focus:outline-none bg-white">{Array.from({length:12}, (_,i)=> i+1).map(m => <option key={m} value={m}>{m < 10 ? `0${m}` : m}</option>)}</select></div>
                        <div className="flex flex-col gap-1.5"><label>Son Kul. Yıl</label><select value={cardFormData.expire_year} onChange={(e) => setCardFormData({...cardFormData, expire_year: e.target.value})} className="border border-gray-300 rounded p-2.5 font-medium focus:border-[#23A6F0] focus:outline-none bg-white">{Array.from({length:15}, (_,i)=> 2026+i).map(y => <option key={y} value={y}>{y}</option>)}</select></div>
                        <div className="flex flex-col gap-1.5"><label className="flex items-center gap-1">CVV</label><input required type="text" maxLength="3" value={cardCcv} onChange={(e) => setCardCcv(e.target.value)} className="border border-gray-300 rounded p-2.5 font-medium focus:border-[#23A6F0] focus:outline-none" /></div>
                      </div>
                      <button type="submit" className="w-full bg-[#23A6F0] hover:bg-sky-600 text-white font-bold py-3 rounded transition-colors cursor-pointer mt-2 shadow-sm">Kartı Kaydet ve Kullan</button>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[280px] overflow-y-auto pr-1">
                      {cardList.map((card) => (
                        <div key={card.id} className={`border rounded-md p-4 flex flex-col justify-between min-h-[120px] cursor-pointer group ${selectedCard?.id === card.id ? 'border-[#23A6F0] ring-1 ring-[#23A6F0] bg-blue-50/5' : 'border-gray-200 bg-white'}`} onClick={() => dispatch(setSelectedCard(card))}>
                          <div className="flex justify-between items-center"><label className="flex items-center gap-2 font-bold text-xs cursor-pointer accent-[#23A6F0]"><input type="radio" name="activeCard" checked={selectedCard?.id === card.id} readOnly className="w-4 h-4" /><span className="uppercase text-gray-600 tracking-wide font-extrabold">{card.name_on_card}</span></label><button onClick={(e) => { e.stopPropagation(); dispatch(deleteCardAction(card.id)); }} className="text-gray-300 hover:text-red-500 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Sil</button></div>
                          <div className="my-3 font-mono text-sm tracking-widest text-gray-700 font-semibold">**** **** **** {card.card_no ? String(card.card_no).slice(-4) : '****'}</div>
                          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400"><span>{card.expire_month}/{card.expire_year}</span><span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-extrabold tracking-wide">CREDIT</span></div>
                        </div>
                      ))}
                    </div>
                  )}

                  <label className="flex items-center gap-2 text-xs font-bold text-gray-600 mt-4 cursor-pointer accent-[#23A6F0] select-none">
                    <input type="checkbox" checked={secure3D} onChange={(e) => setSecure3D(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
                    🛡️ 3D Secure ile ödemek istiyorum.
                  </label>
                </div>

                <div className="w-full md:w-2/3 border border-gray-200 rounded-md p-4 bg-gray-50/30">
                  <h4 className="font-extrabold text-sm text-[#252B42] border-b border-gray-100 pb-2 mb-3">Taksit Seçenekleri</h4>
                  <table className="w-full text-xs text-left border-collapse bg-white border border-gray-100 rounded overflow-hidden">
                    <thead><tr className="bg-gray-50 font-bold text-gray-500 border-b border-gray-100"><th className="p-3">Taksit Sayısı</th><th className="p-3 text-right">Aylık Ödeme</th></tr></thead>
                    <tbody><tr className="border-b border-gray-100 font-bold text-[#252B42]"><td className="p-3 flex items-center gap-2 accent-[#23A6F0]"><input type="radio" name="installment" defaultChecked className="w-4 h-4" /><span>Tek Çekim</span></td><td className="p-3 text-right text-gray-700">${grandTotal.toFixed(2)}</td></tr></tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SAĞ PANEL */}
        <div className="w-full lg:w-[28%] flex flex-col gap-4">
          {activeStep === 1 ? (
            <button disabled={!selectedShipping} onClick={() => setActiveStep(2)} className={`w-full text-white font-bold text-sm py-4 rounded-md transition-all text-center flex items-center justify-center gap-2 shadow-md ${!selectedShipping ? 'bg-gray-300 cursor-not-allowed shadow-none' : 'bg-[#23A6F0] hover:bg-sky-600 cursor-pointer shadow-sky-100'}`}>
              Kaydet ve Devam Et
            </button>
          ) : (
            <button 
              onClick={handleCompleteOrder} 
              className="w-full text-white bg-[#23A6F0] hover:bg-sky-600 font-bold text-sm py-4 rounded-md transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-sky-100 cursor-pointer"
            >
              Ödeme Yap
            </button>
          )}

          <div className="bg-white border border-gray-200 rounded-md p-4 text-left text-[11px] font-bold text-gray-500 flex items-start gap-2">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#23A6F0] rounded border-gray-300 accent-[#23A6F0] cursor-pointer mt-0.5" />
            <p className="leading-tight"><span className="text-[#23A6F0] underline cursor-pointer">Ön Bilgilendirme Koşulları</span>'nı ve <span className="text-[#23A6F0] underline cursor-pointer">Mesafeli Satış Sözleşmesi</span>'ni okudum.</p>
          </div>

          <div className="bg-white rounded-md border border-gray-200 p-5 shadow-sm flex flex-col gap-5">
            <h2 className="text-base font-bold text-left">Sipariş Özeti</h2>
            <div className="flex flex-col gap-3.5 text-xs text-gray-600 font-bold">
              <div className="flex justify-between items-center"><span className="text-gray-500 text-left font-semibold">Ürünün Toplamı</span><span className="text-[#252B42] text-sm">${productsTotal.toFixed(2)}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 text-left font-semibold">Kargo Toplam</span><span className="text-[#252B42] text-sm">${shippingPrice.toFixed(2)}</span></div>
              {shippingDiscount < 0 && (<div className="flex justify-between items-center text-[#2DC071]"><span className="text-left font-semibold">150$ ve Üzeri Kargo Bedava</span><span className="text-sm font-extrabold">-${Math.abs(shippingDiscount).toFixed(2)}</span></div>)}
              <hr className="border-gray-100" />
              <div className="flex justify-between items-center text-sm font-extrabold text-[#252B42]"><span>Toplam</span><span className="text-[#23A6F0] text-lg">${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL: ADRES FORMU */}
      {showAddressForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-md max-w-lg w-full p-6 shadow-xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-left border-b border-gray-100 pb-2">{isEditingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}</h3>
            <form onSubmit={handleAddressSubmit} className="grid grid-cols-2 gap-4 text-left text-xs font-bold text-gray-700">
              <div className="col-span-2 flex flex-col gap-1"><label>Adres Başlığı</label><input required type="text" value={addressFormData.title} onChange={(e)=>setAddressFormData({...addressFormData, title:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none font-medium"/></div>
              <div className="flex flex-col gap-1"><label>Ad</label><input required type="text" value={addressFormData.name} onChange={(e)=>setAddressFormData({...addressFormData, name:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none font-medium"/></div>
              <div className="flex flex-col gap-1"><label>Soyad</label><input required type="text" value={addressFormData.surname} onChange={(e)=>setAddressFormData({...addressFormData, surname:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none font-medium"/></div>
              <div className="col-span-2 flex flex-col gap-1"><label>Telefon</label><input required type="text" value={addressFormData.phone} onChange={(e)=>setAddressFormData({...addressFormData, phone:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none font-medium"/></div>
              <div className="flex flex-col gap-1"><label>Şehir</label><select value={addressFormData.city} onChange={(e)=>setAddressFormData({...addressFormData, city:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none bg-white font-medium">{TURKEY_CITIES.map(c=><option key={c} value={c.toLowerCase()}>{c}</option>)}</select></div>
              <div className="flex flex-col gap-1"><label>İlçe</label><input required type="text" value={addressFormData.district} onChange={(e)=>setAddressFormData({...addressFormData, district:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none font-medium"/></div>
              <div className="col-span-2 flex flex-col gap-1"><label>Detaylı Adres</label><textarea required rows="3" value={addressFormData.neighborhood} onChange={(e)=>setAddressFormData({...addressFormData, neighborhood:e.target.value})} className="border rounded p-2 focus:border-[#23A6F0] focus:outline-none resize-none font-medium"/></div>
              <div className="col-span-2 flex justify-end gap-2 pt-2 border-t mt-2">
                <button type="button" onClick={()=>setShowAddressForm(false)} className="px-4 py-2 border rounded cursor-pointer text-gray-500">Vazgeç</button>
                <button type="submit" className="px-5 py-2 bg-[#23A6F0] text-white rounded cursor-pointer">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}