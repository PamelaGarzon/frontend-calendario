import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { ConfirmDeleteEventModal } from "../ConfirmDeleteEventModal";
import { EventModal } from "../EventModal";
import { useState } from "react";
import { format } from "date-fns";

interface Event {
  description: string;
  id: string;
  startDateTime: string;
  endDateTime: string;
  userId: string;
}
interface Props {
  listEvents: Event[];
  updateList: () => void;
}
export function TableCalendarEvents({ listEvents, updateList }: Props) {
  const [eventItem, setEventItem] = useState<Event>();

  function handleEditEventItem(event: Event) {
    setEventItem(event);
  }

  function handleRemoveEvent(event: Event) {
    setEventItem(event);
  }
  return (
    <>
      <div className="table-responsive-md">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Evento</th>
              <th scope="col">Data Inicio</th>
              <th scope="col">Data fim</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {listEvents.map((event) => (
              <tr key={event.id}>
                <td scope="row">{event.description}</td>
                <td>
                  {format(
                    new Date(event.startDateTime),
                    "dd/MM/yyyy - HH:mm a"
                  )}
                </td>
                <td>
                  {format(new Date(event.endDateTime), "dd/MM/yyyy - HH:mm a")}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmDeleteEventModal"
                      onClick={() => handleRemoveEvent(event)}
                      data-bs-title="Remover Evento"
                    >
                      <Trash size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#editEventModal"
                      onClick={() => handleEditEventItem(event)}
                      data-bs-title="Editar Evento"
                    >
                      <PencilSimpleLine size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteEventModal event={eventItem} updateList={updateList} />

      <EventModal
        id="editEventModal"
        updateList={updateList}
        event={eventItem}
      />
    </>
  );
}
