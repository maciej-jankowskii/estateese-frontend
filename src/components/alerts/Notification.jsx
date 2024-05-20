import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/Alerts.css'

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      pauseOnHover
    />
  );
};

export const showNotification = (message, type = "error") => {
  toast[type](message);
};

export default Notification;
