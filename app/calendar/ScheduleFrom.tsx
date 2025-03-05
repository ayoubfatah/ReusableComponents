import React, { FormEvent } from "react";

export default function ScheduleFrom({
  setName,
  setEmail,
  onSubmit,
}: {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className="w-[500px]  justify-start p-6">
      <h1 className="text-[20px] font-bold">Enter Details</h1>
      <form onSubmit={onSubmit} className="  mt-5 ">
        <div className="flex flex-col items-start gap-2 my-3">
          <label className="text-blue-900 font-bold" htmlFor="name">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="client Name"
            type="text"
            id="name"
            className="border focus:outline-none border-blue-500 py-2.5 px-2.5 rounded-sm w-[350px]"
          />
        </div>
        <div className="flex flex-col items-start gap-2  my-3">
          <label className="text-blue-900 font-bold" htmlFor="email">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="marketing@radiantglow.com"
            type="email"
            id="email"
            className="border border-blue-500 focus:outline-none  py-2.5 px-2.5 rounded-sm w-[350px]"
          />
        </div>
        <h3 className="my-5 w-[350px] text-[14px]">
          By proceeding , you confirm that you have read and agree to{" "}
          <span className="underline text-blue-500 font-bold">
            Calendly&apos;s Terms of Use{" "}
          </span>{" "}
          and{" "}
          <span className="underline text-blue-500 font-bold">
            Privacy Notice
          </span>
        </h3>

        <button
          type="submit"
          className="py-2 px-6  text-white bg-blue-600 inline-block rounded-full font-bold"
        >
          Schedule Event
        </button>
      </form>
    </div>
  );
}
