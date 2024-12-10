import { Clients } from "../home/Clients";

const AboutClients = () => {
  return (
    <section className=" mx-auto py-16">
      {/* Header Content */}
      <div className="text-center mb-16">
        <h2 className="text-[#252B42] text-4xl md:text-5xl font-bold mb-8">
          Big Companies Are Here
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mx-auto px-4">
          Problems trying to resolve the conflict between 
          the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Reuse existing Clients component */}
      <div className="bg-gray-50 rounded-lg py-12">
        <Clients />
      </div>
    </section>
  );
};

export default AboutClients;