import Axios from "axios";
import Url_BackEnd from "../contants/http";

export const GET_ALL_USER = async (req) => {
  try {
    const respod = await Axios.get(
      `${Url_BackEnd}/Auth/getalluser`,

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
export const GET_USER_BY_USERID = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Auth/getuser`,
      {
        _id: localStorage.getItem("id"),
      },
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

export const Delete_USER = async (req) => {
  try {
    const respod = await Axios.delete(`${Url_BackEnd}/Auth/delete`, {
      data: {
        _id: req._id,
      },
      headers: {
        "Content-Type": "application/json",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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
export const GET_ALL_MUSIC = async (req) => {
  try {
    const respod = await Axios.get(
      `${Url_BackEnd}/Music/getall`,

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
export const GET_ALL_MUSIC_BY_USERID = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Music/getallByUserID`,
      {
        userID: localStorage.getItem("id"),
      },
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
export const GET_ALL_CATEGORY = async (req) => {
  try {
    const respod = await Axios.get(
      `${Url_BackEnd}/Category/getall`,

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

export const Create_Music = async (req) => {
  try {
    const respod = await Axios.post(`${Url_BackEnd}/Music/create`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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
export const Create_Music_By_share = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Music/createShare`,
      {
        name: req.name,
        picture: req.picture,
        description: req.description,

        mp3: req.mp3,

        userID: req.userID,
      },
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
export const Update_Music = async (req) => {
  try {
    const respod = await Axios.put(`${Url_BackEnd}/Music/update`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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

export const Update_User = async (req) => {
  try {
    const respod = await Axios.put(`${Url_BackEnd}/Auth/update`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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

export const Update_Role_For_User = async (req) => {
  try {
    const respod = await Axios.put(
      `${Url_BackEnd}/Auth/updateRuser`,
      {
        _id: req._id,
        roles: req.roles,
      },
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

export const DELETE_MUSIC = async (req) => {
  try {
    const respod = await Axios.delete(`${Url_BackEnd}/Music/delete`, {
      data: {
        id: req.id,
        // category_Id: req.category_Id,
      },
      headers: {
        "Content-Type": "application/json",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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
export const GET_ALL_MUSIC_BY_CATEGORYID = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Music/getallByCID`,
      {
        category_Id: req.category_Id,
      },
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

export const GET_ALL_MUSIC_LIKE_BEHAVIOR = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Music/getlike`,
      {
        _id: req._id,
      },
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

//
export const Create_Category = async (req) => {
  try {
    const respod = await Axios.post(
      `${Url_BackEnd}/Category/create`,
      {
        name: req.name,
      },
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

export const Delete_Category = async (req) => {
  try {
    const respod = await Axios.delete(`${Url_BackEnd}/Category/delete`, {
      data: {
        id: req.id,
      },
      headers: {
        "Content-Type": "application/json",
        // Thêm các header khác nếu cần
        Authorization: `Bearer ${localStorage.getItem("tk")}`,
      },
    });

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
export const Update_Category = async (req) => {
  try {
    const respod = await Axios.put(
      `${Url_BackEnd}/Category/update`,
      {
        id: req.id,
        name: req.name,
      },
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

export const Update_Music_View = async (req) => {
  try {
    const respod = await Axios.put(
      `${Url_BackEnd}/Music/updateU`,
      {
        id: req.id,
      },
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

export const Update_Music_Comment = async (req) => {
  try {
    const respod = await Axios.put(
      `${Url_BackEnd}/Music/comment`,
      {
        _id: req.userId, //User
        id: req.musicId, //music //_id
        content: req.content,
      },
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

export const Update_Music_Like = async (req) => {
  try {
    const respod = await Axios.put(
      `${Url_BackEnd}/Music/like`,
      {
        _id: req.userID, //user
        id: req.musicID, //music //_id
      },
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
