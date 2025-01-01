import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  setSelectedGender, 
  setSelectedCategory, 
  fetchFilteredProducts,
  fetchCategories,
} from "../../store/actions/productAction";

const ShopContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.product.categories);
  const categoriesFetchState = useSelector(state => state.product.categoriesFetchState);

  // URL'den cinsiyet bilgisini al
  const getGenderFromUrl = () => {
    const pathSegments = location.pathname.split('/');
    const genderIndex = pathSegments.findIndex(segment => 
      segment === 'erkek' || segment === 'kadin'
    );
  
    if (genderIndex !== -1) {
      return {
        gender: pathSegments[genderIndex] === 'erkek' ? 'e' : 'k',
        index: genderIndex,
        pathSegments
      };
    }
    return null;
  };

  // Kategorileri cinsiyete göre filtrele ve rating'e göre sırala
  const getTopCategories = () => {
    const urlGenderInfo = getGenderFromUrl();
    
    if (!urlGenderInfo) {
      return categories
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    }
  
    return categories
      .filter(cat => cat.gender === urlGenderInfo.gender)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  };

  // Kategorileri yükle ve URL'den gelen parametreleri işle
  useEffect(() => {
    const loadData = async () => {
      // Kategorileri yükle
      if (categoriesFetchState === 'NOT_FETCHED') {
        await dispatch(fetchCategories());
      }

      const urlGenderInfo = getGenderFromUrl();
      if (urlGenderInfo) {
        dispatch(setSelectedGender(urlGenderInfo.gender));

        // URL'den kategori bilgisini al
        const categoryTitle = urlGenderInfo.pathSegments[urlGenderInfo.index + 1];
        const categoryId = urlGenderInfo.pathSegments[urlGenderInfo.index + 2];
        
        if (categoryTitle && categoryId) {
          dispatch(setSelectedCategory({
            id: categoryId,
            title: categoryTitle,
            gender: urlGenderInfo.gender
          }));
        }
        
        dispatch(fetchFilteredProducts());
      }
    };

    loadData();
  }, [location, dispatch, categoriesFetchState]);

  if (categoriesFetchState === 'FETCHING' || categories.length === 0) {
    return <div>Loading...</div>;
  }

  const topCategories = getTopCategories();
  return (
    <section className="flex justify-center bg-gray-100 py-4">
      <div className="flex flex-col justify-center basis-[85%] gap-4 pb-6">
        {/* Başlık ve Navigation */}
        <div className="flex max-md:flex-col justify-between items-center px-4">
          <h3 className="font-bold text-2xl">Shop</h3>
          <div className="py-5">
            <Link className="font-bold text-sm hover:underline" to="/">
              Home
            </Link>
            <i className="fa-solid fa-chevron-right m-2 text-muted"></i>
            <Link className="font-bold text-sm text-muted hover:underline" to="/shop">
              Shop
            </Link>
          </div>
        </div>

        {/* Kategori Grid */}
        <div className="flex justify-between flex-wrap gap-4">
          {topCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/shop/${category.gender === 'e' ? 'erkek' : 'kadin'}/${category.title.toLowerCase()}`}
              onClick={() => {
                dispatch(setSelectedGender(category.gender));
                dispatch(setSelectedCategory(category));
              }}
              className="relative basis-[18%] max-lg:basis-[30%] max-md:basis-[45%] max-sm:basis-[85%] aspect-[1/1.1] max-md:aspect-[1.1/1]"
            >
              <img 
                src={category.img || 'default-category-image.jpg'} 
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-black/20 transition-colors">
                <h3 className="font-bold text-base">{category.title}</h3>
                <p className="font-normal text-sm">Rating: {category.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopContainer;