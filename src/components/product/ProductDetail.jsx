import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Ürün detayı yüklenirken hata:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!product) return <div>Ürün bulunamadı</div>;

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-[10%] pt-6">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/shop" className="text-gray-400 hover:text-primary">Shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">{product.name}</span>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-[10%] py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sol Taraf - Ürün Görselleri */}
          <div className="lg:w-[40%]">
            <div className="relative aspect-[4/5] bg-white mb-4">
              <img
                src={product.images[activeImageIndex]?.url}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`cursor-pointer w-[70px] h-[90px] bg-white p-2 ${
                    activeImageIndex === index ? 'border-2 border-primary' : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="lg:w-[60%] flex flex-col justify-between">
            <div>
              <h1 className="text-[1.75rem] font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <span className="text-sm text-gray-500">10 Reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-primary">
                  ${(product.price * (1 - product.discount_percent/100)).toFixed(2)}
                </span>
                {product.discount_percent > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mb-4">
                <span className="text-sm text-gray-500">Availability :</span>
                <span className="text-sm text-primary font-medium">In Stock</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <hr className="mb-8" />
            </div>

            <div>
              <div className="flex gap-3 mb-8">
                <div className="w-6 h-6 rounded-full bg-[#23A6F0] cursor-pointer"></div>
                <div className="w-6 h-6 rounded-full bg-[#2DC071] cursor-pointer"></div>
                <div className="w-6 h-6 rounded-full bg-[#E77C40] cursor-pointer"></div>
                <div className="w-6 h-6 rounded-full bg-black cursor-pointer"></div>
              </div>

              <div className="flex gap-4">
                <button className="px-8 py-3 bg-primary text-white rounded-md hover:bg-blue-600 font-medium">
                  Select Options
                </button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full hover:bg-gray-100">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;