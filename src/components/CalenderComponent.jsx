import React from "react";
import { Calendar } from "react-big-calendar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function CalendarComponent({
  localizer,
  events,
  handleSelectSlot,
  handleSelectEvent,
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          marginBottom: 20,
          border: "0.5px solid black",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          marginTop: "1.5rem",
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </DndProvider>
  );
}

export default CalendarComponent;
