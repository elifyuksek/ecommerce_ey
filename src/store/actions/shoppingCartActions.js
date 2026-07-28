import { API } from '../../api/api';

// ==========================================
// SEPET AKSİYONLARI (T17 & T18)
// ==========================================
export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId
});

export const updateCartItemCount = (productId, count) => ({
  type: 'UPDATE_CART_ITEM_COUNT',
  payload: { productId, count }
});

export const toggleCartItemCheck = (productId) => ({
  type: 'TOGGLE_CART_ITEM_CHECK',
  payload: productId
});

export const clearCart = () => ({ 
  type: 'CLEAR_CART' 
});

// ==========================================
// ADRES AKSİYONLARI (T20)
// ==========================================
export const setAddressList = (addressList) => ({ type: 'SET_ADDRESS_LIST', payload: addressList });
export const setShippingAddress = (address) => ({ type: 'SET_SHIPPING_ADDRESS', payload: address });
export const setBillingAddress = (address) => ({ type: 'SET_BILLING_ADDRESS', payload: address });

// 1. Kayıtlı Adresleri Listeleme (GET)
export const fetchAddressesAction = () => {
  return (dispatch) => {
    API.get('/user/address')
      .then((res) => {
        dispatch(setAddressList(res.data));
        if (res.data.length > 0) {
          dispatch(setShippingAddress(res.data[0]));
          dispatch(setBillingAddress(res.data[0]));
        }
      })
      .catch((err) => console.error('Adresler yüklenirken hata oluştu:', err));
  };
};

// 2. Yeni Adres Ekleme (POST)
export const addAddressAction = (addressData, callback) => {
  return (dispatch) => {
    API.post('/user/address', addressData)
      .then(() => {
        dispatch(fetchAddressesAction());
        if (callback) callback();
      })
      .catch((err) => console.error('Adres eklenirken hata oluştu:', err));
  };
};

// 3. Adres Güncelleme (PUT)
export const updateAddressAction = (addressData, callback) => {
  return (dispatch) => {
    API.put('/user/address', addressData)
      .then(() => {
        dispatch(fetchAddressesAction());
        if (callback) callback();
      })
      .catch((err) => console.error('Adres güncellenirken hata oluştu:', err));
  };
};

// 4. Adres Silme (DELETE)
export const deleteAddressAction = (addressId) => {
  return (dispatch) => {
    API.delete(`/user/address/${addressId}`)
      .then(() => {
        dispatch(fetchAddressesAction());
      })
      .catch((err) => console.error('Adres silinirken hata oluştu:', err));
  };
};

// ==========================================
// KART AKSİYONLARI (T21)
// ==========================================
export const setCardList = (cards) => ({ type: 'SET_CARD_LIST', payload: cards });
export const setSelectedCard = (card) => ({ type: 'SET_SELECTED_CARD', payload: card });

// 1. Kayıtlı Kartları Listeleme (GET)
export const fetchCardsAction = () => {
  return (dispatch) => {
    API.get('/user/card')
      .then((res) => {
        dispatch(setCardList(res.data));
        if (res.data.length > 0) {
          dispatch(setSelectedCard(res.data[0]));
        }
      })
      .catch((err) => console.error('Kartlar yüklenirken hata oluştu:', err));
  };
};

// 2. Yeni Kart Ekleme (POST)
export const addCardAction = (cardData, callback) => {
  return (dispatch) => {
    API.post('/user/card', cardData)
      .then(() => {
        dispatch(fetchCardsAction());
        if (callback) callback();
      })
      .catch((err) => console.error('Kart eklenirken hata oluştu:', err));
  };
};

// 3. Kart Bilgisi Güncelleme (PUT)
export const updateCardAction = (cardData, callback) => {
  return (dispatch) => {
    API.put('/user/card', cardData)
      .then(() => {
        dispatch(fetchCardsAction());
        if (callback) callback();
      })
      .catch((err) => console.error('Kart güncellenirken hata oluştu:', err));
  };
};

// 4. Kart Silme (DELETE)
export const deleteCardAction = (cardId) => {
  return (dispatch) => {
    API.delete(`/user/card/${cardId}`)
      .then(() => {
        dispatch(fetchCardsAction());
      })
      .catch((err) => console.error('Kart silinirken hata oluştu:', err));
  };
};

// ==========================================
// SİPARİŞ AKSİYONLARI (T22 & T23)
// ==========================================
export const setPreviousOrders = (orders) => ({ 
  type: 'SET_PREVIOUS_ORDERS', 
  payload: orders 
});

// T22: Siparişi API'ye Gönderen POST Thunk Aksiyonu
export const createOrderAction = (orderPayload, onSuccess, onError) => {
  return (dispatch) => {
    API.post('/order', orderPayload)
      .then((res) => {
        dispatch(clearCart());
        if (onSuccess) onSuccess(res.data);
      })
      .catch((err) => {
        console.error('Sipariş oluşturulurken hata:', err);
        if (onError) onError(err);
      });
  };
};

// T23: Geçmiş Siparişleri Getiren GET Thunk Aksiyonu
export const fetchPreviousOrdersAction = () => {
  return (dispatch) => {
    API.get('/order')
      .then((res) => {
        // En yeni siparişlerin üstte görünmesi için tarihe göre sıralama
        const sortedOrders = res.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        dispatch(setPreviousOrders(sortedOrders));
      })
      .catch((err) => console.error('Geçmiş siparişler çekilirken hata oluştu:', err));
  };
};