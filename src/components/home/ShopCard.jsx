import React from "react";
import left from "../../assets/ShopCard_L.png";
import topRight from "../../assets/ShopCard_R_T.png";
import bottomRight from "../../assets/ShopCard_R_B.png";

const ShopCard = () => {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="w-[82%] aspect-[1185/572] flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 relative flex-shrink-0">
          <img
            src={left}
            alt="Shop Card Left"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-6 bg-blue-500 bg-opacity-80 text-white">
            <h3 className="text-2xl font-bold mb-2">Top Product Of the Week</h3>
            <button className="border border-white px-4 py-2 hover:bg-white hover:text-blue-500 transition duration-300">
              EXPLORE ITEMS
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="relative h-[calc(50%-8px)]">
            <img
              src={topRight}
              alt="Shop Card Top Right"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 bg-blue-500 bg-opacity-80 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Top Product Of the Week
              </h3>
              <button className="border border-white px-4 py-2 hover:bg-white hover:text-blue-500 transition duration-300">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
          <div className="relative h-[calc(50%-8px)]">
            <img
              src={bottomRight}
              alt="Shop Card Bottom Right"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-6 bg-blue-500 bg-opacity-80 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Top Product Of the Week
              </h3>
              <button className="border border-white px-4 py-2 hover:bg-white hover:text-blue-500 transition duration-300">
                EXPLORE ITEMS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCard;
