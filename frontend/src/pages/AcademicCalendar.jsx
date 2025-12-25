import { useState, useMemo } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Sparkles } from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";

export default function AcademicCalendar({ setView }) {
  const [date, setDate] = useState(new Date(2026, 1, 10)); 

  // --- DATA LOGIC ---
  const events = useMemo(() => {
    const rawEvents = [];
    const addRange = (startStr, endStr, title, type, desc) => {
      const start = new Date(startStr);
      const end = new Date(endStr);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        rawEvents.push({
          date: d.toISOString().split("T")[0],
          title,
          type,
          desc: desc || (type === "exam" ? "Examination Period" : "Academic Break")
        });
      }
    };

    // 1. RANGES
    addRange("2026-02-10", "2026-02-18", "T1 Examinations", "exam");
    addRange("2026-03-01", "2026-03-08", "Student Vacation", "holiday");
    addRange("2026-03-24", "2026-04-02", "T2 Examinations", "exam");
    addRange("2026-05-11", "2026-05-26", "End Sem Examinations", "exam");
    addRange("2026-05-27", "2026-07-22", "Summer Break", "holiday", "Enjoy your summer!");

    // 2. HOLIDAYS
    const singleDays = [
      { date: "2026-01-14", title: "Makar Sankranti / Pongal", type: "holiday" },
      { date: "2026-01-26", title: "Republic Day", type: "holiday" },
      { date: "2026-03-04", title: "Holi", type: "holiday" },
      { date: "2026-03-21", title: "Id-ul-Fitr", type: "holiday" },
      { date: "2026-03-31", title: "Mahavir Jayanti", type: "holiday" },
      { date: "2026-04-03", title: "Good Friday", type: "holiday" },
      { date: "2026-04-14", title: "Vaisakhi / Tamil New Year", type: "holiday" },
      { date: "2026-05-01", title: "Buddha Purnima", type: "holiday" },
      { date: "2026-05-09", title: "Guru Rabindranath Birthday", type: "holiday" },
      { date: "2026-07-16", title: "Rath Yatra", type: "holiday" },
      { date: "2026-08-15", title: "Independence Day", type: "holiday" },
      { date: "2026-08-26", title: "Onam", type: "holiday" },
      { date: "2026-08-28", title: "Raksha Bandhan", type: "holiday" },
      { date: "2026-09-04", title: "Janamashtami", type: "holiday" },
      { date: "2026-09-14", title: "Ganesh Chaturthi", type: "holiday" },
      { date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
      { date: "2026-10-18", title: "Dusshera (Saptami)", type: "holiday" },
      { date: "2026-10-20", title: "Dussehra (Mahanavmi)", type: "holiday" },
      { date: "2026-11-01", title: "Deepavali", type: "holiday" },
      { date: "2026-12-25", title: "Christmas", type: "holiday" },
    ];

    singleDays.forEach(day => {
      const existing = rawEvents.findIndex(e => e.date === day.date);
      if (existing !== -1) {
        if (!rawEvents[existing].title.includes(day.title)) rawEvents[existing].title += ` & ${day.title}`;
      } else {
        rawEvents.push({ ...day, desc: "Public Holiday" });
      }
    });
    return rawEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  const getEventForDate = (d) => {
    const dateStr = d.toISOString().split("T")[0];
    return events.find((e) => e.date === dateStr);
  };

  const selectedEvent = getEventForDate(date);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col">
      {/* OVERRIDE STYLES: 
         1. Force all calendar buttons to be circles.
         2. Remove any default square borders.
         3. Ensure the event border (red/green) is the ONLY border.
      */}
      <style>{`
        .rdp-button { 
          border-radius: 100% !important; 
          border: none !important;
        }
        .rdp-day_selected { 
          background-color: var(--primary) !important; 
          color: white !important;
        }
        /* Custom Event Modifiers */
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
        /* Fix hover shape */
        .rdp-button:hover:not([disabled]) {
          background-color: hsl(var(--secondary));
          border-radius: 100% !important;
        }
      `}</style>

      {/* HEADER */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-5xl mx-auto w-full mb-8 flex items-center justify-between">
        <button onClick={() => setView("home")} className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all">
          <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"><ArrowLeft size={20} /></div>
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-3"><CalendarIcon className="text-primary" strokeWidth={2.5} /> Academic Calendar</h1>
      </motion.div>

      {/* CONTENT */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Calendar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              className="rounded-xl w-full flex justify-center"
              classNames={{
                head_cell: "text-muted-foreground font-medium text-sm pt-4 pb-2",
                cell: "h-10 w-10 text-center text-sm p-0 relative",
                day: "h-10 w-10 p-0 font-medium", // styling handled by <style> tag above
              }}
              modifiers={{
                isExam: (d) => getEventForDate(d)?.type === 'exam',
                isHoliday: (d) => getEventForDate(d)?.type === 'holiday',
              }}
              modifiersClassNames={{
                isExam: "exam-day",
                isHoliday: "holiday-day"
              }}
            />
            
            <div className="mt-6 flex justify-center gap-6 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-red-500" /> Exams</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full border-2 border-green-500" /> Holidays</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 relative overflow-hidden min-h-[180px] flex flex-col justify-center">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
             <AnimatePresence mode="wait">
               {selectedEvent ? (
                 <motion.div key="event" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                   <div className="flex items-start justify-between mb-2">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${selectedEvent.type === 'exam' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>{selectedEvent.type}</span>
                     <span className="text-sm font-medium text-muted-foreground">{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight">{selectedEvent.title}</h2>
                   <p className="text-lg text-muted-foreground flex items-center gap-2"><MapPin size={16} /> {selectedEvent.desc}</p>
                 </motion.div>
               ) : (
                 <motion.div key="no-event" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center text-center py-4">
                   <div className="h-16 w-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4"><Sparkles className="text-muted-foreground" size={24} /></div>
                   <h3 className="text-xl font-bold text-foreground">Nothing Scheduled</h3>
                   <p className="text-muted-foreground">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} is a free day!</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 px-2"><h3 className="text-lg font-bold flex items-center gap-2"><Clock size={18} className="text-primary" /> Upcoming Events</h3></div>
            <div className="space-y-3">
              {events.filter(e => new Date(e.date) >= new Date()).filter((e, i, arr) => i === 0 || e.title !== arr[i-1].title).slice(0, 4).map((evt, i) => (
                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all cursor-default hover:bg-white/5">
                  <div className="flex flex-col items-center justify-center h-14 w-14 rounded-xl bg-secondary/50 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{new Date(evt.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-xl font-black text-foreground leading-none">{new Date(evt.date).getDate()}</span>
                  </div>
                  <div className="flex-1"><h4 className="font-bold text-foreground">{evt.title}</h4><p className="text-xs text-muted-foreground">{evt.desc}</p></div>
                  <div className={`h-3 w-3 rounded-full border-2 ${evt.type === 'exam' ? 'border-red-500 bg-red-500/20' : 'border-green-500 bg-green-500/20'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}