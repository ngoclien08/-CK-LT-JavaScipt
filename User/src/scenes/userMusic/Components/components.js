import { Typography } from "@mui/material";
import styled from "styled-components";
import ReactAudioPlayer from "react-audio-player";
export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: #333;
`;
export const columns = [
  { field: "name", headerName: "Tên", flex: 1 },
  { field: "description", headerName: "Mô tả", flex: 1 },
  {
    field: "picture",
    headerName: "Hình ảnh",
    flex: 1,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Hình ảnh"
        style={{ width: "70%", height: "auto", objectFit: "cover" }}
      />
    ),
  },
  {
    field: "view",
    headerName: "Lượt xem",

    flex: 1,
  },
  {
    field: "ArrayLike",
    headerName: "Lượt thích",
    flex: 1,
    renderCell: (params) => <Typography>{params?.value.length}</Typography>,
  },

  {
    field: "mp3",
    headerName: "Phát nhạc",
    flex: 2,
    renderCell: (params) => <ReactAudioPlayer src={params.value} controls />,
  },
];
export const columns_category = [{ field: "name", headerName: "Tên", flex: 1 }];
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  pt: 2,
  px: 4,
  pb: 3,
};
export const ErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;
export const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;
