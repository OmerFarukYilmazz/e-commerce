import { useEffect } from 'react';
import CategoryCard from './CategoryCard';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/actions/productAction';
   

const Categories = ({handleShowCategories}) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.product.categories);
    const fetchState = useSelector(state => state.product.categoriesFetchState);
    //console.log(categories);
        

    // cursor first answer
    /*
    // category'leri cinsite göre gruplama
    const groupedCategories = categories.reduce((acc, category) => {
        const gender = category.gender;
        if (!acc[gender]) {
            acc[gender] = [];
        }
        acc[gender].push(category);
        return acc;
    }, {});
    */

    // Kategorileri cinsiyete göre ayır
    const getGroupedCategories = () => {
        const erkekKategoriler = categories.filter(cat => cat.gender === 'e');
        const kadinKategoriler = categories.filter(cat => cat.gender === 'k');
        
        // Rating'e göre sırala
        erkekKategoriler.sort((a, b) => b.rating - a.rating);
        kadinKategoriler.sort((a, b) => b.rating - a.rating);

        return {
            erkek: erkekKategoriler,
            kadin: kadinKategoriler
        };
    };
    const groupedCategories = getGroupedCategories();


    useEffect(() => {
        if(fetchState === 'NOT_FETCHED') {
            dispatch(fetchCategories());
        }        
        console.log(fetchState + " fetchState");
        
    }, [dispatch, fetchState]);
    
    if (fetchState === 'FETCHING') {
        return <div>Loading...</div>;
    }

    return (
        // cursor first answer
        /*
        <div className="bg-white shadow-lg rounded-lg p-4 min-w-[400px] flex">
            {Object.entries(groupedCategories).map(([gender, cats]) => (
                <div key={gender} className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-700">
                        {gender === 'e' ? 'Erkek' : 'Kadın'}
                    </h3>
                    <div className="flex flex-col">
                        {cats.map((category) => (
                            <Link 
                                key={category.id}
                                to={`/shop/${getGenderText(category.gender)}/${category.title.toLowerCase()}`}
                                className="block py-2 px-4 hover:bg-gray-100 rounded transition-colors"
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        */
        <div className="bg-white shadow-lg rounded-lg p-4 min-w-[400px] flex">
            <CategoryCard 
                title="Erkek"
                gender="e"
                categories={groupedCategories.erkek}                
                handleShowCategories={handleShowCategories}
            />
            <CategoryCard 
                title="Kadın"
                gender="k"
                categories={groupedCategories.kadin}                
                handleShowCategories={handleShowCategories}
            />
        </div>
    );
};

export default Categories;
