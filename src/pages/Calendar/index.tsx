import { Plus } from "@phosphor-icons/react";
import {
  FilterCalendarEvents,
  Navbar,
  TableCalendarEvents,
} from "../../components";
import { EventModal } from "../../components/EventModal";
import { useContext, useEffect, useState } from "react";
import { useListEvents } from "../../hooks/useListEvents";
import { AuthUserContext } from "../../context";
import { openModal } from "../../utils";

export function Calendar() {
  const { isLoading, onListEvents, listEvents } = useListEvents();
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] = useState(false);

  const { setUserId } = useContext(AuthUserContext);

  const [filterParams, setFilterParams] = useState<{ [key: string]: string }>({
    userId: "",
    startDateTime: "",
  });

  useEffect(() => {
    const currentUserId = localStorage.getItem("user-id") || "";
    setUserId(currentUserId);

    console.log(currentUserId);
    setFilterParams((prevParams) => ({
      ...prevParams,
      userId: currentUserId,
    }));
  }, [setUserId]);

  function handleListEvents() {
    onListEvents(filterParams);
  }

  useEffect(() => {
    if (Object.keys(filterParams).length) {
      handleListEvents();
    }
  }, [filterParams]);

  function onCloseCreateEventModal() {
    setIsOpenCreateEventModal(false);
  }

  return (
    <div className="container-fluid p-0 overflow-hidden">
      <Navbar />

      <div className="d-flex justify-content-end px-5 mt-4">
        <button
          className=" d-flex gap-2 btn btn-lg btn-outline-primary align-items-center"
          id="btn-create-event"
          onClick={() => {
            setIsOpenCreateEventModal(true);
            openModal("createEventModal");
          }}
        >
          <Plus size={16} />
          Adicionar Evento
        </button>
      </div>

      <div className="d-flex w-100 flex-column">
        <div>
          <FilterCalendarEvents
            updateList={handleListEvents}
            setFilterParams={setFilterParams}
            filterParams={filterParams}
          />
        </div>
        {isLoading ? (
          <div className="text-center mt-5">
            <div className="spinner-border spinner-grow-lg" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-4 w-100 px-5">
            <TableCalendarEvents
              updateList={handleListEvents}
              listEvents={listEvents}
            />
          </div>
        )}
      </div>

      <EventModal
        id="createEventModal"
        updateList={handleListEvents}
        onCloseEventModal={onCloseCreateEventModal}
        isOpen={isOpenCreateEventModal}
      />
    </div>
  );
}
