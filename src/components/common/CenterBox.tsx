import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { betterScrollStyle } from "../../values/styles";

interface Props {
  children?: ReactNode;
  sx?: SxProps;
}

const CenterBox = ({ children, sx }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        ...betterScrollStyle,
        ...sx,
      }}
    >
      <Box width="100%">{children}</Box>
    </Box>
  );
};

export default CenterBox;
