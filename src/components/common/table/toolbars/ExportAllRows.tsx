import { Button } from "@mui/material";
import { download, generateCsv } from "export-to-csv";
import { MRT_Row, MRT_RowData } from "material-react-table";
import csvConfig from "../../../../config/csvConfig";
import { DownloadIcon } from "../../../../values/icon";
import { toolbarStyle } from "../../../../values/styles";
import IMaterialTableInstance from "../IMaterialTableInstance";

const ExportAllRows = <T extends MRT_RowData>({ table }: IMaterialTableInstance<T>) => {
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
      disabled={table.getPrePaginationRowModel().rows.length === 0}
      onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
    >
      Export All Rows
    </Button>
  );
};

export default ExportAllRows;
