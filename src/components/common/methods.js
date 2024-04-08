import { toast } from "react-toastify";


export const successToast = (position,message) =>{
	toast.success(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
}

export const ErrorToast = (position,message) =>{
	toast.error(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
}

export const InfoToast = (position,message) =>{
	toast.info(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
}

export const ParseDate = (date) => {
  const event = new Date(date);
  const currentDate = new Date();

  const timeDiffInMilliseconds = currentDate.getTime() - event.getTime();
  const timeDiffInHours = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60));

  if (timeDiffInHours < 24) {
    return `${timeDiffInHours} hours ago`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = event.getMonth();
    const month = months[monthIndex];

    const day = event.getDate();
    const year = event.getFullYear();

    return `${month} ${day}, ${year}`;
  }
};