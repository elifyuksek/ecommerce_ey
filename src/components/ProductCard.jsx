import React from 'react';

export default function ProductCard({ product, onSelect }) {
  // 1. API'den gelen 'images' dizisi varsa ilk resmi, yoksa eski mock 'image' alanını kullan
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0].url 
    : (product.image || 'https://via.placeholder.com/300x400?text=No+Image');

  // 2. API'den gelen 'name' varsa onu, yoksa eski mock 'title' alanını kullan
  const name = product.name || product.title || 'Untitled Product';

  // 3. API'den gelen 'description' varsa onu, yoksa eski mock 'department' alanını kullan
  const subText = product.description || product.department || 'General';

  // 4. API'den gelen 'price' varsa onu, yoksa eski mock 'newPrice' alanını kullan
  const currentPrice = product.price !== undefined ? product.price : (product.newPrice || '0.00');
  
  // 5. Eski mock verilerdeki 'oldPrice' için kontrol
  const oldPrice = product.oldPrice || null;

  return (
    <div 
      onClick={() => onSelect && onSelect(product)}
      className="w-full flex flex-col bg-white rounded-md overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100/50"
    >
      {/* Ürün Görseli */}
      <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50 relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-6 flex flex-col gap-2.5 flex-grow text-center items-center justify-between">
        <div className="flex flex-col gap-1.5 w-full">
          <h3 className="font-bold text-[#252B42] text-base tracking-wide truncate w-full group-hover:text-[#23A6F0] transition-colors">
            {name}
          </h3>
          <p className="text-xs font-bold text-[#737373] tracking-wide truncate w-full">
            {subText}
          </p>
        </div>

        {/* Fiyatlar */}
        <div className="flex items-center gap-2.5 font-bold text-sm">
          {oldPrice && (
            <span className="text-[#BDBDBD] line-through">${oldPrice}</span>
          )}
          <span className="text-[#23856D]">${currentPrice}</span>
        </div>

        {/* Renk Noktaları (Figma Tasarım Detayı) */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#23A6F0]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#23856D]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#E77C40]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#252B42]" />
        </div>
      </div>
    </div>
  );
}