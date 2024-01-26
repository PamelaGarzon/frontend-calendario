import { useState } from "react";
import { httpClient } from "../../lib/axios";

interface Params {
  [key: string]: string;
}

export function useListEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const [listEvents, setListEvents] = useState([]);

  async function onListEvents(params: Params) {
    try {
      setIsLoading(true);

      const response = await httpClient.get("event/list", {
        params: params,
      });

      setListEvents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    onListEvents,
    listEvents,
  };
}
