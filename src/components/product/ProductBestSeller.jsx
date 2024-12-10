import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductBestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products');
        // Fiyata göre sıralama ve ilk 8 ürünü alma
        const sortedProducts = response.data.products
          .sort((a, b) => a.price - b.price)
          .slice(0, 8);
        setProducts(sortedProducts);
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
    <section className="bg-[#FAFAFA] py-12">
      <div className="container mx-auto px-4 md:px-8">
        {/* Başlık */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl pb-5">BESTSELLER PRODUCTS</h3>
          <div className="border-[1px] border-gray-200" />
        </div>

        {/* Ürün Grid'i */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              colors={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default ProductBestSeller;