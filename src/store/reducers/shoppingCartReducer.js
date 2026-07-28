const initialState = {
  cart: [],                      // Sepetteki ürünler: { count, checked, product }
  payment: {},                   // Ödeme bilgileri
  address: {},                   // Genel adres nesnesi
  addressList: [],               // Kullanıcının kayıtlı adres listesi (T20)
  selectedShippingAddress: null, // Seçilen teslimat adresi (T20)
  selectedBillingAddress: null,  // Seçilen fatura adresi (T20)
  cardList: [],                  // Kullanıcının kayıtlı kredi kartı listesi (T21)
  selectedCard: null,            // Seçilen aktif kredi kartı (T21)
  previousOrders: []             // Kullanıcının geçmiş sipariş listesi (T23)
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // T17 & T18: Sepete Ürün Ekleme
    case 'ADD_TO_CART': {
      const productToAdd = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => String(item.product.id) === String(productToAdd.id)
      );

      if (existingItemIndex > -1) {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { count: 1, checked: true, product: productToAdd }]
        };
      }
    }

    // T18: Sepetten Ürün Silme
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => String(item.product.id) !== String(action.payload))
      };

    // T18: Sepetteki Ürün Adetini Güncelleme (+ / -)
    case 'UPDATE_CART_ITEM_COUNT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload.productId)
            ? { ...item, count: Math.max(1, action.payload.count) }
            : item
        )
      };

    // T18: Ürün Seçim Durumunu Değiştirme (Checkbox Toggle)
    case 'TOGGLE_CART_ITEM_CHECK':
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload)
            ? { ...item, checked: !item.checked }
            : item
        )
      };

    // T22: Sipariş Başarıyla Tamamlandığında Sepeti Sıfırlama
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [], 
        selectedCard: null
      };

    // T20: Kullanıcının Adres Listesini Store'a Kaydetme
    case 'SET_ADDRESS_LIST':
      return {
        ...state,
        addressList: action.payload
      };

    // T20: Aktif Teslimat Adresini Seçme
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        selectedShippingAddress: action.payload
      };

    // T20: Aktif Fatura Adresini Seçme
    case 'SET_BILLING_ADDRESS':
      return {
        ...state,
        selectedBillingAddress: action.payload
      };

    // T21: Kullanıcının Kredi Kartı Listesini Store'a Kaydetme
    case 'SET_CARD_LIST':
      return {
        ...state,
        cardList: action.payload
      };

    // T21: Aktif Kredi Kartını Seçme
    case 'SET_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload
      };

    // T23: Kullanıcının Geçmiş Siparişlerini Store'a Kaydetme
    case 'SET_PREVIOUS_ORDERS':
      return {
        ...state,
        previousOrders: action.payload
      };

    default:
      return state;
  }
};