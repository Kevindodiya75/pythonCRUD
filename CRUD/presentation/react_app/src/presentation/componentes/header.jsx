import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Badge,
    Avatar,
    Tooltip
} from "@mui/material";
import {
    Notifications as NotificationsIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    Search as SearchIcon
} from "@mui/icons-material";
import { useLayout } from "./layout";

const Header = () => {
    const { isOpen, toggleSidebar, drawerOpenWidth, drawerClosedWidth } = useLayout();

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                transition: "width 0.3s, margin 0.3s",
                width: {
                    xs: "100%",
                    sm: `calc(100% - ${isOpen ? drawerOpenWidth : drawerClosedWidth}px)`
                },
                ml: {
                    xs: 0,
                    sm: `${isOpen ? drawerOpenWidth : drawerClosedWidth}px`
                }
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleSidebar}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Dashboard
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex' }}>
                    <IconButton size="large" color="inherit">
                        <SearchIcon />
                    </IconButton>



                    <Tooltip title="Account">
                        <IconButton sx={{ ml: 1 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>A</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
