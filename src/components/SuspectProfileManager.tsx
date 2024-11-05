import { Box, Button, Typography, Grid2 as Grid } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import suspectProfileSchema, { TSuspectProfile } from "../schema/suspectProfileSchema";
import GenericService from "../service/genericService";
import GenericTable from "./common/GenericTable";
import genericReactTable from "./common/table/genericReactTable";
import ITableColumn from "./common/table/ITableColumn";
import { betterScrollStyle } from "../values/styles";
import theme from "../values/theme";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../routes/helper";

const suspectProfileColumns: ITableColumn[] = [
  {
    key: "id",
    label: "ID",
    enableEdit: false,
    width: 80,
  },
  {
    key: "lastName",
    label: "Last Name",
    enableEdit: true,
  },
  {
    key: "firstName",
    label: "First Name",
    enableEdit: true,
  },
  {
    key: "middleName",
    label: "Middle Name",
    enableEdit: true,
  },
  {
    key: "dateOfBirth",
    label: "Date of Birth",
    enableEdit: false,
    isHidden: false,
  },
  {
    key: "addressStreet",
    label: "Street",
    enableEdit: true,
  },
  {
    key: "addressBarangay",
    label: "Barangay",
    enableEdit: true,
  },
  {
    key: "addressCityMunicipality",
    label: "City/Municipality",
    enableEdit: true,
  },
  {
    key: "addressProvince",
    label: "Province",
    enableEdit: true,
  },
  {
    key: "addressRegion",
    label: "Region",
    enableEdit: true,
  },
  {
    key: "mobileNo",
    label: "Mobile No",
    enableEdit: true,
  },
  {
    key: "telephoneNo",
    label: "Telephone No",
    enableEdit: true,
  },
  {
    key: "status",
    label: "Status",
    enableEdit: true,
    editType: "select",
    selectOptions: ["Active", "Inactive"],
  },
  {
    key: "sex",
    label: "Sex",
    enableEdit: true,
    editType: "select",
    selectOptions: ["Male", "Female", "Other"],
  },
  {
    key: "createdAt",
    label: "Created At",
    enableEdit: false,
    isHidden: true,
  },
  {
    key: "updatedAt",
    label: "Updated At",
    enableEdit: false,
    isHidden: true,
  },
  {
    key: "id",
    label: "Age",
    enableEdit: false,
    isHidden: true,
  },
];

const SuspectProfileManager = () => {
  const navigate = useNavigate();
  const apiService = new GenericService<TSuspectProfile>("SuspectProfile", "SuspectProfile");
  const table = genericReactTable<TSuspectProfile>(suspectProfileColumns, suspectProfileSchema, apiService);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          bgcolor: theme.palette.primary.light,
          ...betterScrollStyle,
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
              <GenericTable title="Suspect Profiles">
                <MaterialReactTable table={table} />
              </GenericTable>
            </Grid>

            <Grid size={12} sx={{ height: "2rem" }} />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SuspectProfileManager;
