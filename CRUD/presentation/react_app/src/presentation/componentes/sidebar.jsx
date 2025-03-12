import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Toolbar,
    Box,
    Typography,
    Divider,
    Avatar,
    Badge,
    Collapse
} from "@mui/material";
import {
    Menu as MenuIcon,
    ChevronLeft,
    Book as CoursesIcon,
    People as StudentsIcon,
    Person as TeacherIcon,
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    Notifications as NotificationsIcon,
    ExpandLess,
    ExpandMore,
    CalendarMonth,
    Assessment,
    Forum
} from "@mui/icons-material";
import { useLayout } from "./layout";

const Sidebar = () => {
    const { isOpen, toggleSidebar, drawerOpenWidth, drawerClosedWidth } = useLayout();
    const [openSubmenu, setOpenSubmenu] = useState("");
    const location = useLocation();

    const handleSubmenuToggle = (menu) => {
        setOpenSubmenu(openSubmenu === menu ? "" : menu);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const mainMenuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        {
            text: "Students",
            icon: <StudentsIcon />,
            submenu: true,
            submenuItems: [
                { text: "View All", path: "/students" },
                { text: "Add New", path: "/students/new" },
                // { text: "Attendance", path: "/students/attendance" },
            ]
        },
        {
            text: "Courses",
            icon: <CoursesIcon />,
            submenu: true,
            submenuItems: [
                { text: "All Courses", path: "/courses" },
                { text: "Add Course", path: "/courses/new" },
                // { text: "Categories", path: "/courses/categories" },
            ]
        },
        { text: "Teachers", icon: <TeacherIcon />, path: "/teachers" },
        // { text: "Calendar", icon: <CalendarMonth />, path: "/calendar" },
        // { text: "Reports", icon: <Assessment />, path: "/reports" },
        // { text: "Messages", icon: <Forum />, path: "/messages", badge: 5 },
    ];

    const bottomMenuItems = [
        // { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    return (
        <Drawer
            variant="permanent"
            open={isOpen}
            sx={{
                width: isOpen ? drawerOpenWidth : drawerClosedWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: isOpen ? drawerOpenWidth : drawerClosedWidth,
                    transition: "width 0.3s",
                    overflowX: "hidden",
                    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                    boxSizing: "border-box",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    bgcolor: "background.paper",
                    height: "100vh",
                    position: "fixed"
                },
                transition: "width 0.3s",
                display: { xs: isOpen ? "block" : "none", sm: "block" }
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                    minHeight: "64px"
                }}
            >
                {isOpen && (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", ml: 1 }}>
                            SchoolAdmin
                        </Typography>
                        <IconButton onClick={toggleSidebar}>
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                )}
                {!isOpen && (
                    <IconButton onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>

            <Divider />

            {isOpen && (
                <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main", mr: 2 }}>A</Avatar>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                            Admin User
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Administrator
                        </Typography>
                    </Box>
                </Box>
            )}

            <Divider sx={{ mb: 1 }} />

            <List sx={{ px: 1, flexGrow: 1, overflow: "auto" }}>
                {mainMenuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            {item.submenu ? (
                                <ListItemButton
                                    onClick={() => handleSubmenuToggle(item.text)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: isOpen ? "initial" : "center",
                                        px: 2.5,
                                        borderRadius: "8px",
                                        mb: 0.5,
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: isOpen ? 3 : "auto",
                                            justifyContent: "center",
                                            color: openSubmenu === item.text ? "primary.main" : "inherit"
                                        }}
                                    >
                                        {item.badge ? (
                                            <Badge badgeContent={item.badge} color="error">
                                                {item.icon}
                                            </Badge>
                                        ) : item.icon}
                                    </ListItemIcon>
                                    {isOpen && (
                                        <>
                                            <ListItemText
                                                primary={item.text}
                                                sx={{ color: openSubmenu === item.text ? "primary.main" : "inherit" }}
                                            />
                                            {openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />}
                                        </>
                                    )}
                                </ListItemButton>
                            ) : (
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={isActive(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: isOpen ? "initial" : "center",
                                        px: 2.5,
                                        borderRadius: "8px",
                                        mb: 0.5,
                                        bgcolor: isActive(item.path) ? "action.selected" : "transparent",
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: isOpen ? 3 : "auto",
                                            justifyContent: "center",
                                            color: isActive(item.path) ? "primary.main" : "inherit"
                                        }}
                                    >
                                        {item.badge ? (
                                            <Badge badgeContent={item.badge} color="error">
                                                {item.icon}
                                            </Badge>
                                        ) : item.icon}
                                    </ListItemIcon>
                                    {isOpen && (
                                        <ListItemText
                                            primary={item.text}
                                            sx={{ color: isActive(item.path) ? "primary.main" : "inherit" }}
                                        />
                                    )}
                                </ListItemButton>
                            )}
                        </ListItem>

                        {item.submenu && isOpen && (
                            <Collapse in={openSubmenu === item.text} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.submenuItems.map((subItem) => (
                                        <ListItemButton
                                            key={subItem.text}
                                            component={Link}
                                            to={subItem.path}
                                            selected={isActive(subItem.path)}
                                            sx={{
                                                pl: 6,
                                                py: 0.5,
                                                borderRadius: "8px",
                                                ml: 2,
                                                mb: 0.5,
                                                bgcolor: isActive(subItem.path) ? "action.selected" : "transparent",
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={subItem.text}
                                                primaryTypographyProps={{
                                                    variant: "body2",
                                                    color: isActive(subItem.path) ? "primary.main" : "inherit"
                                                }}
                                            />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>

            <Box sx={{ flexGrow: 0 }} />

            <Divider sx={{ mt: 1 }} />

            <List sx={{ px: 1 }}>
                {bottomMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={isActive(item.path)}
                            sx={{
                                minHeight: 48,
                                justifyContent: isOpen ? "initial" : "center",
                                px: 2.5,
                                borderRadius: "8px",
                                mb: 0.5,
                                bgcolor: isActive(item.path) ? "action.selected" : "transparent",
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpen ? 3 : "auto",
                                    justifyContent: "center",
                                    color: isActive(item.path) ? "primary.main" : "inherit"
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {isOpen && (
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: isActive(item.path) ? "primary.main" : "inherit" }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;