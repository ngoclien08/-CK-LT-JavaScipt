import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  GET_ALL_MUSIC,
  Create_Music,
  DELETE_MUSIC,
  Update_Music,
  GET_ALL_MUSIC_BY_USERID,
  GET_ALL_MUSIC_LIKE_BEHAVIOR,
  Update_Music_View,
  Update_Music_Like,
  Update_Music_Comment,
} from "../../api/handleAdmin";
import { useQuery } from "@tanstack/react-query";
import UserLike from "./userLike";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@tanstack/react-query";
import {
  FormWrapper,
  FormTitle,
  FormField,
  Label,
  Input,
  style,
  ErrorMessage,
  columns,
} from "./Components/components";
import ReactAudioPlayer from "react-audio-player";

const UserMusic = () => {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [selectedRow, setSelectRow] = React.useState([]);
  const [isloadingSubmit, setIsloadingSubmit] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [imageSrcCreate, setImageSrcCreate] = React.useState(null);

  const [stateComment, setStateComment] = React.useState({
    userId: localStorage.getItem("id"), //User
    content: "",
  });
  const UPDATE_VIEW_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_View(body);
    },
  });

  const DATA_GET_ALL_MUSIC = useQuery({
    queryKey: ["User_Get_All_Music"],
    queryFn: async () => {
      const result = await GET_ALL_MUSIC();
      return result; // Ensure the result is returned
    },
  });
  const UPDATE_LIKE_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_Like(body);
    },
  });
  ///Modal create
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Modal Edit
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setFormDataEdit(selectedRow[0]);
    setImageSrc(selectedRow[0].picture);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const data = useQuery({
    queryKey: ["GetAllMusic"],
    queryFn: async () => {
      const result = await GET_ALL_MUSIC_BY_USERID();
      return result; // Ensure the result is returned
    },
  });
  const UPDATE_COMMENT_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_Comment(body);
    },
  });
  const data_get_behavior_like = useQuery({
    queryKey: ["AllMusic_like"],
    queryFn: async () => {
      const result = await GET_ALL_MUSIC_LIKE_BEHAVIOR({
        _id: localStorage.getItem("id"),
      });
      return result; // Ensure the result is returned
    },
  });
  const mutation = useMutation({
    mutationFn: (body) => {
      return Create_Music(body);
    },
  });
  const mutation_EditMusic = useMutation({
    mutationFn: (body) => {
      return Update_Music(body);
    },
  });
  const [errors, setErrors] = React.useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setFormDataEdit({
      ...formDataEdit,
      [name]: value,
    });
  };
  const HandleSelect = (newselectionmodel) => {
    const selectedRows = newselectionmodel.map((selectedId) =>
      data?.data?.All_music.find((row) => row.id === selectedId)
    );
    setSelectRow(selectedRows);
    setSelectionModel(newselectionmodel);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsloadingSubmit(true);
      const dataForm = new FormData();
      dataForm.append("name", formData.name);
      dataForm.append("description", formData.description);
      dataForm.append("view", formData.view);
      dataForm.append("mp3", formData.mp3);
      dataForm.append("file", formData.file);
      dataForm.append("userID", localStorage.getItem("id"));

      mutation.mutate(dataForm, {
        onSuccess: (dataF) => {
          if (dataF.success) {
            data.refetch();
            alert(dataF.Message);
            setFormData({
              name: "",
              view: 0,
              description: "...",

              file: null,
              mp3: null,
            });
          }

          setSelectRow([]);
          setSelectionModel([]);
          setOpen(false);
          setImageSrcCreate(null);
          setIsloadingSubmit(false);
        },
        onError: (errors) => {
          setIsloadingSubmit(false);
          alert("Tạo dữ liệu thất bại");
        },
      });
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    setIsloadingSubmit(true);
    dataForm.append("id", formDataEdit.id);
    dataForm.append("name", formDataEdit.name);
    dataForm.append("description", formDataEdit.description);
    dataForm.append("view", formDataEdit.view);

    dataForm.append("file", formDataEdit.file);

    mutation_EditMusic.mutate(dataForm, {
      onSuccess: (dataF) => {
        if (dataF.success) {
          data.refetch();
          data_get_behavior_like.refetch();
          alert(dataF.Message);

          setFormDataEdit({
            name: "",
            view: 0,
            description: "...",

            file: null,
          });
        }

        setSelectRow([]);
        setSelectionModel([]);
        setOpenEdit(false);
        setImageSrc(null);

        setIsloadingSubmit(false);
      },
      onError: (errors) => {
        setIsloadingSubmit(false);
      },
    });
  };
  const [formDataEdit, setFormDataEdit] = React.useState({});
  const [formData, setFormData] = React.useState({
    name: "",
    view: 0,
    description: "...",

    file: null,
    mp3: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setErrors({});
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrcCreate(e.target.result);
        setFormData({
          ...formData,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeMp3 = (event) => {
    const file = event.target.files[0];
    setErrors({});
    setFormData({
      ...formData,
      mp3: file,
    });
  };
  const handleFileChangeEdit = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setFormDataEdit({
          ...formDataEdit,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = async () => {
    const productPromises = [];
    selectedRow.forEach((item, index) => {
      let formDeleted = {
        id: item.id,
        // category_Id: item.category_Id._id,
      };
      productPromises.push(DELETE_MUSIC(formDeleted));
    });
    try {
      const results = await Promise.all(productPromises);
      alert("Xoá thành công");
      data.refetch();
      data_get_behavior_like.refetch();
    } catch (error) {
      console.error("Error creating products:", error);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.file) {
      newErrors.file = "File is required";
    }

    if (!formData.mp3) {
      newErrors.mp3 = "File is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <>
        <Box pl={3} pr={3} pt={5}>
          <Box mb={5}>
            <Typography fontWeight={700} variant="h4" color={"Highlight"}>
              Danh sách nhạc
            </Typography>
          </Box>

          <Box mb={5}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={handleOpen} sx={{ backgroundColor: "green" }}>
                Thêm
              </Button>
              <Button
                sx={{ backgroundColor: "red" }}
                disabled={selectionModel.length === 0}
                onClick={handleDelete}
              >
                Xoá
              </Button>
              <Button
                onClick={handleOpenEdit}
                sx={{ backgroundColor: "orangered" }}
                disabled={selectionModel.length !== 1}
              >
                Sửa
              </Button>
            </ButtonGroup>
            <Box>
              {/* MODAL CREATE */}
              <React.Fragment>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 700 }}>
                    <FormWrapper>
                      <FormTitle>Tạo ban nhạc</FormTitle>

                      <form onSubmit={handleSubmit}>
                        <FormField>
                          <Label htmlFor="name">Name:</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                          />
                          {errors.name && (
                            <ErrorMessage>{errors.name}</ErrorMessage>
                          )}
                        </FormField>
                        <FormField>
                          <Label htmlFor="email">Mô tả</Label>
                          <Input
                            type="description"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </FormField>
                        <FormField>
                          <Label htmlFor="file">File Hình ảnh:</Label>
                          <Input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            error={errors.file}
                          />
                          {imageSrcCreate && (
                            <img
                              src={imageSrcCreate}
                              alt="Selected"
                              style={{ maxWidth: "100%", height: "100" }}
                            />
                          )}
                          {errors.file && (
                            <ErrorMessage>{errors.file}</ErrorMessage>
                          )}
                        </FormField>

                        <FormField>
                          <Label htmlFor="file">File Nhạc MP3:</Label>
                          <Input
                            type="file"
                            id="mp3"
                            name="mp3"
                            accept="audio/mp3"
                            onChange={handleFileChangeMp3}
                            error={errors.mp3}
                          />

                          {errors.mp3 && (
                            <ErrorMessage>{errors.mp3}</ErrorMessage>
                          )}
                        </FormField>

                        {isloadingSubmit ? (
                          <Button>Loading...</Button>
                        ) : (
                          <Button color="success" type="submit">
                            Xác nhận
                          </Button>
                        )}

                        <Button onClick={handleClose}>x</Button>
                      </form>
                    </FormWrapper>
                  </Box>
                </Modal>
              </React.Fragment>

              {/* MODAL EDIT */}
              <React.Fragment>
                <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 700 }}>
                    <FormWrapper>
                      <FormTitle>Điều chỉnh ban nhạc</FormTitle>

                      <form onSubmit={handleSubmitEdit}>
                        <FormField>
                          <Label htmlFor="name">Tên:</Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formDataEdit.name}
                            onChange={handleChangeEdit}
                          />
                        </FormField>
                        <FormField>
                          <Label htmlFor="email">Mô tả</Label>
                          <Input
                            type="description"
                            id="description"
                            name="description"
                            value={formDataEdit.description}
                            onChange={handleChangeEdit}
                          />
                        </FormField>
                        <FormField>
                          <Label htmlFor="file">File:</Label>
                          <Input
                            type="file"
                            id="file"
                            accept="image/*"
                            name="file"
                            onChange={handleFileChangeEdit}
                          />
                          {imageSrc && (
                            <img
                              src={imageSrc}
                              alt="Selected"
                              style={{ maxWidth: "100%", height: "100" }}
                            />
                          )}
                        </FormField>

                        {isloadingSubmit ? (
                          <Button>loading...</Button>
                        ) : (
                          <Button color="success" type="submit">
                            Điều chỉnh
                          </Button>
                        )}

                        <Button onClick={handleCloseEdit}>x</Button>
                      </form>
                    </FormWrapper>
                  </Box>
                </Modal>
              </React.Fragment>
            </Box>
          </Box>

          <Box
            height={"70vh"}
            width={"100%"}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#674dbf",
                color: "white",
                borderBottom: "none",
              },
            }}
          >
            <DataGrid
              sx={{ backgroundColor: "white", fontSize: "1.4rem" }}
              rows={data?.data?.All_music || []}
              columns={columns}
              selectionModel={selectionModel}
              onSelectionModelChange={HandleSelect}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>

          {/* Like */}
          <UserLike></UserLike>
        </Box>
      </>
    </>
  );
};
export default UserMusic;
