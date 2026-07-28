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
import BlogPage from './pages/BlogPage'; // BLOG SAYFASI İMPORT EDİLDİ
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

  // Uygulama ilk açıldığında otomatik giriş token kontrolünü ve kategorileri tetikle
  useEffect(() => {
    dispatch(verifyTokenAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // URL değişikliklerini dinleyen popstate/navigationChange yapısı
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

  // T16: Ürüne tıklandığında SEO uyumlu slug URL'ini oluşturup yönlendiren fonksiyon
  const navigateToProduct = (productData) => {
    setSelectedProduct(productData);
    
    // Cinsiyeti belirle
    const genderPath = productData.gender === 'k' ? 'kadin' : 'erkek';
    
    // Kategori ismini ve ürün adını URL dostu slug formatına çevir
    const categoryPath = 'product'; 
    const productSlug = productData.name
      .toLowerCase()
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri temizle
      .replace(/\s+/g, '-');

    // SEO Uyumlu URL Yapısı: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
    const productUrl = `/shop/${genderPath}/${categoryPath}/${productData.category_id}/${productSlug}/${productData.id}`;
    
    window.history.pushState({}, '', productUrl);
    window.dispatchEvent(new Event('navigationChange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    // 1. ADIM: STATİK VE KESİN ROTALAR (Regex veya baş harf çakışması yaşamaması için en üstte)
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
    if (currentPath === '/blog') { // BLOG ROTASI EKLENDİ
      return <BlogPage />;
    }
    if (currentPath === '/signup') {
      return <SignUpPage />;
    }
    if (currentPath === '/login') {
       return <LoginPage />;
    }

    // 2. ADIM: DİNAMİK VE REGEX ŞABLONLU ROTALAR (Alt kısımda kalmalı)
    // T16: URL şablonunu Regex ile kontrol ederek Ürün Detay sayfasını yakalıyoruz
    const isProductDetail = /^\/shop\/[a-z]+\/[a-z0-9-]+\/\d+\/[a-z0-9-]+\/\d+$/.test(currentPath);
    if (isProductDetail) {
      return <ProductDetailPage onProductSelect={navigateToProduct} />;
    }
    
    // T14 & T15: /shop ile başlayan tüm dinamik listeleme sayfaları
    if (currentPath === '/shop' || currentPath.startsWith('/shop/')) {
      return <ShopPage onProductSelect={navigateToProduct} />;
    }

    // 3. ADIM: VARSAYILAN (Hiçbir rotaya uymazsa anasayfa)
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