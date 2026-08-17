import React, { useState, useEffect } from 'react';
import Header from './layout/Header';
import PageContent from './layout/PageContent';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import SignUpPage from './pages/SignUpPage'; 
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage'; 
import { useDispatch } from 'react-redux';
import { verifyTokenAction } from './store/actions/clientActions';
import { fetchCategoriesAction } from './store/actions/productActions';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PreviousOrdersPage from './pages/PreviousOrdersPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyTokenAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('navigationChange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigationChange', handleLocationChange);
    };
  }, []);

  const navigateToProduct = (productData) => {
    if (!productData || !productData.id) return;

    setSelectedProduct(productData);
    
    const genderPath = productData.gender === 'k' ? 'kadin' : 'erkek';
    const categoryPath = 'product'; 
    const productName = productData.name || 'urun';

    const productSlug = String(productName)
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '') 
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const categoryId = productData.category_id || productData.categoryId || 1;
    const productUrl = `/shop/${genderPath}/${categoryPath}/${categoryId}/${productSlug}/${productData.id}`;
    
    window.history.pushState({}, '', productUrl);
    window.dispatchEvent(new Event('navigationChange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPath === '/cart') {
      return <CartPage />;
    }
    if (currentPath === '/checkout') {
       return <CheckoutPage />;
    }
    if (currentPath === '/previous-orders') {
      return <PreviousOrdersPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/team') {
      return <TeamPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/blog') { 
      return <BlogPage />;
    }
    if (currentPath === '/signup') {
      return <SignUpPage />;
    }
    if (currentPath === '/login') {
       return <LoginPage />;
    }

    const isProductDetail = /^\/shop\/[a-z]+\/[a-z0-9-]+\/\d+\/[a-z0-9-]+\/\d+$/.test(currentPath);
    if (isProductDetail) {
      return <ProductDetailPage onProductSelect={navigateToProduct} selectedProduct={selectedProduct} />;
    }
    
    if (currentPath === '/shop' || currentPath.startsWith('/shop/')) {
      return <ShopPage onProductSelect={navigateToProduct} />;
    }

    return <HomePage onProductSelect={navigateToProduct} />;
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <Header />
      <PageContent>
        {renderPage()}
      </PageContent>
      <Footer />
    </div>
  );
}