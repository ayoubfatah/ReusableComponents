"use client";
import { format } from "date-fns";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import TimezoneSelector from "./TimeZone";
import { FormEvent, useState } from "react";
import { Value } from "react-calendar/src/shared/types.js";
import BriefInfo from "./BriefInfo";
import ScheduleFrom from "./ScheduleFrom";
import Avatar from "./avatar";

export default function MeetingComp() {
  const [date, setDate] = useState<Value>(new Date());
  const [dateClicked, setDateClicked] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("12:00");
  const [selectedTimezone, setSelectedTimezone] = useState<{
    name: string;
    offset: number;
  }>({ name: "Coordinated Universal Time", offset: 0 });

  const [showForm, setShowForm] = useState<boolean>(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    timeValue: "",
    date: "",
    timezone: "",
    details: "",
  });
  const [showFinalResult, setShowFinalResult] = useState(false);

  function handleChange(date: Value) {
    setDate(date);
    setDateClicked(true);
  }

  function getFullDate(date: Date) {
    return format(date, "EEEE, MMMM do");
  }

  // 14:00 - 14:30, Thursday, August 24, 2024
  function getFullDateWithYear(date: Date) {
    return format(date, "EEEE, MMMM d, yyyy");
  }

  function handleOnNext() {
    setShowForm(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setData({
      name,
      email,
      timeValue,
      date: getFullDateWithYear(date as Date),
      timezone: selectedTimezone.name,
      details: "web conferencing details to follow",
    });

    setShowFinalResult(true);
  }

  return !showFinalResult ? (
    <div className="flex  shadow-sm rounded-md bg-white">
      <BriefInfo />
      {!showForm && !showFinalResult && (
        <div className=" px-4 py-3 ">
          {" "}
          <h1 className="text-black font-bold text-[22px]">
            Select a Date & Time
          </h1>
          <Calendar handleChange={handleChange} date={date} />
          <TimezoneSelector
            setSelectedTimezone={setSelectedTimezone}
            selectedTimezone={selectedTimezone}
          />
          <button className="text-black px-4 py-2 border mt-5 rounded-4xl ">
            Troubleshooting
          </button>
        </div>
      )}

      {showForm && !showFinalResult && (
        <ScheduleFrom
          setName={setName}
          setEmail={setEmail}
          onSubmit={handleSubmit}
        />
      )}

      {dateClicked && !showForm && (
        <div className=" w-[220px] border-l justify-center   ">
          <>
            <div className="mt-10  flex justify-center flex-col items-center">
              <span className=" text-black/70">
                {getFullDate(date as Date)}
              </span>
              <div className="flex gap-1  items-center ">
                <TimePicker timeValue={timeValue} setTimeValue={setTimeValue} />
                <button
                  onClick={handleOnNext}
                  type="button"
                  className="bg-blue-500 py-[5px] text-white  px-5 rounded-md cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  ) : (
    <div className="w-[900px]  h-[600px] shadow-sm rounded-md bg-white flex   flex-col items-center py-20">
      <Avatar />
      <h3 className="font-bold text-[20px]"> You are scheduled </h3>
      <p>A calendar invitation has been sent to your email address.</p>

      <div className="py-4 px-10 text-[14px] flex flex-col rounded-sm gap-2.5 font-bold text-black/60 border border-black/10 mt-10">
        <h1 className="font-bold text-black text-[16px]">Brief Discussion</h1>
        <span>{data?.name}</span>
        <span>
          {data.timeValue}, {data.date}
        </span>
        <span>{data.timezone}</span>
        <span>{data.details}</span>
      </div>
    </div>
  );
}
