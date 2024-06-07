import Axios from "axios";
import Url_BackEnd from "../contants/http";
const HandleLogin = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Auth/Login`,
      {
        name: req.name,
        password: req.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // Thêm các header khác nếu cần
          // 'Authorization': `Bearer ${yourAccessToken}`,
        },
      }
    );
    //Không nên dùng vì đây là dự án School nên có thể dùng, có thể lưu nó trên redux, hoặc cookie sẽ ổn hơn
    localStorage.setItem("id", respod.data.user._id);
    localStorage.setItem("tk", respod.data.Accesstoken);
    localStorage.setItem("name", respod.data.user.name);
    localStorage.setItem("avt", respod.data.user.account_image);

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

export default HandleLogin;
