import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios'; // old method
import ProductCard from '../product/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilteredProducts, setSort, setFilter, setOffset} from '../../store/actions/productAction';
import debounce from 'lodash/debounce';
import ReactPaginate from 'react-paginate';

import { useHistory, useLocation } from 'react-router-dom';


const ProductCards = () => {
  // for old and new method
  //const [sortType, setSortType] = useState('default');
  const [viewType, setViewType] = useState('grid');
  const location = useLocation();
  const history = useHistory();

  // for store method
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const {
    productList,    
    selectedGender,
    selectedCategory,
    filter,
    sort,
    limit,
    offset,
    total
  } = useSelector(state => state.product);
  
  const fetchState = useSelector(state => state.product.productsFetchState);
  console.log(fetchState + " fetchState");

  // Sort options
  const sortOptions = [
  { value: '', label: 'Popularity' },
  { value: 'price:asc', label: 'Price Low to High' },
  { value: 'price:desc', label: 'Price High to Low' },
  { value: 'rating:asc', label: 'Rating Low to High' },
  { value: 'rating:desc', label: 'Rating High to Low' }
  ];

  // filter değişkenini dependency array'den çıkarıyoruz
  useEffect(() => {
    if (fetchState === 'NOT_FETCHED') {
      dispatch(fetchFilteredProducts());
    }
  }, [selectedGender, selectedCategory, filter, sort, dispatch]);

  // URL'den current page'i al
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentOffset = parseInt(params.get('offset')) || 0;
    if (currentOffset !== offset) {
      dispatch(setOffset(currentOffset));
      dispatch(fetchFilteredProducts());
    }
  }, [location.search]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setFilter(value));
      dispatch(fetchFilteredProducts());
    }, 500),
    [dispatch]
  );

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Local state'i güncelle
    debouncedSearch(value); // Debounced API çağrısı
  };

  const handlePageChange = ({ selected }) => {
    const newOffset = selected * limit;
    
    // URL'i güncelle
    const params = new URLSearchParams(location.search);
    params.set('offset', newOffset);
    params.set('limit', limit);
    
    history.push({
      pathname: location.pathname,
      search: `?${params.toString()}`
    });

    dispatch(setOffset(newOffset));
    dispatch(fetchFilteredProducts());
    window.scrollTo(0, 0);
  };

  if (fetchState === 'FETCHING') {
    return <div>Loading...</div>; // spinner will be added
  }

  // Mevcut ürünleri filtrele
  const filteredProducts = searchTerm 
    ? productList.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productList;



  // old method for fetching products
  /*
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  
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
  */

  return (
    <main className="flex justify-center pb-20 pt-10">
      <div className="basis-[90%] flex flex-col">
        {/* Üst Bilgi ve Filtreler */}
        <div className="flex max-md:flex-col justify-between max-md:justify-center px-10 items-center flex-wrap gap-5 pb-10">
          {/* Sonuç Sayısı */}
          <h6 className="font-bold text-sm text-secondTextColor">
            Showing all {productList.length} results
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
                value={sort}
                onChange={handleSortChange}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={searchTerm}
                onChange={handleFilterChange}
                placeholder="Search products..."
                className="px-4 py-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Ürün Grid/List */}
        <div className={`
          ${viewType === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'
          } px-10
        `}>
          {productList.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              viewType={viewType}
            />
          ))}
        </div>

        {/* Sayfalama */}
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel= "..."
          pageCount={Math.ceil(total / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          forcePage={offset / limit}
          containerClassName="pagination flex justify-center items-center gap-2 mt-8"
          pageClassName="page-item"
          pageLinkClassName="page-link px-4 py-2 border rounded hover:bg-primary hover:text-white"
          previousClassName="page-item"
          previousLinkClassName="page-link px-4 py-2 border rounded hover:bg-primary hover:text-white"
          nextClassName="page-item"
          nextLinkClassName="page-link px-4 py-2 border rounded hover:bg-primary hover:text-white"
          breakClassName="page-item"
          breakLinkClassName="page-link px-4 py-2"
          activeClassName="active bg-primary text-white"
        />
      </div>
    </main>
  );
};

export default ProductCards;