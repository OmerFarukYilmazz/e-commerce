import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../product/ProductCard';


const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products?limit=20');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
  


  return (
    <section className="w-[90%] mx-auto py-16">
      {/* Başlık */}
      <div className="text-center mb-12">
        <span className="text-gray-500 block">Featured Products</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">BESTSELLER PRODUCTS</h2>
        <p className="text-gray-600">Problems trying to resolve the conflict between</p>
      </div>

      {/* Ürün Grid'i */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Butonu */}
      <div className="text-center mt-12">
        <button className="px-10 py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors">
          LOAD MORE PRODUCTS
        </button>
      </div>
    </section>
  );
};

export default ProductCards;