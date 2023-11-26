import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function SelectedSociety() {
    const { selectedSociety } = useParams(); // Assuming 'selectedSociety' is the parameter in your route
    const [hosted, setHosted] = useState([]);

    useEffect(() => {
        axios.get('/user-hosted').then(response => {
            setHosted(response.data);
        });
    }, []);

    return (
        <div>
            <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {hosted.length > 0 && hosted.map(host => (
                    // Check if host.title matches selectedSociety before rendering the event
                    host.title === selectedSociety && (
                        <Link to={'/host/' + host._id} key={host._id}>
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
                    )
                ))}
            </div>
        </div>
    );
}
