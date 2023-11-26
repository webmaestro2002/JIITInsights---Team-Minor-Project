import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Chat from "../Component/Chat";
import Carousel from '../Carousel';

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
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {hosted.length > 0 && hosted.map(host => (
          <Link to={'/host/' + host._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {host.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + host.photos?.[0]} alt='' />
              )}
            </div>
            <h2 className="font-bold truncate">{host.title}</h2>
            <h3 className="text-sm">{host.venue}</h3>
            <div className="mt-1">
              <span className="font-bold">{host.date}</span>
            </div>
          </Link>
        ))} */}
        <div>
          <Chat />
        </div>
      </div>
    </div>
  )
}

