import { ArrowLeft, Printer } from "lucide-react";

export default function Print({ handleFileUpload, loading, setView }) {
  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto mt-10">
         <button onClick={() => setView("home")} className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="glass rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Upload Document</h2>
          <label className="cursor-pointer block w-full rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-10 hover:bg-white/10 transition-all">
            <input type="file" className="hidden" accept="application/pdf" onChange={handleFileUpload} />
            <Printer className="mx-auto mb-4 text-foreground/50" size={48} />
            <span className="text-sm font-medium text-foreground">Click to upload PDF</span>
          </label>
          {loading && <p className="mt-6 text-sm animate-pulse text-primary">Uploading...</p>}
        </div>
      </div>
    </div>
  );
}