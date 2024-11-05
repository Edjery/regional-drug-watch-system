import { Button } from "@mui/material";
import { download, generateCsv } from "export-to-csv";
import { MRT_Row, MRT_RowData } from "material-react-table";
import csvConfig from "../../../../config/csvConfig";
import { toolbarStyle } from "../../../../values/styles";
import { DownloadIcon } from "../../../../values/icon";
import IMaterialTableInstance from "../IMaterialTableInstance";

const ExportPageRows = <T extends MRT_RowData>({ table }: IMaterialTableInstance<T>) => {
  const handleExportRows = (rows: MRT_Row<T>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <Button
      color="secondary"
      variant="contained"
      sx={toolbarStyle}
      startIcon={<DownloadIcon />}
      disabled={table.getRowModel().rows.length === 0}
      onClick={() => handleExportRows(table.getRowModel().rows)}
    >
      Export Current Data
    </Button>
  );
};

export default ExportPageRows;
