import { httpClient } from "../../lib/axios";

interface Event {
  userId: string;
  id: string;
}

interface Props {
  event?: Event;
  updateList: () => void;
}

export function ConfirmDeleteEventModal({ event, updateList }: Props) {
  async function handleDeleteEvent() {
    await httpClient
      .delete(`event/${event?.id ? event.id : ""}`, {
        params: {
          userId: event?.userId,
        },
      })
      .then(() => {
        updateList();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div
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
              onClick={() => handleDeleteEvent()}
              type="button"
              className="btn btn-outline-danger"
            >
              Remover
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
