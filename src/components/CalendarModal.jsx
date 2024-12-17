// src/components/CalendarModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

const CalendarModal = ({
  showModal,
  setShowModal,
  selectedDate,
  selectedNoteId,
  setNote,
  note,
  fetchNotes,
}) => {
  const handleSave = async () => {
    try {
      if (selectedNoteId) {
        // Update the existing note
        await axios.put(`${API_URL}/${selectedNoteId}`, {
          date: selectedDate,
          note,
        });
      } else {
        // Create a new note
        await axios.post(API_URL, { date: selectedDate, note });
      }
      fetchNotes(); // Refresh events
      setShowModal(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedNoteId}`);
      fetchNotes(); // Refresh events
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>
        {selectedNoteId ? "Update Note" : "Add Note"} for {selectedDate}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your Note"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)} color="secondary">
          Cancel
        </Button>
        {selectedNoteId && (
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        )}
        <Button onClick={handleSave} color="primary" variant="contained">
          {selectedNoteId ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
