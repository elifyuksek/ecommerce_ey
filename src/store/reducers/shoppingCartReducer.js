const initialState = {
  cart: [],                      
  payment: {},                   
  address: {},                   
  addressList: [],               
  selectedShippingAddress: null, 
  selectedBillingAddress: null,  
  cardList: [],                  
  selectedCard: null,            
  previousOrders: []             
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    
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

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => String(item.product.id) !== String(action.payload))
      };

    case 'UPDATE_CART_ITEM_COUNT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload.productId)
            ? { ...item, count: Math.max(1, action.payload.count) }
            : item
        )
      };

    case 'TOGGLE_CART_ITEM_CHECK':
      return {
        ...state,
        cart: state.cart.map((item) =>
          String(item.product.id) === String(action.payload)
            ? { ...item, checked: !item.checked }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [], 
        selectedCard: null
      };

    case 'SET_ADDRESS_LIST':
      return {
        ...state,
        addressList: action.payload
      };

    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        selectedShippingAddress: action.payload
      };

    case 'SET_BILLING_ADDRESS':
      return {
        ...state,
        selectedBillingAddress: action.payload
      };

    case 'SET_CARD_LIST':
      return {
        ...state,
        cardList: action.payload
      };

    case 'SET_SELECTED_CARD':
      return {
        ...state,
        selectedCard: action.payload
      };

    case 'SET_PREVIOUS_ORDERS':
      return {
        ...state,
        previousOrders: action.payload
      };

    default:
      return state;
  }
};