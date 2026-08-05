import { Link } from "react-router";

const Nav = () => {
  return (
    <div className="fixed z-99999 top-0 left-0 bg-black h-[9.5vh] w-screen  text-white py-[2vh] px-[10%] flex justify-between items-center">
      <div className="Logo flex items-center gap-3 h-full w-1/6  ">
        <img className="object-contain h-[80%] w-[3.8vw]" src="/GDG_Logo.svg" />
        <h1 className="text-2xl font-bold">GDG Ranchi</h1>
      </div>

      <div className="Link ">
        <ol className="text-white flex gap-[1.8vw] md:text-[1vw]">
          {/* {["Home", "Events", "Team", "Contact"].map((link: string) => {
            return (
              <>
              </>
            );
          })} */}
          <Link to="/">Home</Link>
          <Link to="/events/Gallery">Gallery</Link>
        </ol>
      </div>

      <div className="text-xl font-bold">
        <button className="bg-white text-black px-6 py-2 rounded-2xl">Join</button>
      </div>
    </div>
  );
};

export default Nav;
