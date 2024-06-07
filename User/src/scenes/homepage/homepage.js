import React from "react";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, CardActionArea } from "@mui/material";
import { useSpring, animated } from "react-spring";
import Paper from "@mui/material/Paper";
import ShareIcon from "@mui/icons-material/Share";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import "./style.css";
import {
  GET_ALL_MUSIC,
  GET_ALL_CATEGORY,
  GET_ALL_MUSIC_BY_CATEGORYID,
  Update_Music_View,
  Update_Music_Comment,
  Update_Music_Like,
  Create_Music_By_share,
} from "../../api/handleAdmin";

import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@mui/material";

const Homepage = () => {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [isloading, setIsloading] = React.useState(false);
  const DATA_GET_ALL_MUSIC = useQuery({
    queryKey: ["User_Get_All_Music"],
    queryFn: async () => {
      const result = await GET_ALL_MUSIC();
      return result; // Ensure the result is returned
    },
  });
  const UPDATE_VIEW_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_View(body);
    },
  });
  const CREATE_MUSIC_SHARE = useMutation({
    mutationFn: (body) => {
      return Create_Music_By_share(body);
    },
  });
  const UPDATE_COMMENT_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_Comment(body);
    },
  });
  const UPDATE_LIKE_MUSIC = useMutation({
    mutationFn: (body) => {
      return Update_Music_Like(body);
    },
  });
  const handleOpen = (data) => {
    UPDATE_VIEW_MUSIC.mutate(data, {
      onSuccess: (res) => {
        DATA_GET_ALL_MUSIC.refetch();
      },
      onError: (err) => {
        console.log("err" + err);
      },
    });
    setModalData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [openComment, setOpenComment] = React.useState(false);
  const [modalDataComment, setModalDataComment] = React.useState({});
  const [stateComment, setStateComment] = React.useState({
    userId: localStorage.getItem("id"), //User
    content: "",
  });
  const handleOpenComment = (data) => {
    UPDATE_VIEW_MUSIC.mutate(data, {
      onSuccess: (res) => {
        DATA_GET_ALL_MUSIC.refetch();
      },
      onError: (err) => {
        console.log("err" + err);
      },
    });
    setModalDataComment(data);
    setOpenComment(true);
  };

  const handleCloseComment = () => setOpenComment(false);

  ///Share
  const [openShare, setOpenShare] = React.useState(false);
  const [modalDataShare, setModalDataShare] = React.useState({});
  const [stateShare, setStateShare] = React.useState({});
  const handleOpenShare = (data) => {
    UPDATE_VIEW_MUSIC.mutate(data, {
      onSuccess: (res) => {
        DATA_GET_ALL_MUSIC.refetch();
      },
      onError: (err) => {
        console.log("err" + err);
      },
    });
    setModalDataShare(data);
    setOpenShare(true);
  };

  const handleCloseShare = () => setOpenShare(false);
  const handleShare = () => {
    setIsloading(true);
    CREATE_MUSIC_SHARE.mutate(modalDataShare, {
      onSuccess: (data) => {
        if (data.success) {
          alert(data.Message);
          setOpenShare(false);
          setIsloading(false);
          DATA_GET_ALL_MUSIC.refetch();
        }
      },
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSendComment = async ({ MusicID }) => {
    let formUpdateCMT = {
      userId: stateComment.userId, //User
      musicId: MusicID,
      content: stateComment.content,
    };
    await UPDATE_COMMENT_MUSIC.mutate(formUpdateCMT, {
      onSuccess: async (data) => {
        DATA_GET_ALL_MUSIC.refetch();
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
  const handleLike = (MusicID) => {
    let formLike = {
      userID: localStorage.getItem("id"), //user
      musicID: MusicID, //music //_id
    };
    UPDATE_LIKE_MUSIC.mutate(formLike, {
      onSuccess: (data) => {
        DATA_GET_ALL_MUSIC.refetch();
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
  // Sắp xếp mảng theo trường view
  return (
    <Box pl={2} pr={3}>
      <Box>
        <Typography variant="h5" mt={5} mb={3}>
          Top 6 bài hát được quan tâm nhiều nhất
        </Typography>
        <Slider {...settings}>
          <div style={{ display: "flex" }} className="cssSlider">
            {DATA_GET_ALL_MUSIC.data &&
              DATA_GET_ALL_MUSIC.data?.All_music.sort((a, b) => b.view - a.view)
                .slice(0, 3)
                .map((item, number) => (
                  <Card className="widthImportant">
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.picture}
                      alt="Paella dish"
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
                      {item.view}
                      <IconButton aria-label="add to favorites">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
          </div>
          <div style={{ display: "flex" }} className="cssSlider">
            {DATA_GET_ALL_MUSIC.data &&
              DATA_GET_ALL_MUSIC.data?.All_music.sort((a, b) => b.view - a.view)
                .slice(3, 6)
                .map((item, number) => (
                  <Card className="widthImportant">
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.picture}
                      alt="Paella dish"
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
                      {item.view}
                      <IconButton aria-label="add to favorites">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
          </div>
        </Slider>
      </Box>
      <Box mt={10}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h5" mt={3} mb={3}>
            Danh mục bài hát{" "}
          </Typography>
          {/* */}
        </Box>
        <Box sx={{ flexGrow: 1 }} pl={2}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {DATA_GET_ALL_MUSIC.data?.All_music.map((item, index) => (
              <Grid className="hover" item xs={2} sm={4} md={4} key={index}>
                <Card
                  sx={{ maxWidth: 345, minHeight: "345px", maxHeight: "345px" }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={item?.userID?.account_image}
                        aria-label="recipe"
                      ></Avatar>
                    }
                    title={item?.userID?.name || ""}
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

                        updateDate: item.updateDate,
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
                      sx={{ overflow: "hidden", width: "100%", height: "37px" }}
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
                    <IconButton>
                      <ShareIcon
                        onClick={() =>
                          handleOpenShare({
                            id: item.id,
                            picture: item.picture, // Replace with your image URL
                            name: item.name,
                            description: item.description,
                            mp3: item.mp3,
                            userID: localStorage.getItem("id"),
                          })
                        }
                      ></ShareIcon>
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
            <Box sx={style}>
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
            <Box sx={style}>
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
                          <Typography
                            display={"flex"}
                            width={"200px"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            color={""}
                            ml={5}
                          >
                            <Typography fontWeight={700}>
                              {" "}
                              {obj._id.name}{" "}
                            </Typography>
                            <Typography fontSize={".7rem"}>
                              {convertDatetime(obj.updateDate)}
                            </Typography>
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
          {/*Share */}
          <Modal
            open={openShare}
            onClose={handleCloseShare}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  sx={{ objectFit: "cover" }}
                  image={modalDataShare.picture}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {" "}
                    {modalDataShare.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {modalDataShare.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box mt={3}>
                {isloading ? (
                  <Button color="success" sx={{ backgroundColor: "yellow" }}>
                    Loading...
                  </Button>
                ) : (
                  <Button
                    onClick={handleShare}
                    color="success"
                    sx={{ backgroundColor: "wheat" }}
                  >
                    Chia sẻ bài hát này
                  </Button>
                )}
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};
export default Homepage;
