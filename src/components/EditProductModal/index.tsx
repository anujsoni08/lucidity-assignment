import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { lightGreen } from "@mui/material/colors";

import { Product } from "../../interfaces";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Product) => void;
  initialData: Product;
}

const renderEditProductForm = (editedData, handleInputChange) => (
  <Grid container spacing={2}>
    <Grid size={6}>
      <FormControl>
        <FormLabel htmlFor="category">Category</FormLabel>
        <TextField
          id="category"
          name="category"
          value={editedData.category || ""}
          onChange={handleInputChange}
          fullWidth
          disabled
        />
      </FormControl>
    </Grid>
    <Grid size={6}>
      <FormControl>
        <FormLabel htmlFor="price">Price</FormLabel>
        <TextField
          name="price"
          type="number"
          value={editedData.price || ""}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>
    </Grid>
    <Grid size={6}>
      <FormControl>
        <FormLabel htmlFor="quantity">Quantity</FormLabel>{" "}
        <TextField
          name="quantity"
          type="number"
          value={editedData.quantity || ""}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>
    </Grid>
    <Grid size={6}>
      <FormControl>
        <FormLabel htmlFor="value">Value</FormLabel>
        <TextField
          name="value"
          disabled
          value={editedData.value || ""}
          onChange={handleInputChange}
          fullWidth
        />
      </FormControl>
    </Grid>
  </Grid>
);

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [editedData, setEditedData] = useState(initialData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleSave = () => {
    const finalData = {
      ...editedData,
      value: editedData.price * editedData.quantity,
    };
    onSave(finalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <IconButton
        aria-label="close"
        className="close-icon"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon
          sx={{
            color: lightGreen[500],
            backgroundColor: "#161718",
            borderRadius: "0.5rem",
            padding: "0.5rem",
          }}
        />
      </IconButton>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>{editedData.name}</DialogContentText>
        {renderEditProductForm(editedData, handleInputChange)}
      </DialogContent>
      <DialogActions>
        <Button
          className="cancel-button"
          onClick={onClose}
          sx={{ color: "#a6e22e" }}
        >
          Cancel
        </Button>
        <Button
          className="save-button"
          onClick={handleSave}
          variant="contained"
          sx={{ backgroundColor: "#434541", color: "white" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
