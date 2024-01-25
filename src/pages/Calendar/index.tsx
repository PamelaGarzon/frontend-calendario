import { Plus } from "@phosphor-icons/react";
import {
  FilterCalendarEvents,
  Navbar,
  TableCalendarEvents,
} from "../../components";
import { EventModal } from "../../components/EventModal";
import { useContext, useEffect, useState } from "react";
import { httpClient } from "../../lib/axios";
import { AuthUserContext } from "../../context";

interface Params {
  userId: string;
  startDateTime?: string;
}

export function Calendar() {
  const { userId, setUserId } = useContext(AuthUserContext);
  const [listEvents, setListEvents] = useState();

  const [dateFilter, setDateFilter] = useState("");

  const params = {
    userId: userId,
  } as Params;

  if (dateFilter) {
    params.startDateTime = dateFilter;
  }

  async function handleListEvents() {
    await httpClient
      .get("event/list", {
        params: params,
      })
      .then((res) => {
        setListEvents(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const currentUserId = localStorage.getItem("user-id") || "";
    setUserId(currentUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      handleListEvents();
    }
  }, [userId]);

  if (!listEvents) return "...Loading";

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Navbar />

      <div className="d-flex justify-content-end px-5 mt-4">
        <button
          className=" d-flex gap-2 btn btn-lg btn-outline-primary align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#createEventModal"
        >
          <Plus size={16} />
          Adicionar Evento
        </button>
      </div>

      <div className="d-flex w-100 flex-column">
        <div>
          <FilterCalendarEvents
            updateList={handleListEvents}
            setDateFilter={setDateFilter}
            dateFilter={dateFilter}
          />
        </div>
        <div className="mt-4 w-100 px-5">
          <TableCalendarEvents
            updateList={handleListEvents}
            listEvents={listEvents}
          />
        </div>
      </div>

      <EventModal id="createEventModal" updateList={handleListEvents} />
    </div>
  );
}
