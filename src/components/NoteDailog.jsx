import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function NoteDialog({
  showModal,
  setShowModal,
  selectedNoteId,
  note,
  setNote,
  selectedDate,
  setSelectedDate,
  handleSaveNote,
  handleDeleteNote,
}) {
  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>{selectedNoteId ? "Edit Note" : "Add Note"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Note"
          fullWidth
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Date and Time"
            value={selectedDate ? new Date(selectedDate) : null}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(props) => <TextField {...props} fullWidth />}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        {selectedNoteId && (
          <Button onClick={handleDeleteNote} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={() => setShowModal(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveNote} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NoteDialog;
