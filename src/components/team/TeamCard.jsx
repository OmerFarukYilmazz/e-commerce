const TeamCard = ({ members, count = members.length }) => {
  const displayMembers = members.slice(0, count);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member) => (
            <div 
              key={member.id} 
              className="flex flex-col items-center group"
            >
              <div className="relative overflow-hidden w-full aspect-[1.3/1] mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="text-center">
                <h5 className="text-xl font-bold mb-2">{member.name}</h5>
                <p className="text-gray-600 mb-4">{member.profession}</p>
                
                <div className="flex justify-center gap-6">
                  <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamCard;