import Stack from "../../../../Components/Stack";

const images = [
  "https://imgs.search.brave.com/f_VgApHtl8ATL4uQSFNf00OV_SNjPSe9wU7qYeTz7bk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYWNr/dG9za2lsbC5jb20v/aG9tZS1jZG4vM3Au/d2VicA",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

const HeroSec = () => {
  return (
    <div className="w-full h-[95vh] flex items-center px-[10%] ">
      <div className="Part1 flex flex-col  mb-11 justify-center w-1/2  text-white text-[6vw] font-extrabold">
        <h2>Learn.</h2>
        <h2>Build.</h2>
        <h2>Connect.</h2>
      </div>

      <div className="Part2 h-[60%] w-1/2 flex items-center justify-end ">
        <Stack
          randomRotation={false}
          sensitivity={200}
          sendToBackOnClick={true}
          autoplay
          autoplayDelay={3000}
          pauseOnHover
          cards={images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`card-${i + 1}`}
              className="h-full w-[95%] rounded-xl object-cover"
            />
          ))}
        />
      </div>
    </div>
  );
};

export default HeroSec;
