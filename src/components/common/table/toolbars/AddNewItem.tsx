import { Button } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import { AddIcon } from "../../../../values/icon";
import { toolbarStyle } from "../../../../values/styles";
import IMaterialTableInstance from "../IMaterialTableInstance";

const AddNewItem = <T extends MRT_RowData>({ table }: IMaterialTableInstance<T>) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      sx={toolbarStyle}
      startIcon={<AddIcon />}
      onClick={() => {
        table.setCreatingRow(true);
      }}
    >
      Add new
    </Button>
  );
};
export default AddNewItem;
