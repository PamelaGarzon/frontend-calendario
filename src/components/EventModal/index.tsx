import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useEffect } from "react";
import { httpClient } from "../../lib/axios";
import { AuthUserContext } from "../../context";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorToast } from "..";
import { toast } from "react-toastify";

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
}

// estrutura de validação que define as regras para os dados que você espera receber do formulário
// no caso essa estrutura é um objeto por isso temos o z.object
// refine é usado para adicionar validações personalizadas a um esquema.
const EventFormSchema = z
  .object({
    startDateTime: z.string(),
    endDateTime: z.string(),
    description: z.string().min(4, "Descrição é um campo obrigatório"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDateTime);
      const endDate = new Date(data.endDateTime);

      return startDate < endDate;
    },
    {
      message: "A data inicial deve ser menor que a data final",
      path: ["startDateTime"],
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDateTime);
      const endDate = new Date(data.endDateTime);

      return endDate > startDate;
    },
    {
      message: "A data final deve ser maior que a data inicial",
      // path define em qual campo vai o erro
      path: ["endDateTime"],
    }
  );

interface EventForm {
  description: string;
  startDateTime: string;
  endDateTime: string;
}

export function EventModal({ id, updateList, event }: Props) {
  const { userId } = useContext(AuthUserContext);

  const title = id === "editEventModal" ? "Editar Evento" : "Adicionar Evento";

  const btnMainActionText = id === "editEventModal" ? "Editar" : "Adicionar";

  const methods = useForm<EventForm>({
    resolver: zodResolver(EventFormSchema),
  });

  const handleResetModal = () => methods.reset();

  function renderErrorMessage(errorMessage: string) {
    toast(errorMessage, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "error",
      position: "top-right",
      style: {
        borderBottomColor: "red",
      },
    });
  }

  // Se eu abrir a modal e tiver valor e fechar e abrir de novo eu limpo o formulario
  useEffect(() => {
    const modalElement = document.getElementById(id);

    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", handleResetModal);

      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleResetModal);
      };
    }
  }, [id]);

  // No modo de edição, preenche os inputs com os valores do evento clicado (botão de editar)
  useEffect(() => {
    // Como que sei que é o modo pra editar? pelo id === "editEventModal", lembrando que editEventModal é o id da modal
    if (event && id === "editEventModal") {
      methods.setValue("description", event?.description);
      methods.setValue("startDateTime", event?.startDateTime);
      methods.setValue("endDateTime", event?.endDateTime);
    }
  }, [event]);

  // [event] -> o useEffect sempre vai executar de novo quando o event mudar

  // aqui usa async, porque por chamar uma api, leva um tempo, então não sabemos quanto
  async function handleCreateEvent(data: EventForm) {
    const { description, startDateTime, endDateTime } = data;
    // o await obriga o javascript esperar a requisição finalizar
    // dentro do httpClient
    // .post("event/", {
    //   description,
    //   startDateTime,
    //   endDateTime,
    //   userId,
    // })
    // retorna uma promisse, sempre que chamamos o backend/api,
    // podemos pegar a resposta usando then,
    // então primeiro faz a chamada then (então) pega o res ou se tiver erro cai no catch
    // o then é uma função que pode ter o res como argumento ou não fazer nada
    // nesse caso a gente não usa o res por isso ta vazio o then(() => {})

    //const nomeFunção = () => {} === function nomeFunção {} ambos são funções
    await httpClient
      .post("event/", {
        description,
        startDateTime,
        endDateTime,
        userId,
      })
      .then(() => {
        updateList();
        handleResetModal();
      })
      .catch((err) => {
        if (
          id === "createEventModal" &&
          err?.response?.data &&
          err?.response?.status === 400
        ) {
          renderErrorMessage(err.response.data);
        }
      });
  }

  async function handleUpdateEvent(data: EventForm) {
    const { description, startDateTime, endDateTime } = data;
    await httpClient
      // IF existir event.id (?) event.id SENÃO (:)""
      .put(`event/${event?.id ? event.id : ""}`, {
        description,
        startDateTime,
        endDateTime,
        userId,
      })
      .then(() => {
        updateList();
        handleResetModal();
      })
      .catch((err) => {
        if (
          id === "createEventModal" &&
          err?.response?.data &&
          err?.response?.status === 400
        ) {
          renderErrorMessage(err.response.data);
        }
      });
  }

  const onSubmit: SubmitHandler<EventForm> = (data) => {
    if (id === "editEventModal") {
      handleUpdateEvent(data);
    } else {
      handleCreateEvent(data);
    }
  };

  const errors = methods.formState.errors;

  return (
    <div
      className="modal fade"
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
                    <div
                      // adicionou o display: "block" de forma inline(direto na tag html) porque o display da classe invalid-feedback é none
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
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
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
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
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.description.message}
                    </div>
                  )}
                </section>
              </div>
              <footer className="modal-footer">
                <button
                  type="button"
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
