
import TeamCard from "../../Member/v1/Components/TeamCard";
import teamMembers from "../../Member/v1/Constant/Team.Constant";

const Judges = () => {
  let Organiser = teamMembers.filter(
    (value) => value.role === "Organizer" || value.role === "Co-Organizer",
  );

  return (
    <div className="relative z-10  py-20 px-6 lg:px-[8%] xl:px-[10%]">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="w-full text-center text-[4vh] font-extrabold">
          Our <span className="text-blue-500">Judges</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Industry experts and innovators evaluating the next generation of AgriTech and FinTech
          solutions.
        </p>
      </div>

      {/* Grid Section */}
      <section className="relative z-10 grid grid-cols-1 gap-10 px-6 pb-12 lg:grid-cols-3 lg:px-0">
        {Organiser.map((data) => (
          <TeamCard
            key={data.id}
            FullName={data.name}
            Role={data.role}
            imageUrl={data.image}
            SocialLink={data.socialLinks}
          />
        ))}
      </section>
    </div>
  );
};

export default Judges;
