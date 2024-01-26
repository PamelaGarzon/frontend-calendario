import { useContext } from "react";
import { EventFormData } from "../../components/EventModal/types";
import { httpClient } from "../../lib/axios";
import { renderErrorMessage } from "../../utils/renderErrorMessage.utils";
import { AuthUserContext } from "../../context";

export function useEventModalAction() {
  const { userId } = useContext(AuthUserContext);

  async function handleEventModalAction(
    id: "editEventModal" | "createEventModal" | string,
    onCompletedRequest: () => void,
    eventId?: string,
    data?: EventFormData
  ) {
    const url =
      id === "editEventModal" ? `event/${eventId || "event"}` : "event/";

    await httpClient
      .request({
        method: id === "createEventModal" ? "POST" : "PUT",
        url: url,
        data: { ...data, userId: userId },
      })
      .then(() => {
        onCompletedRequest();
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

  return {
    handleEventModalAction,
  };
}
