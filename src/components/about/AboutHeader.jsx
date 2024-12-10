import aboutHeaderImage from "../../assets/aboutHeaderImg.png";

const AboutHeader = () => {
  return (
    <section className="w-[90%] mx-auto">
      <div className="container mx-auto px-0 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-left md:text-left">
            <span className="text-sm font-bold text-gray-800 tracking-wider mb-4 block">
              ABOUT COMPANY
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 my-6">
              ABOUT US
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              We know how large objects will act, 
              but things on a small scale just do not act that way.
            </p>
            
            <button className="bg-blue-500 text-white px-8 py-4 rounded-md 
              font-semibold hover:bg-blue-600 transition-all duration-300
              transform hover:scale-105 active:scale-95">
              Get Quote Now
            </button>
          </div>

          {/* Right Content - Image with Decorative Elements */}
          <div className="w-full md:w-1/2 relative">
            {/* Main Image */}
            <img 
              src={aboutHeaderImage} 
              alt="About Us Header" 
              className="w-full h-auto relative z-10"
            />

            {/* Decorative Elements */}
            <div className="absolute inset-0">
              {/* Large Background Circle */}
              <div className="absolute w-[85%] aspect-square bg-[#FFE9EA] 
                rounded-full left-[5%] top-[7%] z-0" />
              
              {/* Small Decorative Circles */}
              <div className="absolute w-[14%] aspect-square bg-[#FFE9EA] 
                rounded-full left-[-6%] top-[8%] z-20" />
              
              <div className="absolute w-[6%] aspect-square bg-[#FFE9EA] 
                rounded-full right-[2%] top-[38%] z-20" />
              
              <div className="absolute w-[3%] aspect-square bg-[#977DF4] 
                rounded-full right-0 top-[22%] z-20" />
              
              <div className="absolute w-[3%] aspect-square bg-[#977DF4] 
                rounded-full left-[-1%] bottom-[40%] z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeader;