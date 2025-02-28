import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import ColorModeIconDropdown from "../Brand/Theme/ColorModeIconDropdown";
import Sitemark from "../Brand/SitemarkIcon";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: `rgba(${theme.palette.background.default} / 0.4)`,
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));


export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Site Logo & Menu Items */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex", textDecoration: "none" }, border: "none" }}>
              <Button href="/portfolio" variant="text" color="primary" size="small">
                Portfolio
              </Button>
              <Button href="/blog" variant="text" color="info" size="small">
                Blog
              </Button>
              <Button href="/about" variant="text" color="info" size="small">
                About
              </Button>
              <Button href="/contact" variant="text" color="info" size="small">
                Contact
              </Button>
            </Box>
          </Box>

          {/* Search & Light Mode Toggle (Side-by-Side on Desktop) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {/* Search Button */}
            <IconButton color="primary" size="medium" onClick={handleSearchOpen}>
              <SearchIcon />
            </IconButton>
            {/* Theme Toggle */}
            <ColorModeIconDropdown />
          </Box>

          {/* Search Modal */}
          <Modal
            open={searchOpen}
            onClose={handleSearchClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Search Placeholder
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This will be replaced with site search functionality.
              </Typography>
            </Box>
          </Modal>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: "var(--template-frame-height, 0px)",
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <MenuItem sx={{fontSize: 16}} href="/portfolio">Portfolio</MenuItem>
          <MenuItem sx={{fontSize: 16}} href="/blog">Blog</MenuItem>
          <MenuItem sx={{fontSize: 16}} href="/about">About</MenuItem>
          <MenuItem sx={{fontSize: 16}} href="/contact">Contact</MenuItem>
          <Divider sx={{ my: 3 }} />

          {/* Search & Light Mode Toggle (At Bottom in Mobile Menu) */}
          <MenuItem>
            <IconButton color="primary" onClick={handleSearchOpen} >
              <SearchIcon />
            </IconButton>
          </MenuItem>

          <Divider sx={{ my: 2 }} />

          {/* Sign In / Sign Up */}
          <MenuItem>
          <ColorModeIconDropdown />
          </MenuItem>
        </Box>
      </Drawer>
    </AppBar>
  );
}