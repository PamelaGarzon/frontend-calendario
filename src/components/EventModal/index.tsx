import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { EventFormSchema } from "./utils";
import { EventFormData } from "./types";
import { useEventModalAction } from "../../hooks";
import { useForm } from "react-hook-form";
import { removeModalBackdrop } from "../../utils";

interface Event {
  description: string;
  id: string;
  startDateTime: string;
  endDateTime: string;
  userId: string;
}

interface Props {
  id: "editEventModal" | "createEventModal";
  updateList: () => void;
  event?: Event;
  onCloseEventModal: () => void;
  isOpen: boolean;
}

export function EventModal({
  id,
  updateList,
  event,
  isOpen,
  onCloseEventModal,
}: Props) {
  const title = id === "editEventModal" ? "Editar Evento" : "Adicionar Evento";

  const btnMainActionText = id === "editEventModal" ? "Editar" : "Adicionar";

  const methods = useForm<EventFormData>({
    resolver: zodResolver(EventFormSchema),
  });

  const { handleEventModalAction } = useEventModalAction();

  useEffect(() => {
    if (event && id === "editEventModal") {
      methods.setValue("description", event?.description);
      methods.setValue("startDateTime", event?.startDateTime);
      methods.setValue("endDateTime", event?.endDateTime);
    }
  }, [event]);

  function onCompletedRequest() {
    methods.reset();
    updateList();
    onCloseEventModal();
    removeModalBackdrop();
  }

  function onSubmit(data: EventFormData) {
    handleEventModalAction(id, onCompletedRequest, event?.id, data);
  }

  const errors = methods.formState.errors;

  return (
    <div
      className="modal fade"
      style={{ display: isOpen ? "block" : "none" }}
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <header className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>
            <button
              type="button"
              id="btn-close"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            ></button>
          </header>

          <div className="modal-body">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="d-flex flex-column px-4">
                <section className="d-flex flex-wrap">
                  <div className="mb-1">
                    <label className="form-label">Data/Hora Inicial</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      {...methods.register("startDateTime")}
                    />
                  </div>
                  {errors.startDateTime && (
                    <div className="invalid-feedback d-block">
                      {errors.startDateTime.message}
                    </div>
                  )}
                </section>

                <section className="d-flex flex-wrap">
                  <div className="mb-1">
                    <label className="form-label">Data/Hora Final</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      {...methods.register("endDateTime")}
                    />
                  </div>
                  {errors.endDateTime && (
                    <div className="invalid-feedback d-block">
                      {errors.endDateTime.message}
                    </div>
                  )}
                </section>

                <section className="mb-1">
                  <label className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    {...methods.register("description")}
                  />

                  {errors.description && (
                    <div className="invalid-feedback d-block">
                      {errors.description.message}
                    </div>
                  )}
                </section>
              </div>
              <footer className="modal-footer">
                <button
                  id="btn-close-modal"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button type="submit" className="btn btn-outline-primary">
                  {btnMainActionText}
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
