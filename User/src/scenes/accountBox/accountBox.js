import { Box } from "@mui/material";
import Login from "./LoginPage";
import Register from "./Register";
import { useLocation } from "react-router-dom";
const AccountBox = () => {
  const location = useLocation();

  return (
    <>
      <Box
        height={"100vh"}
        overflow={"hidden"}
        sx={{ backgroundColor: "white" }}
      >
        {location?.state ? <Register></Register> : <Login></Login>}
      </Box>
    </>
  );
};
export default AccountBox;
