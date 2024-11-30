const BlogPost = ({ 
    image, 
    category, 
    title, 
    description, 
    date,
    rating,
    price,
    salePrice,
    lessons,
    sales,
    progress 
  }) => {
    return (
      <article className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="flex gap-4 p-5 max-sm:flex-wrap">
          {/* Sol Taraf - Resim */}
          <div className="relative basis-[44%] max-sm:basis-full">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-5 left-5 bg-red-500 text-white px-3 py-1 text-sm">
              Sale
            </span>
            {/* İkon Butonları */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4">
              <button className="bg-white rounded-full p-2 hover:bg-gray-100">
                <i className="fa-regular fa-heart"></i>
              </button>
              <button className="bg-white rounded-full p-2 hover:bg-gray-100">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="bg-white rounded-full p-2 hover:bg-gray-100">
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
  
          {/* Sağ Taraf - İçerik */}
          <div className="flex flex-col gap-6 basis-[53%] max-sm:basis-full justify-center"> {/* gap-3'ten gap-4'e çıkardık ve justify-center ekledik */}
            {/* Üst Kısım */}
            <div className="flex justify-between items-center">
              <span className="text-blue-500 text-sm">{category}</span>
              <div className="flex items-center bg-black text-white rounded-full px-3 py-1">
                <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                <span className="text-xs">{rating}</span>
              </div>
            </div>
  
            {/* Başlık ve Açıklama */}
            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
  
            {/* Satış Bilgisi */}
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-arrow-up-from-bracket text-gray-500"></i>
              <span className="font-bold text-gray-500">{sales} Sales</span>
            </div>
  
            {/* Fiyat */}
            <div className="flex gap-2">
              <span className="text-gray-400 font-bold">${price}</span>
              <span className="text-blue-500 font-bold">${salePrice}</span>
            </div>
  
            {/* Renk Seçenekleri */}
            <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <div className="w-4 h-4 rounded-full bg-black"></div>
            </div>
  
            {/* Alt Bilgiler */}
            <div className="flex justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <i className="fa-regular fa-clock text-blue-500"></i>
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-regular fa-chart-bar text-orange-500"></i>
                <span>{lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-chart-line text-green-500"></i>
                <span>{progress}</span>
              </div>
            </div>
  
            {/* Learn More Butonu */}
            <button className="mt-2 text-blue-500 border border-blue-500 rounded-full py-2 px-4 hover:bg-blue-50 transition-colors w-fit">
              Learn More {'>'}
            </button>
          </div>
        </div>
      </article>
    );
  };
  
  export default BlogPost;