import theme from "./theme";
import { white } from "./colors";
import transparency from "./transparency";

export const betterScrollStyle = {
    overflow: "auto",
    "&::-webkit-scrollbar": {
        width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: `${white}${transparency[50]}`,
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
}

export const betterHoverStyle = {
    ":hover": { bgcolor: theme.palette.primary.light },
    transition: "background-color 0.2s ease-out",
};

export const toolbarStyle = {
    alignItems: "center",
    color: "white",
    ...betterHoverStyle,
};