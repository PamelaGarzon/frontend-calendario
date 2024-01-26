import { toast } from "react-toastify";

export function rendeSuccessMessage(successMessage: string) {
  toast(successMessage, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: "success",
    position: "top-right",
    style: {
      borderBottomColor: "green",
    },
  });
}
