import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
// logger modülünü Vite'ın ES Modules yapısında sorunsuz tanıması için bu şekilde çekiyoruz:
import { createLogger } from 'redux-logger';

import { clientReducer } from './reducers/clientReducer';
import { productReducer } from './reducers/productReducer';
import { shoppingCartReducer } from './reducers/shoppingCartReducer';


const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer 
});

// Logger instance'ını güvenli bir fonksiyon olarak oluşturuyoruz
const loggerMiddleware = createLogger({
  collapsed: true // Konsolu çok kirletmesin diye logları kapalı (collapsed) başlatır
});

// applyMiddleware içine artık doğrudan fonksiyon olan thunk ve loggerMiddleware'i geçiyoruz
export const store = createStore(
  rootReducer, 
  applyMiddleware(thunk, loggerMiddleware)
);