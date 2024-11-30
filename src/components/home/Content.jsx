import contentLeft from "../../assets/content-left.jpg";
import contentRight from "../../assets/content-right.jpg";

const Content = () => {
  return (
    <section className="w-[90%] m-auto py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* İçerik Kısmı - Mobilde üstte */}
        <div className="w-full md:w-1/2 order-1 md:order-2 text-center md:text-left px-4">
          <span className="text-blue-500 font-bold mb-4 block">
            Featured Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6">
            We love<br />what we do
          </h2>
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: 
              Newtonian mechanics.
            </p>
            <p className="leading-relaxed">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: 
              Newtonian mechanics
            </p>
          </div>
        </div>

        {/* Resimler Kısmı - Mobilde altta */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="flex flex-row gap-4">
            {/* Sol resim - 3 birim */}
            <div className="w-[43%]"> {/* 3/7 ≈ 43% */}
              <img 
                src={contentLeft} 
                alt="Content 1" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Sağ resim - 4 birim */}
            <div className="w-[57%]"> {/* 4/7 ≈ 57% */}
              <img 
                src={contentRight} 
                alt="Content 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;