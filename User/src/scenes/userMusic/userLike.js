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

const UserLike = () => {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [openComment, setOpenComment] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [modalDataComment, setModalDataComment] = React.useState({});
  const [stateComment, setStateComment] = React.useState({
    userId: localStorage.getItem("id"), //User
    content: "",
  });
  const UPDATE_VIEW_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_View(body);
    },
  });
  const handleOpenComment = (data) => {
    UPDATE_VIEW_MUSIC.mutate(data, {
      onSuccess: (res) => {
        data_get_behavior_like.refetch();
      },
      onError: (err) => {
        console.log("err" + err);
      },
    });
    setModalDataComment(data);
    setOpenComment(true);
  };

  const handleCloseComment = () => setOpenComment(false);

  const UPDATE_LIKE_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_Like(body);
    },
  });
  ///Modal create
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    UPDATE_VIEW_MUSIC.mutate(data, {
      onSuccess: (res) => {
        data_get_behavior_like.refetch();
      },
      onError: (err) => {
        console.log("err" + err);
      },
    });
    setModalData(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Modal Edit

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

  const handleLike = (MusicID) => {
    let formLike = {
      userID: localStorage.getItem("id"), //user
      musicID: MusicID, //music //_id
    };
    UPDATE_LIKE_MUSIC.mutate(formLike, {
      onSuccess: (data) => {
        data_get_behavior_like.refetch();
      },
    });
  };
  const handleSendComment = async ({ MusicID }) => {
    let formUpdateCMT = {
      userId: stateComment.userId, //User
      musicId: MusicID,
      content: stateComment.content,
    };
    await UPDATE_COMMENT_MUSIC.mutate(formUpdateCMT, {
      onSuccess: async (data) => {
        data_get_behavior_like.refetch();
        setStateComment({
          ...stateComment,
          content: "",
        });
        let res = await GET_ALL_MUSIC();

        const filteredObjects = res.All_music.filter(
          (obj) => obj._id === MusicID
        );

        setModalDataComment({
          _id: filteredObjects[0]._id,
          picture: filteredObjects[0].picture, // Replace with your image URL
          name: filteredObjects[0].name,
          description: filteredObjects[0].description,
          stateComment: filteredObjects[0].ArrayComment,
        });
      },
    });
  };
  const convertDatetime = (x) => {
    // Chuỗi thời gian ban đầu
    let originalTime = x;

    // Chuyển đổi chuỗi thời gian thành đối tượng Date
    let utcDate = new Date(originalTime);

    // Tạo đối tượng mới cho múi giờ Việt Nam (UTC+7)
    let vietnamOffset = 60; // Offset của UTC+7 tính bằng phút
    let vietnamDate = new Date(utcDate.getTime() + vietnamOffset * 60 * 1000);

    // Định dạng lại thời gian theo định dạng năm/tháng/ngày giờ phút giây
    let formattedTime =
      vietnamDate.getFullYear() +
      "-" +
      String(vietnamDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(vietnamDate.getDate()).padStart(2, "0") +
      " " +
      String(vietnamDate.getHours() - 1).padStart(2, "0") +
      ":" +
      String(vietnamDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(vietnamDate.getSeconds()).padStart(2, "0");
    return formattedTime;
  };
  return (
    <>
      <Box pl={3} pr={3} pt={5}>
        {/* Like */}
        <Box sx={{ flexGrow: 1 }} pl={2}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data_get_behavior_like.data?.userlike.map((item, index) => (
              <Grid className="hover" item xs={2} sm={4} md={4} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    minHeight: "345px",
                    maxHeight: "345px",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item.userID.account_image}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    title={item.userID.name}
                  />
                  <CardMedia
                    component="img"
                    height="120"
                    image={item.picture}
                    alt="Paella dish"
                    onClick={() =>
                      handleOpen({
                        id: item.id,
                        picture: item.picture, // Replace with your image URL
                        name: item.name,
                        description: item.description,
                        mp3: item.mp3,
                      })
                    }
                  />

                  <CardContent>
                    <Typography
                      sx={{
                        width: "100%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      variant="body1"
                      color="text.primary"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                        height: "37px",
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        textAlign: "center",
                      }}
                      aria-label="add to favorites"
                    >
                      <Typography> {item.view}</Typography>
                      <RemoveRedEyeIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleOpenComment({
                          _id: item._id,
                          picture: item.picture, // Replace with your image URL
                          name: item.name,
                          description: item.description,
                          stateComment: item.ArrayComment,
                        })
                      }
                      aria-label="add to favorites"
                    >
                      <Typography> {item.ArrayComment.length}</Typography>
                      <InsertCommentIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleLike(item._id);
                      }}
                      aria-label="add to favorites"
                    >
                      <Typography> {item.ArrayLike.length}</Typography>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={styleModal}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <img
                    style={{ objectFit: "cover" }}
                    src={modalData.picture}
                    width={"300px"}
                    height={"400px"}
                  ></img>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {modalData.name}
                    </Typography>
                    <Typography>{modalData.description}</Typography>
                  </Box>
                  <Box>
                    <ReactAudioPlayer src={modalData.mp3} controls />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Modal>
          {/*Modal Comment */}
          <Modal
            open={openComment}
            onClose={handleCloseComment}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={styleModal}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  sx={{ objectFit: "cover" }}
                  image={modalDataComment.picture}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {" "}
                    {modalDataComment.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {modalDataComment.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box
                sx={{
                  backgroundColor: "whitesmoke",
                  borderRadius: "20px",
                  overflowY: "scroll",
                }}
                maxHeight="450px"
                width={"100%"}
              >
                {modalDataComment.stateComment &&
                  modalDataComment.stateComment.map((obj, index) => (
                    <>
                      <Box
                        width={"50%"}
                        padding={3}
                        alignItems={"center"}
                        display={"flex"}
                      >
                        <Avatar src={obj._id.account_image}></Avatar>
                        <Box>
                          <Typography color={""} ml={5}>
                            {obj._id.name}
                          </Typography>
                          <Typography color={"gray"} ml={5}>
                            {obj.content}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ))}
              </Box>
              <Box mt={2}>
                <input
                  value={stateComment.content}
                  name="content"
                  onChange={(e) => {
                    setStateComment({
                      ...stateComment,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  style={{
                    width: "500px",
                    height: "50px",
                    paddingLeft: "10px",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                  }}
                  type="text"
                ></input>
                <Button
                  onClick={() => {
                    handleSendComment({ MusicID: modalDataComment._id });
                  }}
                >
                  <SendIcon></SendIcon>
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
};
export default UserLike;
