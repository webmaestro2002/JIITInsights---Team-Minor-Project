import { useEffect, useState } from "react"
import axios from "axios";
import Chat from "../Component/Chat";
import Carousel from '../Carousel';
import Footer from '../Footer';
// import Header from '../Header';

export default function IndexPage() {
  const [hosted, setHosted] = useState([]);
  useEffect(() => {
    axios.get('/user-hosted').then(response => {
      // console.log(response.data);
      setHosted(response.data);
    });
  }, []);
  return (
    <div>
      <div>
        <Carousel />
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

