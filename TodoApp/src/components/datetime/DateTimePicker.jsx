import { useState } from "react";
import { Calendar, Watch, ChevronDown } from "lucide-react";

function DateTimePicker({ date, time, onDateChange, onTimeChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "Select Time";
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeStr);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border
           border-gray-600 bg-gray-900/70 text-gray-100 focus:ring-2 focus:ring-indigo-400
           focus:outline-none shadow-sm hover:bg-gray-800/70 transition-all"
        >
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span className={date ? "text-gray-100" : "text-gray-400"}>
              {formatDate(date)}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDatePicker ? "rotate-180" : ""}`} />
        </button>

        {showDatePicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-600 rounded-xl shadow-2xl z-20 p-4">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                onDateChange(e.target.value);
                setShowDatePicker(false);
              }}
              className="w-full rounded-lg border border-gray-600 bg-gray-800 py-2 px-3
               text-gray-100 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      <div className="relative flex-1">
        <button
          type="button"
          onClick={() => setShowTimePicker(!showTimePicker)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border
           border-gray-600 bg-gray-900/70 text-gray-100 focus:ring-2 focus:ring-green-400
           focus:outline-none shadow-sm hover:bg-gray-800/70 transition-all"
        >
          <div className="flex items-center space-x-2">
            <Watch className="w-4 h-4 text-green-400" />
            <span className={time ? "text-gray-100" : "text-gray-400"}>
              {formatTime(time)}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showTimePicker ? "rotate-180" : ""}`} />
        </button>

        {showTimePicker && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border
           border-gray-600 rounded-xl shadow-2xl z-20 max-h-60 overflow-y-auto">
            {timeOptions.map((timeOption) => (
              <button
                key={timeOption}
                type="button"
                onClick={() => {
                  onTimeChange(timeOption);
                  setShowTimePicker(false);
                }}
                className="w-full px-4 py-3 text-left text-gray-100 hover:bg-gradient-to-r
                 hover:from-green-600/20 hover:to-blue-600/20 transition-all border-b border-gray-700 last:border-b-0"
              >
                {formatTime(timeOption)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DateTimePicker;