import Axios from "axios";
import Url_BackEnd from "../contants/http";
export const CHECK_ACCESS = async (req) => {
  try {
    const respod = await Axios.get(
      `${Url_BackEnd}/Access/`,

      {
        headers: {
          "Content-Type": "application/json",
          // Thêm các header khác nếu cần
          Authorization: `Bearer ${localStorage.getItem("tk")}`,
        },
      }
    );

    return respod.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server error:",
        error.response.status,
        error.response.data
      );
      return error.response.data;
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};
