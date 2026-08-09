
import TeamCard from "../Components/TeamCard";
import teamMembers from "../Constant/Team.Constant";

export const AllTeam = () => {
  let Organiser = teamMembers.filter(
    (value) => value.role === "Organizer" || value.role === "Co-Organizer",
  );

  let find_Tech_Team = teamMembers.filter((value) => value.role == "Tech-Team");

  let Find_Design_Team = teamMembers.filter((value) => value.role == "Design-Team");

  let Find_Social_Media_Team = teamMembers.filter((value) => value.role == "Social-Media-Team");

  return (
    <div>
      <div className="flex flex-col relative z-10  gap-[2vw] px-6 pt-16  lg:px-[8%] xl:px-[10%]">
        <h1 className="w-full text-center text-[3vh] font-extrabold">
          Our <span className="text-blue-500">Organizers</span>
        </h1>

        <section className="relative z-10 grid grid-cols-1 gap-[5vw] px-6 pb-[3vh] sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
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

      {/* Design Team */}

      <div className="flex flex-col relative z-10  gap-[2vw] px-6 py-16  lg:px-[8%] xl:px-[10%]">
        <h1 className="w-full text-center text-[3vh] font-extrabold">
          Design <span className="text-blue-500">Team</span>
        </h1>

        <section className="relative z-10 grid grid-cols-1 gap-[5vw] px-6 pb-[3vh] sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
          {Find_Design_Team.map((data) => (
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

      {/* Tech Team */}
      <div className="flex flex-col relative z-10  gap-[2vw] px-6 py-16  lg:px-[8%] xl:px-[10%]">
        <h1 className="w-full text-center text-[3vh] font-extrabold">
          Tech <span className="text-blue-500">Team</span>
        </h1>

        <section className="relative z-10 grid grid-cols-1 gap-[5vw] px-6 pb-[3vh] sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
          {find_Tech_Team.map((data) => (
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

      {/* Social Media Team */}

      <div className="flex flex-col relative z-10  gap-[2vw] px-6 py-16  lg:px-[8%] xl:px-[10%]">
        <h1 className="w-full text-center text-[3vh] font-extrabold">
          Social Media <span className="text-blue-500">Team</span>
        </h1>

        <section className="relative z-10 grid grid-cols-1 gap-[5vw] px-6 pb-[3vh] sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
          {Find_Social_Media_Team.map((data) => (
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
    </div>
  );
};
