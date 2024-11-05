import { Box, Button, Dialog, Typography } from "@mui/material";
import WindowTab from "../../WindowTab";
interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  messagePrompt?: string;
}

const ConfirmDialog = ({ open, onClose, onConfirm, title = "Confirm action", messagePrompt = "" }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <WindowTab sx={{ height: "inherit" }}>
        <Typography variant="h6"> {title} </Typography>
        {messagePrompt && <Typography> {messagePrompt}</Typography>}
        <Box sx={{ mt: "2rem" }}>
          <Button onClick={onClose} color="info" variant="contained">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" sx={{ ml: 1 }} variant="contained">
            Delete
          </Button>
        </Box>
      </WindowTab>
    </Dialog>
  );
};

export default ConfirmDialog;
