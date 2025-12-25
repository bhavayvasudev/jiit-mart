import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "../components/ui/calendar"; 

export default function AcademicCalendar({ setView }) {
  const [date, setDate] = useState(new Date());

  // Hardcoded Event Data
  const events = [
    { date: "2025-01-14", title: "Makar Sankranti", type: "holiday" },
    { date: "2025-01-26", title: "Republic Day", type: "holiday" },
    { date: "2025-02-24", title: "T1 Examinations Start", type: "exam" },
    { date: "2025-03-01", title: "T1 Examinations End", type: "exam" },
    { date: "2025-03-25", title: "Holi Break", type: "holiday" },
  ];

  const getEventForDate = (d) => {
    const dateStr = d.toISOString().split("T")[0];
    return events.find((e) => e.date === dateStr);
  };

  const selectedEvent = getEventForDate(date);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => setView("home")}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <h2 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
          <CalendarIcon className="text-primary" /> Academic Calendar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar UI */}
          <div className="glass rounded-3xl p-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none"
              modifiers={{ event: (d) => !!getEventForDate(d) }}
              modifiersStyles={{
                event: { fontWeight: "bold", color: "var(--primary)", textDecoration: "underline" },
              }}
            />
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 min-h-[200px]">
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              
              {selectedEvent ? (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    selectedEvent.type === 'exam' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {selectedEvent.type}
                  </span>
                  <p className="mt-4 text-2xl font-bold">{selectedEvent.title}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No events scheduled for this day.</p>
              )}
            </div>

            {/* Upcoming List */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Clock size={18} /> Upcoming
              </h3>
              <div className="space-y-3">
                {events.slice(0, 3).map((evt, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium">{evt.title}</span>
                    <span className="text-xs text-muted-foreground">{evt.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}