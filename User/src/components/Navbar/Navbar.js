import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CHECK_ACCESS } from "../../api/handleCheckAccess";

const Navbar = () => {
  let nav = useNavigate();
  const CHECKACCESS = useQuery({
    queryKey: ["Access"],
    queryFn: async () => {
      const result = await CHECK_ACCESS();
      return result; // Ensure the result is returned
    },
  });

  const settings = ["Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="secondary" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MY-MUSIC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={"TT"} onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    nav("/homepage");
                  }}
                  textAlign="center"
                >
                  Trang chủ
                </Typography>
              </MenuItem>
              {CHECKACCESS.data?.success ? (
                <>
                  {" "}
                  <MenuItem key={"AD"} onClick={handleCloseNavMenu}>
                    <Typography
                      onClick={() => {
                        nav("/my-music");
                      }}
                      textAlign="center"
                    >
                      Danh sách nhạc của tôi{" "}
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                ""
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={"TT"}
              onClick={() => {
                nav("/homepage");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Trang chủ
            </Button>
            <Button
              key={"TT"}
              onClick={() => {
                nav("/my-music");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Danh sách nhạc của tôi
            </Button>
            {CHECKACCESS.data?.success ? (
              <>
                {" "}
                <Button
                  key={"AD"}
                  onClick={() => {
                    nav("/admin");
                  }}
                  sx={{ my: 2, color: "red", display: "block" }}
                >
                  ADMIN
                </Button>
              </>
            ) : (
              ""
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography mr={3} fontSize={"1rem"} color={"white"}>
                  {localStorage.getItem("name")}
                </Typography>
                <Avatar alt="Remy Sharp" src={localStorage.getItem("avt")} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"edit"} onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => {
                    nav("/edit-user");
                  }}
                  textAlign="center"
                  width={"100%"}
                >
                  Chỉnh sửa thông tin
                </Typography>
              </MenuItem>
              <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                <Typography
                  onClick={() => {
                    nav("/");
                    localStorage.clear();
                  }}
                  textAlign="center"
                  width={"100%"}
                >
                  Đăng xuất
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
