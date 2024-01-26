import { toast } from "react-toastify";

export function renderErrorMessage(errorMessage: string) {
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
