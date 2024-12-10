const TeamContent = () => {
    return (
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Start your 14 days free trial
          </h2>
          
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Met minim Mollie non desert Alamo est sit cliquey dolor 
            do met sent. RELIT official consequent.
          </p>
  
          <button className="bg-blue-500 text-white px-10 py-4 rounded-lg 
            font-semibold text-lg mb-12 transform transition-all duration-300 
            hover:bg-blue-600 hover:scale-105 active:scale-95">
            Try it free now
          </button>
  
          <div className="flex justify-center items-center gap-8">
            <a href="#" className="social-link">
              <i className="fab fa-twitter text-2xl text-gray-600 
                hover:text-blue-400 transition-colors"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-facebook text-2xl text-gray-600 
                hover:text-blue-600 transition-colors"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram text-2xl text-gray-600 
                hover:text-pink-500 transition-colors"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin text-2xl text-gray-600 
                hover:text-blue-700 transition-colors"></i>
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default TeamContent;