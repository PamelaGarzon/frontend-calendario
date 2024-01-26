import { httpClient } from "../../lib/axios";
import { removeModalBackdrop } from "../../utils";

interface Event {
  userId: string;
  id: string;
}

interface Props {
  event?: Event;
  updateList: () => void;
  onCloseDeleteEventModal: () => void;
  isOpen: boolean;
}

export function ConfirmDeleteEventModal({
  event,
  updateList,
  isOpen,
  onCloseDeleteEventModal,
}: Props) {
  async function handleDeleteEvent() {
    await httpClient
      .delete(`event/${event?.id ? event.id : ""}`, {
        params: {
          userId: event?.userId,
        },
      })
      .then(() => {
        updateList();
        onCloseDeleteEventModal();
        removeModalBackdrop();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{ display: isOpen ? "block" : "none" }}
      className="modal fade"
      id="confirmDeleteEventModal"
      tabIndex={-1}
      aria-labelledby="confirmDeleteEventModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <header className="modal-header">
            <h5 className="modal-title" id="confirmDeleteEventModalLabel">
              Confirmação de Remoção
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </header>

          <div className="modal-body">
            <p>
              Tem certeza que deseja remover o evento{" "}
              <strong>Reunião do time?</strong>
            </p>
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDeleteEvent}
            >
              Remover
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
