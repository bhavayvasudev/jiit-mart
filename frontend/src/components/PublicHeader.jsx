import { ChartNoAxesCombined, ArrowLeft, Moon } from "lucide-react";

const PublicHeader = ({ showStatsButton = false, showBackButton = false, onBack }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md mx-auto px-4 py-3 sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left Side: Back & Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
          )}
          {/* Changed Name to JIITMart */}
          <h1 className="text-blue-900 text-2xl font-bold font-sans tracking-tight">JIITMart</h1>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-2">
          {showStatsButton && (
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChartNoAxesCombined size={20} className="text-gray-600" />
            </button>
          )}
          
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Moon size={20} className="text-gray-600" />
          </button>
          
          <div className="w-2"></div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;