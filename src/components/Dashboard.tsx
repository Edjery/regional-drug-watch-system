import { Box, Grid2 as Grid, Typography } from "@mui/material";
import theme from "../values/theme";
import { betterScrollStyle } from "../values/styles";
import WindowTab from "./common/WindowTab";
import SuspectProfileForm from "./SuspectProfileForm";

const Dashboard = () => {
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
          <Grid size={12} sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Suspect Profile Form
          </Grid>
          <Grid size={12} sx={{ height: "2rem" }} />
          <Grid size={12}>
            <WindowTab sx={{ height: "inherit" }}>
              <SuspectProfileForm />
            </WindowTab>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
