import contactHeader from "../../assets/ContactHeader.png";

const ContactHeader = () => {
    return (
      <section className="flex flex-wrap justify-center items-center py-10">
        <div className="flex flex-col items-center md:items-start md:w-1/2 px-6 h-[742px] justify-center">
          <h5 className="font-bold text-gray-800 text-base mb-8">CONTACT US</h5>
          <h1 className="font-bold text-[58px] leading-tight text-gray-900 mb-10">
            Get in touch<br />today!
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center md:text-left max-w-[500px]">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="mb-12 space-y-4">
            <p className="font-bold text-2xl text-gray-800">Phone: +451 215 215</p>
            <p className="font-bold text-2xl text-gray-800">Fax: +451 215 215</p>
          </div>
          <div className="flex space-x-6">
            <i className="fa-brands fa-twitter w-[30px] h-[30px] flex items-center justify-center hover:text-blue-500 cursor-pointer"></i>
            <i className="fa-brands fa-facebook w-[30px] h-[30px] flex items-center justify-center hover:text-blue-500 cursor-pointer"></i>
            <i className="fa-brands fa-instagram w-[30px] h-[30px] flex items-center justify-center hover:text-blue-500 cursor-pointer"></i>
            <i className="fa-brands fa-linkedin w-[30px] h-[30px] flex items-center justify-center hover:text-blue-500 cursor-pointer"></i>
          </div>
        </div>
        <article className="relative basis-[40%] ">
            <img className="w-full h-full" src={contactHeader} alt="" />
            <div className="bg-[#977DF4] w-[3%] aspect-square rounded-full absolute left-[-3%] bottom-[40%]"></div>
            <div className="bg-[#977DF4] w-[3%] aspect-square rounded-full absolute right-0 top-[22%]"></div>
            <div className="bg-[#FFE9EA] w-[6%] aspect-square rounded-full absolute right-[2%] top-[38%]"></div>
            <div className="bg-[#FFE9EA] w-[14%] aspect-square rounded-full absolute left-[-6%] top-[8%]"></div>
            <div className="bg-[#FFE9EA] w-[85%] aspect-square  rounded-full absolute left-[5%] top-[7%] z-[-1]"></div>
            
          </article>
      </section>
    );
  };
  
  export default ContactHeader;