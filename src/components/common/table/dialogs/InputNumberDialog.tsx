import { Box, Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import WindowTab from "../../WindowTab";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: number | null) => void;
  label?: string;
}

const InputNumberDialog = ({ open, onClose, onConfirm, label }: Props) => {
  const [inputPrice, setInputPrice] = useState<number | null>(null);

  const handleConfirm = () => {
    onConfirm && onConfirm(inputPrice);
    setInputPrice(null);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <WindowTab sx={{ height: "inherit", width: "inherit" }}>
        <Box sx={{ display: "flex" }}>
          <Button onClick={onClose} color="primary" variant="contained">
            Cancel
          </Button>
          <TextField
            label={label}
            type="number"
            onChange={(event) => setInputPrice(parseFloat(event.target.value))}
            sx={{ mx: "1rem" }}
          />
          <Button onClick={handleConfirm} color="secondary" variant="contained">
            Confirm
          </Button>
        </Box>
      </WindowTab>
    </Dialog>
  );
};

export default InputNumberDialog;
