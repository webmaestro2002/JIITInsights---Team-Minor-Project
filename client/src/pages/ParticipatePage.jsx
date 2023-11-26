
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import HostGallery from "../HostGallery";
// import VenueLink from "../VenueLink";
// import ParticipatedDateTime from "../ParticipatedDateTime";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../ParticipatePage.css";

// export default function ParticipatePage() {
//   const { id } = useParams();
//   const [participate, setParticipate] = useState(null);
//   const [reminderMsg, setReminderMsg] = useState("");
//   const [remindAt, setRemindAt] = useState(null);
//   const [reminderList, setReminderList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         if (id) {
//           const response = await axios.get(`/participated/${id}`);
//           console.log("Participation Data:", response.data);
//           setParticipate(response.data);
//           setReminderList(response.data.reminderList || []);
//         }
//       } catch (error) {
//         setError("Error fetching participation data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const addReminder = () => {
//     axios.post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
//         .then(res => {
//             setReminderList(res.data);
//             setReminderMsg("");
//             setRemindAt(null);
//         })
//         .catch(error => {
//             setError("Error adding reminder: " + error.message);
//         });
// };
// const deleteReminder = (reminderId, event) => {
//   if (event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//   }

//   try {
//     // Delete the reminder locally
//     const updatedReminderList = reminderList.filter((reminder) => reminder._id !== reminderId);
//     setReminderList(updatedReminderList);
    
//     // Make API call to update the server data
//     axios.delete(`/deleteReminder/${reminderId}`);
//   } catch (error) {
//     console.error('Error deleting reminder:', error);
//     setError("Error deleting reminder: " + error.message);
//   }
// };


  
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p className="error-message">{error}</p>;
//   }

//   return (
//     <div className="my-8">
//       {participate ? (
//         <div>
//           <h1 className="text-3xl">{participate.host.title}</h1>
//           <VenueLink className="my-2 block">{participate.host.venue}</VenueLink>
//           <ParticipatedDateTime participate={participate} />
//           <p className="event-time">Event Time: {participate.eventTime}</p>
//           <div className="bg-gray-200 p-6 mb-6 my-6 rounded-2xl flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl mb-4">You've participated!</h2>
//             </div>
//             <div className="my-4 bg-primary text-white p-6 rounded-2xl">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//           <HostGallery host={participate.host} />
//         </div>
//       ) : null}

//       <div className="App">
//         <div className="homepage">
//           <div className="homepage_header">
//             <h1>Remind Me 🙋‍♂</h1>
//             <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} />
//             <div className="datetime-picker-container">
//               <DatePicker
//                 selected={remindAt}
//                 onChange={(date) => setRemindAt(date)}
//                 showTimeSelect
//                 timeFormat="HH:mm"
//                 timeIntervals={1}
//                 timeCaption="Time"
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 className="reminder-datepicker"
//               />
//             </div>
//             <div className="button" onClick={addReminder}>
//               Add Reminder
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="homepage_body">
//       <div className="reminder-list">
//   {(reminderList || []).map((reminder) => (
//     <div className="reminder-card" key={reminder._id}>
//       <h2 className="reminder-title">{reminder.reminderMsg}</h2>
//       <p className="reminder-time">{String(new Date(reminder.remindAt))}</p>
//       <button className="delete-button" onClick={() => deleteReminder(reminder._id)}>
//         Delete Reminder
//       </button>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HostGallery from "../HostGallery";
import VenueLink from "../VenueLink";
import ParticipatedDateTime from "../ParticipatedDateTime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../ParticipatePage.css";

export default function ParticipatePage() {
  const { id } = useParams();
  const [participate, setParticipate] = useState(null);
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(null);
  const [reminderList, setReminderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await axios.get(`/participated/${id}`);
          console.log("Participation Data:", response.data);
          setParticipate(response.data);
          setReminderList(response.data.reminderList || []);
        }
      } catch (error) {
        setError("Error fetching participation data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addReminder = () => {
    // Ensure remindAt is not in the past
    const now = new Date();
    if (remindAt && remindAt < now) {
      alert('Please select correct date and time .');
      return;
    }

    axios.post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
      .then(res => {
        setReminderList(res.data);
        setReminderMsg("");
        setRemindAt(null);
      })
      .catch(error => {
        setError("Error adding reminder: " + error.message);
      });
  };

  const deleteReminder = (reminderId, event) => {
    if (event) {
      event.preventDefault(); // Prevent the default form submission behavior
    }

    try {
      // Delete the reminder locally
      const updatedReminderList = reminderList.filter((reminder) => reminder._id !== reminderId);
      setReminderList(updatedReminderList);
      
      // Make API call to update the server data
      axios.delete(`/deleteReminder/${reminderId}`);
    } catch (error) {
      console.error('Error deleting reminder:', error);
      setError("Error deleting reminder: " + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="my-8">
      {participate ? (
        <div>
          <h1 className="text-3xl">{participate.host.title}</h1>
          <VenueLink className="my-2 block">{participate.host.venue}</VenueLink>
          <ParticipatedDateTime participate={participate} />
          <p className="event-time">Event Time: {participate.eventTime}</p>
          <div className="bg-gray-200 p-6 mb-6 my-6 rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-4">You've participated!</h2>
            </div>
            <div className="my-4 bg-primary text-white p-6 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <HostGallery host={participate.host} />
        </div>
      ) : null}

      <div className="App">
        <div className="homepage">
          <div className="homepage_header">
            <h1>Remind Me 🙋‍♂</h1>
            <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} />
            <div className="datetime-picker-container">
              <DatePicker
                selected={remindAt}
                onChange={(date) => setRemindAt(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="reminder-datepicker"
              />
            </div>
            <div className="button" onClick={addReminder}>
              Add Reminder
            </div>
          </div>
        </div>
      </div>

      <div className="homepage_body">
        <div className="reminder-list">
          {(reminderList || []).map((reminder) => (
            <div className="reminder-card" key={reminder._id}>
              <h2 className="reminder-title">{reminder.reminderMsg}</h2>
              <p className="reminder-time">{String(new Date(reminder.remindAt))}</p>
              <button className="delete-button" onClick={() => deleteReminder(reminder._id)}>
                Delete Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
