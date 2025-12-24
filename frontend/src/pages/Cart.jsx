import { useState } from "react";
import { ArrowLeft, ShoppingBag, Minus, Plus, Trash2, MapPin, X, CreditCard, Banknote } from "lucide-react";

export default function Cart({
  cart, printFile, setPrintFile, updateQuantity, removeFromCart,
  savedLocations, setSavedLocations, selectedLocation, setSelectedLocation,
  paymentMode, setPaymentMode, placeOrder, loading, setView
}) {
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const itemTotal = cart.reduce((s, i) => s + (i.price * (i.qty || 1)), 0) + (printFile ? printFile.cost : 0);
  const grandTotal = itemTotal + 5;

  const handleSaveLocation = () => {
    if (!newLocation.trim()) return;
    setSavedLocations((p) => [...p, newLocation]);
    setSelectedLocation(newLocation);
    setNewLocation("");
    setIsAddingLocation(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto mt-6 pb-20">
        <button onClick={() => setView("home")} className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <h2 className="text-3xl font-bold mb-8 text-foreground">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Items & Location */}
          <div className="md:col-span-2 space-y-6">
            
            {/* 1. Items List */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <ShoppingBag size={18} /> Order Summary
              </h3>
              {cart.length === 0 && !printFile ? (
                <p className="text-muted-foreground text-sm">Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((i, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50">
                      <div>
                        <span className="text-foreground font-medium">{i.name}</span>
                        <p className="text-xs text-muted-foreground">₹{i.price} / unit</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Simple +/- controls for Cart View */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                          <button onClick={() => updateQuantity(idx, -1)} className="p-1 hover:bg-background rounded"><Minus size={14} /></button>
                          <span className="text-sm font-bold min-w-[20px] text-center">{i.qty || 1}</span>
                          <button onClick={() => updateQuantity(idx, 1)} className="p-1 hover:bg-background rounded"><Plus size={14} /></button>
                        </div>
                        <span className="text-sm font-semibold w-[60px] text-right">₹{i.price * (i.qty || 1)}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                  {printFile && (
                    <div className="flex justify-between items-center py-2 border-t border-dashed border-border mt-2">
                      <span className="text-foreground font-medium">Print: {printFile.filename}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">₹{printFile.cost}</span>
                        <button onClick={() => setPrintFile(null)} className="text-red-400"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Delivery Location */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <MapPin size={18} /> Delivery Location
              </h3>
              <div className="space-y-3 mb-4">
                {savedLocations.map((loc) => (
                  <div key={loc} onClick={() => setSelectedLocation(loc)} className={`cursor-pointer p-4 rounded-xl border flex justify-between items-center transition-all ${selectedLocation === loc ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted text-foreground border-transparent'}`}>
                    <span className="font-medium">{loc}</span>
                    {selectedLocation === loc && <span className="text-xs bg-background/20 px-2 py-1 rounded">Selected</span>}
                    <button onClick={(e) => { e.stopPropagation(); setSavedLocations(p => p.filter(l => l !== loc)); }} className="p-1 hover:text-red-400 text-muted-foreground"><X size={14} /></button>
                  </div>
                ))}
              </div>
              {!isAddingLocation ? (
                <button onClick={() => setIsAddingLocation(true)} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex items-center justify-center gap-2 font-medium">
                  <Plus size={18} /> Add New Location
                </button>
              ) : (
                <div className="flex gap-2 animate-in fade-in zoom-in-95">
                  <input type="text" placeholder="e.g. Hostel H1 - Room 202" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="flex-1 bg-muted px-4 py-3 rounded-xl outline-none text-foreground placeholder:text-muted-foreground" autoFocus />
                  <button onClick={handleSaveLocation} className="bg-primary text-primary-foreground px-6 rounded-xl font-bold">Save</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Payment & Bill */}
          <div className="md:col-span-1 space-y-6">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Payment</h3>
              <div className="space-y-3">
                <button onClick={() => setPaymentMode("upi")} className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${paymentMode === "upi" ? 'border-primary bg-primary/5' : 'border-border bg-transparent'}`}>
                  <CreditCard size={20} className={paymentMode === "upi" ? "text-primary" : "text-muted-foreground"} />
                  <div className="text-left"><p className={`font-bold ${paymentMode === "upi" ? "text-foreground" : "text-muted-foreground"}`}>UPI / Online</p><p className="text-xs text-muted-foreground">Google Pay, Paytm</p></div>
                </button>
                <button onClick={() => setPaymentMode("cash")} className={`w-full p-4 rounded-xl border flex items-center gap-3 transition-all ${paymentMode === "cash" ? 'border-primary bg-primary/5' : 'border-border bg-transparent'}`}>
                  <Banknote size={20} className={paymentMode === "cash" ? "text-primary" : "text-muted-foreground"} />
                  <div className="text-left"><p className={`font-bold ${paymentMode === "cash" ? "text-foreground" : "text-muted-foreground"}`}>Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay on receipt</p></div>
                </button>
                {paymentMode === "cash" && <div className="mt-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-600 text-xs font-medium">⚠️ Note: Cash orders cannot be cancelled.</div>}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Bill Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Item Total</span><span>₹{itemTotal}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>₹5</span></div>
                <div className="border-t border-border my-2 pt-2 flex justify-between text-lg font-bold text-foreground"><span>Grand Total</span><span>₹{grandTotal}</span></div>
              </div>
              <button onClick={placeOrder} disabled={loading || (cart.length === 0 && !printFile) || !selectedLocation} className="mt-6 w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-[0.98] flex justify-center items-center gap-2">
                {loading ? "Processing..." : `Pay ₹${grandTotal}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}