import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import { MRT_Row, MRT_RowData, MRT_TableInstance } from "material-react-table";
import { useState } from "react";
import ConfirmDialog from "../dialogs/ConfirmDialog";

export interface RowActionProps<T extends MRT_RowData> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  onDelete?: (id: number) => void;
  disableDelete?: boolean;
}

const RowActions = <T extends MRT_RowData>({
  row,
  table,
  onDelete,
  disableDelete = false,
}: RowActionProps<T>) => {
  const [openDelete, setDeleteOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedItemId(id);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setDeleteOpen(false);
    setSelectedItemId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItemId !== null) {
      handleClose();
      onDelete !== undefined && onDelete(selectedItemId);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {!disableDelete && (
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      <ConfirmDialog
        open={openDelete}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        title={`Confirm Deletion`}
        messagePrompt={`Are you sure you want to delete the item with the id: ${selectedItemId}?`}
      />
    </Box>
  );
};

export default RowActions;
