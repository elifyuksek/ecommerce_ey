import { API } from '../../api/api';

export const setCategories = (categories) => ({ type: 'SET_CATEGORIES', payload: categories });
export const setProductList = (products) => ({ type: 'SET_PRODUCT_LIST', payload: products });
export const setTotal = (total) => ({ type: 'SET_TOTAL', payload: total });
export const setFetchState = (state) => ({ type: 'SET_FETCH_STATE', payload: state });
export const setLimit = (limit) => ({ type: 'SET_LIMIT', payload: limit });
export const setOffset = (offset) => ({ type: 'SET_OFFSET', payload: offset });
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });
export const setProduct = (product) => ({ type: 'SET_PRODUCT', payload: product });

export const fetchCategoriesAction = () => {
  return (dispatch, getState) => {
    const { product } = getState();
    
    // Eğer kategoriler zaten yüklenmişse tekrar istek atma
    if (product?.categories && product.categories.length > 0) return;

    dispatch(setFetchState('FETCHING'));

    API.get('/categories')
      .then((res) => {
        const categoriesData = Array.isArray(res.data) ? res.data : (res.data?.categories || []);
        dispatch(setCategories(categoriesData));
        dispatch(setFetchState('FETCHED'));
      })
      .catch((err) => {
        console.error('Fetch categories error:', err);
        dispatch(setFetchState('FAILED'));
      });
  };
};

export const fetchProductsAction = (category = null, filter = '', sort = '', limit = 25, offset = 0) => {
  return (dispatch) => {
    dispatch(setFetchState('FETCHING'));
    const params = { limit, offset };
    if (category !== null && category !== undefined && category !== '') params.category = category;
    if (filter) params.filter = filter;
    if (sort) params.sort = sort;

    API.get('/products', { params })
      .then((res) => {
        const productsList = Array.isArray(res.data) 
          ? res.data 
          : (res.data?.products || (res.data?.content ? res.data.content : []));
          
        const totalCount = Array.isArray(res.data) 
          ? productsList.length 
          : (res.data?.total ?? res.data?.totalElements ?? productsList.length);

        dispatch(setProductList(productsList));
        dispatch(setTotal(totalCount));
        dispatch(setFetchState('FETCHED'));
      })
      .catch((err) => {
        console.error('Fetch products error:', err);
        dispatch(setFetchState('FAILED'));
      });
  };
};

export const fetchProductByIdAction = (productId) => {
  return (dispatch) => {
    if (!productId) {
      dispatch(setFetchState('FAILED'));
      return;
    }

    dispatch(setFetchState('FETCHING'));

    API.get(`/products/${productId}`)
      .then((res) => {
        const productData = Array.isArray(res.data) ? res.data[0] : res.data;
        dispatch(setProduct(productData));
        dispatch(setFetchState('FETCHED'));
      })
      .catch((err) => {
        console.error('Fetch product detail error:', err);
        dispatch(setFetchState('FAILED'));
      });
  };
};