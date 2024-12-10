import { Link } from "react-router-dom";
import shopContainer1 from "../../assets/shopContainer-1.jpg";
import shopContainer2 from "../../assets/shopContainer-2.jpg";
import shopContainer3 from "../../assets/shopContainer-3.jpg";
import shopContainer4 from "../../assets/shopContainer-4.jpg";
import shopContainer5 from "../../assets/shopContainer-5.jpg";

const ShopContainer = () => {
  const categories = [
    { id: 1, name: "CLOTHS", items: 5, image: shopContainer1 },
    { id: 2, name: "CLOTHS", items: 5, image: shopContainer2 },
    { id: 3, name: "CLOTHS", items: 5, image: shopContainer3 },
    { id: 4, name: "CLOTHS", items: 5, image: shopContainer4 },
    { id: 5, name: "CLOTHS", items: 5, image: shopContainer5 },
  ];

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
            <Link
              className="font-bold text-sm text-muted hover:underline"
              to="/shop"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Kategori Grid */}
        <div className="flex justify-between flex-wrap gap-4">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="relative basis-[18%] max-lg:basis-[30%] max-md:basis-[45%] max-sm:basis-[85%] aspect-[1/1.1] max-md:aspect-[1.1/1]"
            >
              <img 
                src={category.image} 
                alt={`Category ${category.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-black/20 transition-colors">
                <h3 className="font-bold text-base">{category.name}</h3>
                <p className="font-normal text-sm">{category.items} Items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopContainer;