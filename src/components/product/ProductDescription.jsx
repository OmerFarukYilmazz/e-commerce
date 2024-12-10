import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDescription = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [descriptionImage, setDescriptionImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescriptionImage = async () => {
      try {
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products?limit=1');
        setDescriptionImage(response.data.products[0].images[0]);
        setLoading(false);
      } catch (error) {
        console.error('Resim yüklenirken hata:', error);
        setLoading(false);
      }
    };

    fetchDescriptionImage();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-[10%]">
        {/* Tabs */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-8 mb-4">
            <button
              className={`text-sm font-medium ${
                activeTab === 'description' ? 'text-gray-900' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`text-sm font-medium ${
                activeTab === 'additional' ? 'text-gray-900' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
            <button
              className={`text-sm font-medium ${
                activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews <span className="text-primary">(0)</span>
            </button>
          </div>
          <div className="border-b border-gray-200"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sol - Resim */}
          <div className="lg:w-[30%]">
            {loading ? (
              <div className="aspect-[1/1.15] bg-gray-200 animate-pulse rounded-lg"></div>
            ) : (
              <div className="aspect-[1/1.15] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={descriptionImage?.url}
                  alt="Description"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* ... Diğer içerik aynı kalacak ... */}
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;