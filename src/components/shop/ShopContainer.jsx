import { Link } from "react-router-dom";


const ShopContainer = () => {
  

  return (
    <section className="flex justify-center bg-gray-100 py-4">
      <div className="flex flex-col justify-center basis-[85%] gap-4 pb-6">
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
        
      </div>
    </section>
  );
};

export default ShopContainer;