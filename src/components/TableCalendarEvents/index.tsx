import { PencilSimpleLine, Trash } from "@phosphor-icons/react";
import { ConfirmDeleteEventModal } from "../ConfirmDeleteEventModal";
import { EventModal } from "../EventModal";
import { useState } from "react";
import { format } from "date-fns";
import { getStatus } from "./utils";
import { openModal } from "../../utils";

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
  const [isOpenEditEventModal, setIsOpenEditEventModal] = useState(false);
  const [isOpenDeleteEventModal, setIsOpenDeleteEventModal] = useState(false);

  const [eventItem, setEventItem] = useState<Event>();

  function handleOpenEditEventItemModal(event: Event) {
    setEventItem(event);
    setIsOpenEditEventModal(true);
    openModal("editEventModal");
  }

  function handleOpenDeleteEventItemModal(event: Event) {
    setEventItem(event);
    setIsOpenDeleteEventModal(true);
    openModal("confirmDeleteEventModal");
  }

  function onCloseEditEventModal() {
    setIsOpenEditEventModal(false);
  }

  function onCloseDeleteEventModal() {
    setIsOpenDeleteEventModal(false);
  }

  if (listEvents.length === 0)
    return (
      <div className="mb-3 d-flex justify-content-center align-items-center w-100">
        <label className="form-label mb-0 me-2">
          Ainda não possui nenhum evento
        </label>
      </div>
    );

  return (
    <>
      <div className="table-responsive-md">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Evento</th>
              <th scope="col">Data Inicio</th>
              <th scope="col">Data fim</th>
              <th scope="col">Status</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {listEvents.map((event) => {
              const status = getStatus(event.startDateTime, event.endDateTime);
              return (
                <tr key={event.id}>
                  <td className="text-truncate" scope="row">
                    {event.description}
                  </td>
                  <td>
                    {format(
                      new Date(event.startDateTime),
                      "dd/MM/yyyy - HH:mm a"
                    )}
                  </td>
                  <td>
                    {format(
                      new Date(event.endDateTime),
                      "dd/MM/yyyy - HH:mm a"
                    )}
                  </td>
                  <td>
                    {status === "Confirmado" && (
                      <p className="text-truncate text-success">{status}</p>
                    )}
                    {status === "Em andamento" && (
                      <p className="text-truncate text-primary">{status}</p>
                    )}
                    {status === "Finalizado" && (
                      <p className="text-truncate text-secondary">{status}</p>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleOpenDeleteEventItemModal(event)}
                        data-bs-title="Remover Evento"
                      >
                        <Trash size={16} />
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          handleOpenEditEventItemModal(event);
                        }}
                        data-bs-title="Editar Evento"
                      >
                        <PencilSimpleLine size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteEventModal
        isOpen={isOpenDeleteEventModal}
        onCloseDeleteEventModal={onCloseDeleteEventModal}
        event={eventItem}
        updateList={updateList}
      />

      <EventModal
        id="editEventModal"
        updateList={updateList}
        event={eventItem}
        onCloseEventModal={onCloseEditEventModal}
        isOpen={isOpenEditEventModal}
      />
    </>
  );
}
