import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";
import axios from "axios";
import NoteDialog from "./NoteDailog";

const localizer = momentLocalizer(moment);

function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const formattedEvents = response.data.map((note) => ({
        id: note._id,
        title: note.note,
        start: new Date(note.date),
        end: new Date(note.date),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setNote("");
    setSelectedNoteId(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedDate(event.start);
    setNote(event.title);
    setSelectedNoteId(event.id);
    setShowModal(true);
  };

  const handleSaveNote = async () => {
    try {
      if (selectedNoteId) {
        await axios.put(
          `http://localhost:5000/api/notes/${selectedNoteId}`,
          { date: selectedDate, note },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/notes",
          { date: selectedDate, note },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      fetchNotes();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${selectedNoteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchNotes();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* <Typography variant="h4">Your Calendar</Typography>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button> */}
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontWeight: "bold",
            }}
          >
            Stay Organized with Your Daily Notes
          </Typography>
        </Box>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 500,
            marginTop: "2rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />

        <NoteDialog
          showModal={showModal}
          setShowModal={setShowModal}
          selectedNoteId={selectedNoteId}
          note={note}
          setNote={setNote}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleSaveNote={handleSaveNote}
          handleDeleteNote={handleDeleteNote}
        />
      </Container>
    </>
  );
}

export default Home;
