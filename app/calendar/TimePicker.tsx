import { Input } from "@/components/ui/input";
import React from "react"; // Import useState
import "./timepicker.css";

type TimeZoneSelectorProps = {
  timeValue: string;
  setTimeValue: React.Dispatch<React.SetStateAction<string>>;
};
export default function TimePicker({
  timeValue,
  setTimeValue,
}: TimeZoneSelectorProps) {
  // 1. Declare a state variable to hold the time value

  // 3. Create an onChange handler function
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 4. Inside the onChange handler, update the state variable using setTimeValue
    setTimeValue(event.target.value);
  };

  return (
    <div className="w-20 py-1.5">
      <Input
        type="time"
        className="time-picker-input flex justify-center items-center bg-[#767676] text-white"
        // 2. Pass the state variable as the value prop
        value={timeValue}
        // Add onChange prop and set it to the handleTimeChange function
        onChange={handleTimeChange}
      />
    </div>
  );
}
