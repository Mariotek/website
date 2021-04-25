import OurTeam from "./components/OurTeam";
import Hero from "./components/Hero";
import LightBeam from "./components/Icons/LightBeam";
import Footer from "../../components/layout/footer";
import OrderBox from "./components/OrderBox";
import Game from "./components/Game";

const Home = () => (
  <>
    <Hero />
    <Game />

    <div className={"afterGameDescription"}>
      <LightBeam />
      <OrderBox />
      <OurTeam />
    </div>

    <Footer />
  </>
);

export default Home;
