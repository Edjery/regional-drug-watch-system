import { createTheme } from "@mui/material";
import { cabinFabric, cabinSundown, steadfastStainless } from "./colors";

export default createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: steadfastStainless.navyBlue
        },
        secondary: {
            main: steadfastStainless.midnightBlue
        },
        text: {
            primary: cabinSundown.cream,
            secondary: cabinFabric.mistyBlue
        }
    },
    typography: {
        fontFamily: '"Roboto", "Arial", sans-serif',
    },
});
