import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: '2026 Yaz Modasında Öne Çıkan Trendler',
    excerpt: 'Bu yaz gardırobunuzda mutlaka bulunması gereken renkler, kumaşlar ve kombin tavsiyeleri.',
    category: 'Moda & Tarz',
    date: '24 Temmuz 2026',
    author: 'Elif Yüksek',
    readTime: '5 dk okuma',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Kapsül Gardırop Nasıl Oluşturulur?',
    excerpt: 'Az eşyayla maksimum kombin: Zamansız parçalarla her güne şık başlamanın püf noktaları.',
    category: 'Rehber',
    date: '18 Temmuz 2026',
    author: 'Moda Editörü',
    readTime: '4 dk okuma',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Doğru Kumaş Seçimi ile Gün Boyu Rahatlık',
    excerpt: 'Pamuk, keten ve ipek kumaşların bakımı ve mevsimlere göre doğru kumaş tercihleri.',
    category: 'İpuçları',
    date: '10 Temmuz 2026',
    author: 'Elif Yüksek',
    readTime: '3 dk okuma',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&auto=format&fit=crop&q=80',
  }
];

export default function BlogPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <span className="text-sm font-bold text-[#23A6F0] uppercase tracking-wider">
            ElifShop Blog
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#252B42]">
            Son Yazılar ve Stil İpuçları
          </h1>
          <p className="text-sm text-[#737373] font-medium leading-relaxed">
            Trendler, moda tavsiyeleri ve ElifShop dünyasından en güncel haberler burada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 bg-[#23A6F0] text-white text-xs font-bold px-3 py-1 rounded-sm shadow">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs text-[#737373] font-semibold">
                    <span>📅 {post.date}</span>
                    <span>•</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#252B42] hover:text-[#23A6F0] transition-colors cursor-pointer line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-xs text-[#737373] leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#252B42]">
                    Yazar: {post.author}
                  </span>
                  <button className="text-xs font-bold text-[#23A6F0] hover:underline flex items-center gap-1 cursor-pointer">
                    Devamını Oku →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}