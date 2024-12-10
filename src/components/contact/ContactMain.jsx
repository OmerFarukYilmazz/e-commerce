import arrowIcon from "../../assets/arrow.png";

const ContactCard = ({ icon, emails, isDark }) => {
  return (
    <div className={`p-8 md:p-12 rounded-lg shadow-lg transition-transform hover:scale-105 ${
      isDark ? 'bg-[#252B42] text-white' : 'bg-white text-gray-800'
    } max-w-xs mx-auto`}>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <i className={`${icon} text-5xl text-blue-500`}></i>
        </div>
        <div className="text-center space-y-2 mb-6">
          {emails.map((email, index) => (
            <p key={index} className="text-sm font-semibold">{email}</p>
          ))}
        </div>
        <h4 className="text-lg font-bold mb-6">Get Support</h4>
        <button className={`px-8 py-3 rounded-full border transition-colors ${
          isDark 
            ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' 
            : 'border-blue-500 text-blue-500 hover:bg-blue-50'
        }`}>
          Submit Request
        </button>
      </div>
    </div>
  );
};

const ContactMain = () => {
  const contactCards = [
    {
      icon: "fa-solid fa-phone",
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      isDark: false
    },
    {
      icon: "fa-solid fa-location-dot",
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      isDark: true
    },
    {
      icon: "fa-solid fa-envelope",
      emails: ["georgia.young@example.com", "georgia.young@ple.com"],
      isDark: false
    }
  ];

  return (
    <main className="max-w-[1050px] mx-auto px-4 py-16">
      {/* Başlık Bölümü */}
      <div className="text-center mb-16">
        <span className="text-sm font-bold text-gray-800 tracking-wider">
          VISIT OUR OFFICE
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 max-w-xl mx-auto">
          We help small businesses with big ideas
        </h2>
      </div>

      {/* Kartlar Bölümü */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-24">
        {contactCards.map((card, index) => (
          <div key={index} className="flex justify-center">
            <div className={`w-full max-w-[329px] min-h-[403px] p-8 md:p-10 rounded-lg shadow-lg transition-transform hover:scale-105 ${
              card.isDark ? 'bg-[#252B42] text-white' : 'bg-white text-gray-800'
            }`}>
              <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center">
                  <div className="mb-6">
                    <i className={`${card.icon} text-5xl text-blue-500`}></i>
                  </div>
                  <div className="text-center space-y-2 mb-6">
                    {card.emails.map((email, idx) => (
                      <p key={idx} className="text-sm font-semibold">{email}</p>
                    ))}
                  </div>
                  <h4 className="text-lg font-bold mb-6">Get Support</h4>
                </div>
                <button className={`px-8 py-3 rounded-full border transition-colors ${
                  card.isDark 
                    ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white' 
                    : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                }`}>
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alt Bölüm */}
      <div className="text-center bg-white py-16 rounded-lg shadow-lg">
        <img src={arrowIcon} alt="Arrow" className="mx-auto mb-8 w-12" />
        <p className="font-bold text-gray-800 mb-4">
          WE CAN'T WAIT TO MEET YOU
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Let's Talk
        </h2>
        <button className="bg-blue-500 text-white px-8 py-4 rounded-md font-semibold hover:bg-blue-600 transition-colors">
          Try it free now
        </button>
      </div>
    </main>
  );
};

export default ContactMain;