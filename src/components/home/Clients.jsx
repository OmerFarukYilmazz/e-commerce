export const Clients = () => {
  return (
    <section className="flex justify-center bg-gray-50">
      {/* Container */}
      <div className="w-[90%] py-4">
        {/* İkon grid'i */}
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-12 md:gap-20">
          {/* Her bir ikon için responsive boyutlandırma */}
          <i className="fa-brands fa-hooli text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
          <i className="fa-brands fa-lyft text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
          <i className="fa-brands fa-pied-piper-hat text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
          <i className="fa-brands fa-stripe text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
          <i className="fa-brands fa-aws text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
          <i className="fa-brands fa-reddit-alien text-9xl md:text-6xl text-gray-500 hover:text-gray-700 transition-colors"></i>
        </div>
      </div>
    </section>
  );
};

export default Clients;