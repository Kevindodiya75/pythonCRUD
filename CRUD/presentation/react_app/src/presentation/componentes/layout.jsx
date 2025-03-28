import React, { useState, useEffect, createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

export const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

// Reducing drawer width slightly to make content closer
const drawerOpenWidth = 230;
const drawerClosedWidth = 65;

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false);
            } else if (window.innerWidth > 1200) {
                setIsOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <LayoutContext.Provider value={{ isOpen, toggleSidebar, drawerOpenWidth, drawerClosedWidth }}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <Header />
                <Sidebar />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        width: {
                            xs: "100%",
                            // Adding a negative margin to pull content closer to sidebar
                            sm: `calc(100% - ${isOpen ? drawerOpenWidth - 10 : drawerClosedWidth - 5}px)`
                        },
                        ml: {
                            xs: 0,
                            // Adding a negative margin to pull content closer to sidebar
                            sm: `${isOpen ? drawerOpenWidth - 10 : drawerClosedWidth - 5}px`
                        },
                        transition: "margin-left 0.3s, width 0.3s",
                    }}
                >
                    <Toolbar />
                    <Box
                        sx={{
                            flexGrow: 1,
                            // Minimized padding to reduce the gap
                            p: { xs: 0.5, sm: 1 },
                            pl: { xs: 0.5, sm: 0.5 }, // Even smaller padding on the left
                            maxWidth: "100%",
                            overflowX: "auto"
                        }}
                    >
                        {children}
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </LayoutContext.Provider>
    );
};

export default Layout;
