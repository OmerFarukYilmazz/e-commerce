const ProductCard = ({ product }) => {
  return (
    <div className="group relative">
      {/* Ürün Resmi ve Badge'ler */}
      <div className="relative overflow-hidden">
        <img 
          src={product.images[0]?.url} 
          alt={product.name}
          className="w-full aspect-[1/1.3] object-cover"
        />
        
        {/* Sale/New Badge */}
        {product.discount_percent && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm">
            Sale
          </span>
        )}

        {/* Hover'da görünen ikonlar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <i className="fa-regular fa-heart"></i>
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>

      {/* Ürün Bilgileri */}
      <div className="text-center p-4">
        <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        
        {/* Fiyat */}
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-gray-400 line-through">${product.price}</span>
          <span className="text-blue-500 font-bold">
            ${(product.price * (1 - product.discount_percent/100)).toFixed(2)}
          </span>
        </div>

        {/* Renk seçenekleri */}
        <div className="flex justify-center gap-2 mt-3">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <div className="w-4 h-4 rounded-full bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;