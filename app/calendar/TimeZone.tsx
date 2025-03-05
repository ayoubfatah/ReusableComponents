"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const timezones = [
  { name: "Coordinated Universal Time ", offset: 0 },
  { name: "Eastern Standard Time ", offset: -5 },
  { name: "Pacific Standard Time ", offset: -8 },
  { name: "Central Standard Time ", offset: -6 },
  { name: "Alaska Standard Time ", offset: -9 },
  { name: "Hawaii Standard Time ", offset: -10 },
  { name: "Greenwich Mean Time ", offset: 0 },
  { name: "Central European Time ", offset: 1 },
  { name: "Eastern European Time ", offset: 2 },
  { name: "Moscow Standard Time ", offset: 3 },
  { name: "Gulf Standard Time ", offset: 4 },
  { name: "Pakistan Standard Time ", offset: 5 },
  { name: "Indian Standard Time ", offset: 5.5 },
  { name: "Bangladesh Standard Time ", offset: 6 },
  { name: "Indochina Time ", offset: 7 },
  { name: "China Standard Time ", offset: 8 },
  { name: "Japan Standard Time ", offset: 9 },
  { name: "Australian Eastern Standard Time ", offset: 10 },
  { name: "New Zealand Standard Time ", offset: 12 },
  { name: "Brasilia Standard Time ", offset: -3 },
];

type Time = { name: string; offset: number };
type TimezoneSelector = {
  selectedTimezone: Time;
  setSelectedTimezone: React.Dispatch<React.SetStateAction<Time>>;
};

const TimezoneSelector = ({
  selectedTimezone,
  setSelectedTimezone,
}: TimezoneSelector) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectTimezone = (timezone: Time) => {
    setSelectedTimezone(timezone);
    setIsOpen(false);
  };

  // Format time with AM/PM
  const formatTimeWithAmPm = (date: Date) => {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get current time for selected timezone
  const getCurrentTimeForTimezone = () => {
    const now = new Date();
    const localTime = new Date(
      now.getTime() + selectedTimezone.offset * 3600000
    );
    return formatTimeWithAmPm(localTime);
  };

  return (
    <div className="!w-[400px] mx-auto bg-white ">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Time Zone</h2>

      {/* Timezone Dropdown */}
      <div className="flex items-center gap-1">
        <span>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.9825 0.442715C6.01877 0.442715 5.11414 0.624551 4.2686 0.988222C3.41397 1.35189 2.67072 1.84967 2.03884 2.48155C1.40696 3.11343 0.90918 3.85668 0.545508 4.71131C0.181836 5.55685 0 6.46148 0 7.42521C0 8.38895 0.181836 9.29358 0.545508 10.1391C0.90918 10.9937 1.40696 11.737 2.03884 12.3689C2.67072 13.0008 3.41397 13.4985 4.2686 13.8622C5.11414 14.2259 6.01877 14.4077 6.9825 14.4077C7.94623 14.4077 8.85087 14.2259 9.6964 13.8622C10.551 13.4985 11.2943 13.0008 11.9262 12.3689C12.558 11.737 13.0558 10.9937 13.4195 10.1391C13.7832 9.29358 13.965 8.38895 13.965 7.42521C13.965 6.46148 13.7832 5.55685 13.4195 4.71131C13.0558 3.85668 12.558 3.11343 11.9262 2.48155C11.2943 1.84967 10.551 1.35189 9.6964 0.988222C8.85087 0.624551 7.94623 0.442715 6.9825 0.442715ZM6.28698 12.9621C5.596 12.8803 4.95503 12.6757 4.36406 12.3484C3.764 12.0302 3.24577 11.6256 2.80937 11.1347C2.37296 10.6437 2.02747 10.08 1.7729 9.44359C1.51833 8.80717 1.39104 8.13438 1.39104 7.42521C1.39104 7.20701 1.40468 6.99335 1.43196 6.78424C1.45923 6.57513 1.4956 6.37057 1.54106 6.17055L4.8823 9.52542V10.2209C4.8823 10.6028 5.01867 10.9301 5.29143 11.2029C5.56418 11.4756 5.89603 11.612 6.28698 11.612V12.9621ZM11.1011 11.1892C11.0102 10.9074 10.8442 10.6755 10.6033 10.4937C10.3624 10.3119 10.0873 10.2209 9.77823 10.2209H9.08271V8.12074C9.08271 7.92981 9.01452 7.76616 8.87814 7.62978C8.74176 7.4934 8.57357 7.42521 8.37355 7.42521H4.18677V6.03417H5.59146C5.78238 6.03417 5.94604 5.96598 6.08241 5.8296C6.21879 5.69323 6.28698 5.52503 6.28698 5.32501V3.93396H7.67802C8.06897 3.93396 8.40082 3.79759 8.67357 3.52483C8.94633 3.25208 9.08271 2.92478 9.08271 2.54292V2.24289C9.59185 2.452 10.0601 2.7293 10.4874 3.07479C10.9147 3.42028 11.2829 3.81804 11.592 4.26809C11.9012 4.71813 12.1421 5.21136 12.3148 5.74778C12.4876 6.2751 12.574 6.83425 12.574 7.42521C12.574 8.15256 12.4421 8.83899 12.1785 9.48451C11.9148 10.13 11.5557 10.6983 11.1011 11.1892Z"
              fill="#1A1A1A"
            />
          </svg>
        </span>
        <div className="relative !w-[400px]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-black p-2 rounded-lg "
          >
            <div className="flex  gap-1  items-center">
              <span>{selectedTimezone.name}</span>
              <span className=" text-black">
                ({getCurrentTimeForTimezone()})
              </span>
            </div>
            <ChevronDown className="w-5 h-5" />
          </button>

          {isOpen && (
            <div className="!w-[400px] absolute z-10 mt-2 max-h-60 overflow-y-auto text-black bg-white rounded-lg shadow-lg">
              {timezones.map((timezone) => {
                // Calculate time for each timezone
                const now = new Date();
                const localTime = new Date(
                  now.getTime() + timezone.offset * 3600000
                );
                const formattedTime = formatTimeWithAmPm(localTime);

                return (
                  <div
                    key={timezone.name}
                    onClick={() => selectTimezone(timezone)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span>{timezone.name}</span>
                      <span className="text-gray-500 text-[10px]">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimezoneSelector;
