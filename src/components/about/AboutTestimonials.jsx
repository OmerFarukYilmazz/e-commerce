import aboutTestimonialImage from "../../assets/aboutTest.jpg";

const AboutTestimonials = () => {
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row">
        {/* Sol Taraf - İçerik */}
        <div className="w-full sm:w-[60%] bg-[#2A7CC7] text-white">
          <div className="h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 sm:py-0 space-y-6">
            <span className="text-sm font-bold tracking-wider">
              WORK WITH US
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Now Let's grow Yours
            </h2>
            
            <p className="text-base opacity-80 max-w-md">
              The gradual accumulation of information about atomic and 
              small-scale behavior during the first quarter of the 20th
            </p>
            
            <div>
              <button className="border border-white px-8 py-3 rounded-md 
                hover:bg-white hover:text-[#2A7CC7] transition-all duration-300
                text-sm font-bold">
                Button
              </button>
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Görsel */}
        <div className="hidden sm:block w-full sm:w-[40%] h-auto">
          <img 
            src={aboutTestimonialImage} 
            alt="Testimonial" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutTestimonials;