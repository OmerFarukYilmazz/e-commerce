import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../product/ProductCard';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewType, setViewType] = useState('grid');
  const [sortType, setSortType] = useState('default');
  const limit = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://workintech-fe-ecommerce.onrender.com/products?limit=${limit}&offset=${(currentPage - 1) * limit}`
        );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / limit));
        setLoading(false);
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  return (
    <main className="flex justify-center pb-20 pt-10">
      <div className="basis-[90%] flex flex-col">
        {/* Üst Bilgi ve Filtreler */}
        <div className="flex max-md:flex-col justify-between max-md:justify-center px-10 items-center flex-wrap gap-5 pb-10">
          {/* Sonuç Sayısı */}
          <h6 className="font-bold text-sm text-secondTextColor">
            Showing all {products.length} results
          </h6>

          {/* Görünüm Seçenekleri */}
          <div className="flex text-sm gap-3 items-center">
            <h6 className="font-bold text-sm text-secondTextColor">Views:</h6>
            <button 
              className={`border border-lightGray rounded p-2 ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewType('grid')}
            >
              <i className="fa-brands fa-microsoft text-sm"></i>
            </button>
            <button 
              className={`border border-lightGray rounded p-2 ${viewType === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewType('list')}
            >
              <i className="fa-solid fa-list text-sm"></i>
            </button>
          </div>

          {/* Sıralama ve Filtre */}
          <div className="flex gap-2">
            <div className="rounded bg-bgInput border border-borderGray">
              <select
                className="bg-bgInput text-sm text-secondTextColor py-2 px-4"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="default">Popularity</option>
                <option value="price_low">Price Low to High</option>
                <option value="price_high">Price High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <button className="font-bold text-sm text-white bg-primary px-5 py-2 rounded hover:opacity-70">
              Filter
            </button>
          </div>
        </div>

        {/* Ürün Grid/List */}
        <div className={`
          ${viewType === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'
          } px-10
        `}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              viewType={viewType}
            />
          ))}
        </div>

        {/* Sayfalama */}
        <div className="text-primary w-[313px] h-[44px] flex mx-auto border border-lightGray rounded-md mt-12">
          <button className="basis-[33%] border-r border-lightGray hover:bg-primary hover:text-white text-sm">
            First
          </button>
          <button className="basis-[22%] border-r border-lightGray hover:bg-primary hover:text-white text-sm">
            1
          </button>
          <button className="basis-[22%] border-r border-lightGray hover:bg-primary hover:text-white text-sm">
            2
          </button>
          <button className="basis-[22%] border-r border-lightGray hover:bg-primary hover:text-white text-sm">
            3
          </button>
          <button className="basis-[33%] hover:bg-primary hover:text-white text-sm">
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductCards;