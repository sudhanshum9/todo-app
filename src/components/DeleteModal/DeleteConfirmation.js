import React from "react";
import { Box, Button, Modal } from "@mui/material";

const DeleteConfirmationModal = ({ open, onDeleteConfirm, handleDeleteClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleDeleteClose}
                aria-labelledby="delete-task-modal-title"
                aria-describedby="delete-task-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <h2 id="delete-task-modal-title">Are you sure you want to delete the task?</h2>
                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            onClick={handleDeleteClose}
                            aria-label="Cancel Deletion"
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                backgroundColor: "#f0f0f0",
                                mr: 2
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                backgroundColor: "#d32f2f", // Make confirm more prominent
                                color: "#fff",
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
        </React.Fragment>
    );
};

export default DeleteConfirmationModal;
