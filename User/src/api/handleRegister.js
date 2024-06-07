import Axios from "axios";
import Url_BackEnd from "../contants/http";
const HandleRegister = async (req) => {
  console.log("check req " + JSON.stringify(req));
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Auth/register`,
      {
        name: req.name,
        password: req.password,
        repassword: req.repassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Thêm các header khác nếu cần
          // 'Authorization': `Bearer ${yourAccessToken}`,
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

export default HandleRegister;
