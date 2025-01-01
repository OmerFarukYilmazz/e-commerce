import { useDispatch } from 'react-redux';
import { setSelectedGender, setSelectedCategory, fetchFilteredProducts } from '../../store/actions/productAction';
import { useHistory } from 'react-router-dom';

const CategoryCard = ({ title, gender, categories, handleShowCategories }) => {
  const dispatch = useDispatch();
  const history = useHistory();

   // gender text'i çevirmek için
   const getGenderText = (gender) => {
    return gender === 'e' ? 'erkek' : 'kadin';
}

  const handleCategoryClick = (category) => {
    // Redux state'i güncelle
    dispatch(setSelectedGender(gender));
    dispatch(setSelectedCategory(category));
    
    // Ürünleri getir
    dispatch(fetchFilteredProducts());
    
    // Shop sayfasına yönlendir ve URL'i güncelle
    history.push(`/shop/${getGenderText(gender)}/${category.title.toLowerCase()}`);
    
    // Categories menüsünü kapat
    handleShowCategories();
  };

  return (
    <div className="flex-1 pl-4">
      <h3 className="font-bold text-lg mb-2 text-gray-700">{title}</h3>
      <div className="flex flex-col">
        {categories.map((category) => (
          <button 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="text-left py-2 px-4 hover:bg-gray-100 rounded transition-colors"
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;