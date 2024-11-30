const HeroContent = ({ season, title, description, image }) => {
    return (
      <div className="-z-10 bg-gradient-to-r from-cyan-200 to-teal-200 rounded-3xl w-full h-full flex">
        {/* Masaüstü görünümü */}
        <div className="hidden md:flex flex-row items-center justify-between w-full">
          <div className="z-20 text-content md:w-1/2 p-4 md:px-16">
            <span className="season text-blue-600 font-semibold mb-6 block">
              {season}
            </span>
            <h1 className="title text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="description text-xl text-gray-600 mb-6 max-w-md">
              {description}
            </p>
            <button className="shop-now-btn bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
              SHOP NOW
            </button>
          </div>
          <div className="basis-[50%] min-w-[345px]">
            <div className="relative md:mr-[-10%]">
              <img className="w-100 z-10" src={image} alt="Hero" />
              <div className="bg-white w-[74%] aspect-square rounded-full absolute z-[-1] top-[-5%] right-[8%]"></div>
              <div className="bg-white w-[11%] aspect-square rounded-full absolute top-0 left-[7%]"></div>
              <div className="bg-white z-30 w-[4%] aspect-square rounded-full absolute top-[40%] right-[4%]"></div>
              <div className="bg-heroBonus w-[2%] aspect-square rounded-full absolute top-[20%] right-[2%]"></div>
            </div>
          </div>
        </div>
  
        {/* Mobil görünümü */}
        <div className="md:hidden flex flex-col w-full">
          <div className="text-content z-10 p-8 text-center">
            <span className="season text-blue-600 font-semibold mb-4 block">
              {season}
            </span>
            <h1 className="title text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="description text-gray-600 mb-6">
              {description}
            </p>
            <button className="shop-now-btn bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300">
              SHOP NOW
            </button>
          </div>
          <div className="relative h-80 overflow-hidden">
            <img
              src={image}
              alt="New Collection"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-full w-auto max-w-none"
            />
            <div className="bg-white w-[74%] aspect-square rounded-full absolute z-[-1] top-[-5%] right-[8%]"></div>
            <div className="bg-white w-[11%] aspect-square rounded-full absolute top-0 left-[7%]"></div>
            <div className="bg-white z-30 w-[4%] aspect-square rounded-full absolute top-[40%] right-[4%]"></div>
            <div className="bg-heroBonus w-[2%] aspect-square rounded-full absolute top-[20%] right-[2%]"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroContent;