import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const DeleteConfirmationModal = ({ open, onDeleteConfirm, handleDeleteClose }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxWidth: "100%",
  };

  return (
    <Modal
      open={open}
      onClose={handleDeleteClose}
      aria-labelledby="delete-task-modal-title"
      aria-describedby="delete-task-modal-description"
    >
      <Box sx={{ ...style }}>
        <Typography id="delete-task-modal-title" variant="h6" gutterBottom>
          Are you sure you want to delete this task?
        </Typography>
        <Typography id="delete-task-modal-description" variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This action cannot be undone. Please confirm if you want to permanently delete this task.
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleDeleteClose}
            aria-label="Cancel Deletion"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: 2,
              borderColor: "grey.500",
              color: "grey.700",
              mr: 2,
              "&:hover": {
                borderColor: "grey.700",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: 2,
              backgroundColor: "#d32f2f", // Make the confirm button stand out
              color: "#fff",
              "&:hover": {
                backgroundColor: "#c62828",
              },
            }}
            onClick={onDeleteConfirm}
            aria-label="Confirm Deletion"
            autoFocus
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
