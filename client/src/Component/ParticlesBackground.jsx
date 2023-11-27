import Particles from "react-tsparticles"
import particlesConfig from "./config/particles-config"
import { useEffect } from "react";

const ParticlesBackground = () => {
    useEffect(() => {
      console.log("ParticlesBackground component rendered");
    }, []);
  
    return (
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
        <Particles options={particlesConfig} />
      </div>
    );
  };
  
  export default ParticlesBackground;