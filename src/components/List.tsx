import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../routes/helper";
import { betterScrollStyle } from "../values/styles";
import theme from "../values/theme";
import SuspectProfileManager from "./SuspectProfileManager";

const List = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: theme.palette.primary.light,
          ...betterScrollStyle,
          color: theme.palette.text.primary,
        }}
      >
        <Box>
          <Box
            sx={{
              px: "0.5rem",
              py: "1rem",
              bgcolor: theme.palette.primary.main,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                textAlign: "center",
              }}
            >
              Regional Drug Watch System
            </Typography>
          </Box>
          <Grid container sx={{ textAlign: "Center" }}>
            <Grid size={12} sx={{ height: "2rem" }} />
            <Grid size={12}>
              <Button onClick={() => navigate(getUrl("Form"))} variant="contained">
                Form
              </Button>
            </Grid>
            <Grid size={12} sx={{ height: "2rem" }} />
            <Grid size={12}>
              <SuspectProfileManager />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default List;
