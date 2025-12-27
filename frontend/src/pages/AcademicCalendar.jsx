import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   EVENT GENERATION LOGIC
   ========================= */
function generateAcademicEvents() {
  const rawEvents = [];

  const addRange = (startStr, endStr, title, type, desc) => {
    const start = new Date(startStr);
    const end = new Date(endStr);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      rawEvents.push({
        date: d.toISOString().split("T")[0],
        title,
        type,
        desc:
          desc ||
          (type === "exam" ? "Examination Period" : "Academic Break"),
      });
    }
  };

  // Exam & break ranges
  addRange("2026-02-10", "2026-02-18", "T1 Examinations", "exam");
  addRange("2026-03-01", "2026-03-08", "Student Vacation", "holiday");
  addRange("2026-03-24", "2026-04-02", "T2 Examinations", "exam");
  addRange("2026-05-11", "2026-05-26", "End Sem Examinations", "exam");
  addRange(
    "2026-05-27",
    "2026-07-22",
    "Summer Break",
    "holiday",
    "Enjoy your summer!"
  );

  // Single-day holidays
  const singleDays = [
    { date: "2026-01-14", title: "Makar Sankranti / Pongal" },
    { date: "2026-01-26", title: "Republic Day" },
    { date: "2026-03-04", title: "Holi" },
    { date: "2026-03-21", title: "Id-ul-Fitr" },
    { date: "2026-03-31", title: "Mahavir Jayanti" },
    { date: "2026-04-03", title: "Good Friday" },
    { date: "2026-04-14", title: "Vaisakhi / Tamil New Year" },
    { date: "2026-05-01", title: "Buddha Purnima" },
    { date: "2026-05-09", title: "Guru Rabindranath Birthday" },
    { date: "2026-07-16", title: "Rath Yatra" },
    { date: "2026-08-15", title: "Independence Day" },
    { date: "2026-08-26", title: "Onam" },
    { date: "2026-08-28", title: "Raksha Bandhan" },
    { date: "2026-09-04", title: "Janamashtami" },
    { date: "2026-09-14", title: "Ganesh Chaturthi" },
    { date: "2026-10-02", title: "Gandhi Jayanti" },
    { date: "2026-10-18", title: "Dusshera (Saptami)" },
    { date: "2026-10-20", title: "Dussehra (Mahanavmi)" },
    { date: "2026-11-01", title: "Deepavali" },
    { date: "2026-12-25", title: "Christmas" },
  ];

  singleDays.forEach((day) => {
    const existing = rawEvents.findIndex((e) => e.date === day.date);
    if (existing !== -1) {
      if (!rawEvents[existing].title.includes(day.title)) {
        rawEvents[existing].title += ` & ${day.title}`;
      }
    } else {
      rawEvents.push({
        ...day,
        type: "holiday",
        desc: "Public Holiday",
      });
    }
  });

  return rawEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
}

/* =========================
   COMPONENT
   ========================= */
export default function AcademicCalendar({ setView }) {
  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 1, 10)
  );

  const events = useMemo(generateAcademicEvents, []);

  const eventMap = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.date] = e;
    });
    return map;
  }, [events]);

  const getEventForDate = (dateObj) =>
    eventMap[dateObj.toISOString().split("T")[0]];

  const selectedEvent = getEventForDate(selectedDate);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col">
      {/* Calendar overrides */}
      <style>{`
        .rdp-button {
          border-radius: 100% !important;
          border: none !important;
        }
        .rdp-day_selected {
          background-color: var(--primary) !important;
          color: white !important;
        }
        .exam-day {
          border: 2px solid #ef4444 !important;
          color: #ef4444 !important;
          font-weight: bold;
        }
        .holiday-day {
          border: 2px solid #22c55e !important;
          color: #22c55e !important;
          font-weight: bold;
        }
        .rdp-button:hover:not([disabled]) {
          background-color: hsl(var(--secondary));
          border-radius: 100% !important;
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-5xl mx-auto w-full mb-8 flex items-center justify-between"
      >
        <button
          onClick={() => setView("home")}
          className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <CalendarIcon className="text-primary" strokeWidth={2.5} />
          Academic Calendar
        </h1>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Calendar */}
        <div className="lg:col-span-5">
          <div className="glass p-6 rounded-[2rem] border border-white/10 shadow-2xl">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(d) => d && setSelectedDate(d)}
              className="flex justify-center"
              classNames={{
                months: "w-full",
                month: "w-full space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button:
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                    "w-10 text-muted-foreground rounded-md font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                 cell: "h-10 w-10 text-center text-sm p-0 relative",
                 day: "h-10 w-10 p-0 font-medium",
                }}
              modifiers={{
                isExam: (d) => getEventForDate(d)?.type === "exam",
                isHoliday: (d) => getEventForDate(d)?.type === "holiday",
              }}
              modifiersClassNames={{
                isExam: "exam-day",
                isHoliday: "holiday-day",
              }}
            />

            <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-red-500" />
                Exams
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border-2 border-green-500" />
                Holidays
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 min-h-[180px] flex items-center">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key="event"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <span className="text-xs uppercase font-bold text-primary">
                    {selectedEvent.type}
                  </span>
                  <h2 className="text-3xl font-black mt-2">
                    {selectedEvent.title}
                  </h2>
                  <p className="text-muted-foreground mt-1 flex items-center gap-2">
                    <MapPin size={16} />
                    {selectedEvent.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center w-full"
                >
                  <Sparkles className="mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-xl font-bold">Nothing Scheduled</h3>
                  <p className="text-muted-foreground">
                    {selectedDate.toDateString()} is free 🎉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Upcoming */}
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
              <Clock size={18} className="text-primary" />
              Upcoming Events
            </h3>

            <div className="space-y-3">
              {events
                .filter((e) => new Date(e.date) >= new Date())
                .slice(0, 4)
                .map((evt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl border bg-card/30"
                  >
                    <div className="h-14 w-14 rounded-xl bg-secondary/50 flex flex-col items-center justify-center">
                      <span className="text-xs uppercase">
                        {new Date(evt.date).toLocaleString("en-US", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-xl font-black">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold">{evt.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {evt.desc}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}