import { Bounce, toast } from "react-toastify";

export const popupSuccess = (message = "Error") =>
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });

export const popupError = (message = "Error") =>
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnFocusLoss: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
