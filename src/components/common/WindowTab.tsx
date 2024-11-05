import { Box, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";
import { cabinFabric, white } from "../../values/colors";
import { betterScrollStyle } from "../../values/styles";
import transparency from "../../values/transparency";

interface Props {
  windowTitle?: string;
  children?: ReactNode;
  sx?: SxProps;
  sxText?: SxProps;
}

const WindowTab = ({ windowTitle = "", children, sx, sxText }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",

        height: "75vh",
        width: "75vh",

        mx: "auto",
        p: "20px",

        color: white,
        bgcolor: cabinFabric.mistyBlue + transparency[70],

        borderRadius: "10px",
        boxShadow: 3,

        ...betterScrollStyle,
        ...sx,
      }}
    >
      <Box width="100%">
        <Typography sx={{ textTransform: "uppercase", fontWeight: "bold", ...sxText }} variant="h6">
          {windowTitle}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default WindowTab;
