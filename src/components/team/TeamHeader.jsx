import { Link } from "react-router-dom";
import img1 from "../../assets/teamHeaderImg-1.jpg";
import img2 from "../../assets/teamHeaderImg-2.jpg";
import img3 from "../../assets/teamHeaderImg-3.jpg";
import img4 from "../../assets/teamHeaderImg-4.jpg";
import img5 from "../../assets/teamHeaderImg-5.jpg";

const TeamHeader = () => {
  const images = [
    {
      id: 1,
      src: img1,
      alt: "Team Image 1",
      size: "large" // Sol taraftaki büyük resim
    },
    {
      id: 2,
      src: img2,
      alt: "Team Image 2",
      size: "small"
    },
    {
      id: 3,
      src: img3,
      alt: "Team Image 3",
      size: "small"
    },
    {
      id: 4,
      src: img4,
      alt: "Team Image 4",
      size: "small"
    },
    {
      id: 5,
      src: img5,
      alt: "Team Image 5",
      size: "small"
    }
  ];

  return (
    <section className="text-center pt-10">
      <h5 className="font-bold text-base text-gray-600">WHAT WE DO</h5>
      <h1 className="font-bold text-6xl md:text-6xl my-4 mx-4 md:mx-20">
        Innovation tailored for you
      </h1>
      
      <div className="flex items-center justify-center gap-2 mb-12 mt-4">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="text-gray-400">{">"}</span>
        <Link to="/team" className="text-gray-600 hover:underline">Team</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        {/* Sol taraf - Büyük resim */}
        <div className="md:w-1/2">
          {images.filter(img => img.size === "large").map(img => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Sağ taraf - Grid yapısı */}
        <div className="md:w-1/2 flex flex-col gap-2">
          <div className="flex gap-2 h-1/2">
            {images
              .filter(img => img.size === "small")
              .slice(0, 2)
              .map(img => (
                <div key={img.id} className="w-1/2">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
          <div className="flex gap-2 h-1/2">
            {images
              .filter(img => img.size === "small")
              .slice(2, 4)
              .map(img => (
                <div key={img.id} className="w-1/2">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamHeader;