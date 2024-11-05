import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import theme from "../../values/theme";

interface Props {
  title?: string;
  children?: ReactNode;
}

const GenericTable = ({ title, children }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        fontWeight: "bold",
        fontSize: "2rem",
        height: "90vh",
      }}
    >
      {title && (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            height: "10vh",
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default GenericTable;
