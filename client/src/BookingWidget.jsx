import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx"
import DateTimePicker from "react-datetime-picker";

export default function BookingWidget({ host }) {
  const [name, setName] = useState('');
  const [whatsappNo, setwhatsappNo] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState(new Date()); // Initialize with a default date
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/getAllReminder").then((res) => setReminderList(res.data));
  }, []);

  const addReminder = () => {
    axios
      .post("http://localhost:4000/addReminder", { reminderMsg, remindAt })
      .then((res) => setReminderList(res.data));
    setReminderMsg("");
    setRemindAt(new Date()); // Reset the date
  };

  const deleteReminder = (id) => {
    axios.post("http://localhost:4000/deleteReminder", { id }).then((res) => setReminderList(res.data));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  //MY OWN CODE
  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //   }
  // }, [user]);

  async function participateinevent() {
    console.log('host:', host);
    console.log('host._id:', host._id);
    console.log('name:', name);
    console.log('whatsappNo:', whatsappNo);
    if (host && host._id) {
      const response = await axios.post('/participated', {
        host: host._id,
        name,
        whatsappNo,
      });
      const participatedId = response.data._id;
      setRedirect(`/account/participated/${participatedId}`);
    } else {
      // Handle the case when host or host._id is undefined
      console.error("Host or host._id is undefined.");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  // Inline CSS for the DateTimePicker component
  const dateTimePickerStyles = {
    width: "100%", // Set the width as needed
    padding: "10px", // Adjust the padding
    border: "1px solid #ccc", // Add a border
    borderRadius: "5px", // Round the corners
  };



  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">Vamunique</div>
        <div className="border rounded-2xl mt-4">
          <div className="py-3 px-4">
            <label>Your name</label>
            <input
              type="text"
              value={name}
              placeholder="John Doe"
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label>Your WhatsApp no.</label>
            <input
              type="number"
              value={whatsappNo}
              placeholder="99999....."
              onChange={(ev) => setwhatsappNo(ev.target.value)}
            />
          </div>
        </div>
        <button onClick={participateinevent} className="primary mt-4">
          Participate
        </button>
      </div>

      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">Remind Me</div>
        <div className="border rounded-2xl mt-4">
          <div className="py-3 px-4">
            <label>Reminder event</label>
            <input
              type="text"
              value={reminderMsg}
              placeholder="Reminder notes here"
              onChange={(e) => setReminderMsg(e.target.value)}
            />

            <DateTimePicker
              disabled={false}
              readOnly={false}
              value={remindAt}
              onChange={setRemindAt}
              minDate={new Date()}
              style={dateTimePickerStyles} // Apply the inline styles here
            // minutePlaceholder="mm"
            // hourPlaceholder="hh"
            // dayPlaceholder="DD"
            // monthPlaceholder="MM"
            // yearPlaceholder="YYYY"
            />
          </div>
        </div>
        <button onClick={addReminder} className="primary mt-4">
          Add Reminder
        </button>
      </div>
    </>
  );
}
