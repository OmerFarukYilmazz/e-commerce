const Features = () => {
  return (
    <section className="w-[90%] m-auto py-16">
      {/* Başlık Kısmı */}
      <div className="text-center mb-24">
        <span className="text-gray-500 font-medium mb-4 block">
          Featured Products
        </span>
        <h2 className="text-2xl font-bold mb-4">
          THE BEST SERVICES
        </h2>
        <p className="text-gray-600 text-sm max-w-lg mx-auto">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Özellikler Grid'i */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-48 px-12">
        {/* Easy Wins */}
        <div className="text-center">
          <div className="text-blue-500 text-6xl mb-4 flex justify-center">
            <i className="fa-solid fa-book-open-reader"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#252B42] mb-4">
            Easy Wins
          </h3>
          <p className="text-gray-600">
            Get your best looking smile now!
          </p>
        </div>

        {/* Concrete */}
        <div className="text-center">
          <div className="text-blue-500 text-6xl mb-4 flex justify-center">
            <i className="fa-solid fa-book-open"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#252B42] mb-4">
            Concrete
          </h3>
          <p className="text-gray-600">
            Defalcate is most focused in helping you discover your most beautiful smile
          </p>
        </div>

        {/* Hack Growth */}
        <div className="text-center">
          <div className="text-blue-500 text-6xl mb-4 flex justify-center">
            <i className="fa-solid fa-arrow-trend-up"></i>
          </div>
          <h3 className="text-2xl font-bold text-[#252B42] mb-4">
            Hack Growth
          </h3>
          <p className="text-gray-600">
            Overcame any hurdle or any other problem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;