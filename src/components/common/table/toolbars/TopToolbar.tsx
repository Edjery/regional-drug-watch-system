import { Box } from "@mui/material";
import { MRT_RowData } from "material-react-table";
import AddNewItem from "./AddNewItem";
import ExportPageRows from "./ExportPageRows";
import ExportAllRows from "./ExportAllRows";
import IMaterialTableInstance from "../IMaterialTableInstance";

interface Props<T extends MRT_RowData> extends IMaterialTableInstance<T> {
  disableAdd?: boolean;
  disableExportPage?: boolean;
  disableExportRows?: boolean;
}

const TopToolbar = <T extends MRT_RowData>({
  table,
  disableAdd = false,
  disableExportPage = false,
  disableExportRows = false,
}: Props<T>) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem", flexWrap: "nowrap" }}>
      {!disableAdd && <AddNewItem table={table} />}
      {!disableExportPage && <ExportPageRows table={table} />}
      {!disableExportRows && <ExportAllRows table={table} />}
    </Box>
  );
};

export default TopToolbar;
