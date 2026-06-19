import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import RoomsSection from "../components/RoomsSection";
import AboutSection from "../components/AboutSection";
import Amenities from "../components/Amenities";

function Home() {
  return (
    <>
    <Hero />
    <SearchBar />
    <AboutSection />
    <RoomsSection />
    <Amenities />
</>
  );
}

export default Home;