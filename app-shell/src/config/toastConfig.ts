import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: string) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
  });
};
