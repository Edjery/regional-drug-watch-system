import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MRT_EditActionButtons, MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";
import { ReactNode } from "react";

interface Props<T extends MRT_RowData> {
  table: MRT_TableInstance<T>;
  row: MRT_Row<T>;
  internalEditComponents: ReactNode;
}

const EditItemDialog = <T extends MRT_RowData>({ table, row, internalEditComponents }: Props<T>) => {
  return (
    <>
      <DialogTitle variant="h3">Edit</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="icon" table={table} row={row} />
      </DialogActions>
    </>
  );
};

export default EditItemDialog;
