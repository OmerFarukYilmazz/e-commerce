import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/shoppingCartAction";

const ProductCard = ({ product, viewType = "grid" }) => {
  const history = useHistory();
  const { selectedGender, selectedCategory } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Tıklamanın parent'a gitmesini engelle
    dispatch(addToCart(product));
  };

  const handleProductClick = () => {
    const productNameSlug = product.name.toLowerCase().replace(/ /g, "-");
    history.push(
      `/shop/${
        selectedGender === "e" ? "erkek" : "kadin"
      }/${selectedCategory.title.toLowerCase()}/${
        selectedCategory.id
      }/${productNameSlug}/${product.id}`
    );
  };

  // Fiyat hesaplamaları
  const originalPrice = parseFloat(product.price);
  const discountPercent = parseFloat(product.discount_percent) || 0;
  const discountedPrice = originalPrice * (1 - discountPercent / 100);

  return (
    <div className="group relative cursor-pointer" onClick={handleProductClick}>
      {/* Ürün Resmi ve Badge'ler */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full aspect-[1/1.3] object-cover"
        />

        {discountPercent > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm">
            -{discountPercent}%
          </span>
        )}

        {/* Hover'da görünen ikonlar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full hover:bg-gray-100">
            <i className="fa-regular fa-heart"></i>
          </button>
          <button
            className="p-2 bg-white rounded-full hover:bg-gray-100"
            onClick={handleAddToCart}
          >
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

        <p className="text-sm text-gray-600 mt-2 line-clamp-2 break-words">
          {product.description}
        </p>

        {/* Fiyat Bilgisi - Her zaman iki fiyatı da göster */}
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="text-gray-400 text-sm">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-green-600 font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>

        {/* Renk seçenekleri */}
        <div className="flex justify-center gap-2 mt-3">
          {product.colors?.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
