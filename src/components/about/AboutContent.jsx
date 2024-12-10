const AboutContent = () => {
    return (
      <section className="w-[85%] mx-auto">
        {/* Content Section */}
        <div className="py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/3">
              <span className="text-red-500 font-medium text-sm block mb-4">
                Problems trying
              </span>
              <h2 className="text-[#252B42] font-bold text-2xl leading-tight">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </h2>
            </div>
            
            <div className="w-full md:w-1/2">
              <p className="text-gray-600 text-lg">
                Problems trying to resolve the conflict between the two major realms of 
                Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>
        </div>
  
        {/* Stats Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat Item 1 */}
            <div className="text-center">
              <h3 className="text-[#252B42] font-bold text-6xl mb-2">15K</h3>
              <p className="text-gray-600 font-bold">Happy Customers</p>
            </div>
  
            {/* Stat Item 2 */}
            <div className="text-center">
              <h3 className="text-[#252B42] font-bold text-6xl mb-2">150K</h3>
              <p className="text-gray-600 font-bold">Monthly Visitors</p>
            </div>
  
            {/* Stat Item 3 */}
            <div className="text-center">
              <h3 className="text-[#252B42] font-bold text-6xl mb-2">15</h3>
              <p className="text-gray-600 font-bold">Countries Worldwide</p>
            </div>
  
            {/* Stat Item 4 */}
            <div className="text-center">
              <h3 className="text-[#252B42] font-bold text-6xl mb-2">100+</h3>
              <p className="text-gray-600 font-bold">Top Partners</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutContent;