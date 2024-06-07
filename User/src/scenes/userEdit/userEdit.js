import { useQuery } from "@tanstack/react-query";
import { GET_USER_BY_USERID, Update_User } from "../../api/handleAdmin";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UserEdit = () => {
  let nav = useNavigate();
  const data = useQuery({
    queryKey: ["getuser"],
    queryFn: async () => {
      const result = await GET_USER_BY_USERID();
      return result; // Ensure the result is returned
    },
  });
  const mutation = useMutation({
    mutationFn: (body) => {
      return Update_User(body);
    },
  });
  const [img, setimg] = useState(data.data?.user?.account_image || "");
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [stateEdit, setStateEdit] = useState({
    password: "",
    account_image: null,
  });
  const onchange = (e) => {
    seterror("");
    setStateEdit({
      ...stateEdit,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (event) => {
    seterror("");
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimg(e.target.result);
        setStateEdit({
          ...stateEdit,
          account_image: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
    const dataForm = new FormData();
    dataForm.append("password", stateEdit.password);
    dataForm.append("account_image", stateEdit.account_image);
    dataForm.append("_id", localStorage.getItem("id"));

    mutation.mutate(dataForm, {
      onSuccess: (dataF) => {
        if (dataF.success) {
          data.refetch();
          alert("Cập nhật thành công vui lòng đăng nhập lại !!");
          setStateEdit({
            password: "",
            account_image: null,
          });
          setIsloading(false);
          localStorage.clear();
          nav("/");
        } else {
          seterror(dataF?.message || "");
          setIsloading(false);
        }
      },
      onError: (errors) => {
        alert("Tạo dữ liệu thất bại");
        setIsloading(false);
      },
    });
  };
  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputPassword1">
            Xác nhận lại mật khẩu hoặc nhập mật khẩu mới
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={stateEdit.password}
            onChange={onchange}
            class="form-control"
            id="exampleInputPassword1"
          />
          <span style={{ color: "red" }}>{error}</span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Ảnh đại diện</label>
          <input
            type="file"
            onChange={handleFileChange}
            class="form-control"
            id="exampleInputPassword1"
          />

          <img
            width={"200px"}
            height={"200px"}
            src={img || data.data?.user?.account_image}
          ></img>
        </div>
        <div class="form-group form-check">
          <label>
            Show Password:
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        {isloading ? (
          <h3>Loading...</h3>
        ) : (
          <button type="submit" class="btn btn-primary">
            Xác nhận
          </button>
        )}
      </form>
    </Box>
  );
};
export default UserEdit;
