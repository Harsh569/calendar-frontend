import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const API_URL = "http://localhost:5000/api/notes";

function useNotes() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeaders());
      const mappedEvents = response.data.map((note) => ({
        title: note.note,
        start: new Date(note.date),
        end: new Date(note.date),
        id: note._id,
      }));
      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const localDate = format(slotInfo.start, "yyyy-MM-dd'T'HH:mm:ss");
    setSelectedDate(localDate);
    setNote("");
    setSelectedNoteId(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedDate(format(event.start, "yyyy-MM-dd'T'HH:mm:ss"));
    setNote(event.title);
    setSelectedNoteId(event.id);
    setShowModal(true);
  };

  const handleSaveNote = async () => {
    const noteData = {
      date: selectedDate,
      note,
    };

    if (selectedNoteId) {
      try {
        await axios.put(
          `${API_URL}/${selectedNoteId}`,
          noteData,
          getAuthHeaders()
        );
        fetchNotes();
        setShowModal(false);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        await axios.post(API_URL, noteData, getAuthHeaders());
        fetchNotes();
        setShowModal(false);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleDeleteNote = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedNoteId}`, getAuthHeaders());
      fetchNotes();
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return {
    events,
    selectedDate,
    setSelectedDate,
    note,
    setNote,
    showModal,
    setShowModal,
    selectedNoteId,
    handleSelectSlot,
    handleSelectEvent,
    handleSaveNote,
    handleDeleteNote,
  };
}

export default useNotes;
