import "./Events.css";
import { useState } from "react";

import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";

const EventsPage = () => {
  const [creating, setCreating] = useState(false);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
  };
  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title="Add Event "
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
        ></Modal>
      )}
      <div className="events-control">
        <p> Share your own events</p>
        <button onClick={startCreateEventHandler}> Create Event</button>
      </div>
    </>
  );
};

export default EventsPage;
