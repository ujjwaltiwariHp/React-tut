import { useState } from "react";
import { ChevronDown } from "lucide-react";

function CustomDropdown({ value, onChange, options, placeholder, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border
         border-gray-600 bg-gray-900/70 text-gray-100 focus:ring-2 focus:ring-purple-400
         focus:outline-none shadow-sm hover:bg-gray-800/70 transition-all"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-purple-400">{icon}</span>}
          <span className={value ? "text-gray-100" : "text-gray-400"}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border
         border-gray-600 rounded-xl shadow-2xl z-10 overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option)}
              className="w-full px-4 py-3 text-left text-gray-100 hover:bg-gradient-to-r hover:from-purple-600/20
              hover:to-pink-600/20 transition-all border-b border-gray-700 last:border-b-0"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;