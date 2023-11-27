import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "../Component/Chat";
import Carousel from "../Carousel";
import Footer from "../Footer";
import ParticlesBackground from "../Component/ParticlesBackground";


export default function IndexPage() {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    axios.get('/user-hosted').then(response => {
      // console.log(response.data);
      setHosted(response.data);
    });
  }, []);
  return (
    <div className="p-0 m-0">
      <div>
      {/* <ParticlesBackground  /> */}
        <img src="images/landingimage.png" alt="" />
        </div>
      <div>
        <Carousel />
      </div>
      <div>
        <section id="features" className="p-0 bg-gradient-to-b from-black to-black">
          <div className="flex flex-wrap justify-center">
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
              <h3 className="font-bold text-xl mt-2 text-white">Society Swag Central</h3>
              <p className="text-gray-500">Get Your Exclusive Society Merchandise Here! Customized gear, trendy designs, and member discounts.</p>
            </div>
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
              <i className="fa-solid fa-bullseye fa-beat-fade text-2xl text-pink-800 icon"></i>
              <h3 className="font-bold text-xl mt-2 text-white">Never Miss an Epic Moment</h3>
              <p className="text-gray-500">Event Reminders Just When You Need Them! Personalized notifications, countdowns, and RSVP options.</p>
            </div>
            <div className="feature-box w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-5 text-center">
              <i className="fa-solid fa-brain fa-beat-fade text-2xl text-pink-800 icon"></i>
              <h3 className="font-bold text-xl mt-2 text-white">All-Inclusive Campus Hub</h3>
              <p className="text-gray-500">Your One-Stop Access to Everything! From society news to mess schedules to past achievements, it's all here.</p>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <Chat />
      </div>
    </div>
  )
}

