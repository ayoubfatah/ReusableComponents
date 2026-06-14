"use client";

import { useEffect, useRef, useState } from "react";

export default function BookingModalChallenge() {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    petName: "",
    petType: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const bookingBtnRef = useRef<HTMLButtonElement | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.ownerName) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (!form.petName) {
      newErrors.petName = "Pet name is required";
    }

    if (!form.petType) {
      newErrors.petType = "Choose a pet type";
    }

    if (!form.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!form.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = "End date cannot be before start date";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("Booking request submitted successfully.");
      closeModal();
    }
  }

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      if (!bookingBtnRef.current) return;
      bookingBtnRef.current.focus();
    }, 0);
  }

  const modalRef = useRef<null | HTMLDivElement>(null);
  const modalTitleRef = useRef<null | HTMLHeadingElement>(null);
  function onBooking() {
    setIsOpen(true);
    setTimeout(() => {
      modalTitleRef?.current?.focus();
    }, 0);
  }

  useEffect(() => {
    const modelElement = modalRef.current;
    const focusableElements = modelElement?.querySelectorAll(
      `
  a[href],
  button:not([disabled]),
  textarea:not([disabled]),
  input:not([disabled]),
  select:not([disabled]),
  [tabindex]:not([tabindex="-1"])
`,
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    console.log(firstElement, "firstElement");
    console.log(lastElement, "lastElement");

    function trapFocus(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") {
        closeModal();
      }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            if (!lastElement) return null;
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          /* Tab */
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    }

    document?.addEventListener("keydown", trapFocus);

    return () => document?.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-black text-white   ">
      <header className=" flex items-center justify-between   border-b   px-8 py-4">
        {/*  */}
        {/* skip to main content */}

        <div className="group text-2xl text-white font-bold  ">
          <a
            href="#main-content"
            className="  absolute -left-[300px] focus:left-4 bg-white text-black  top-2.5  transition-all duration-300 focus:outline-2 outline-blue-600  px-2 py-1.5 rounded-md"
          >
            Skip to main content
          </a>
          <a className="" href="#home">
            PetStay
          </a>
        </div>
        {/*  */}
        <nav className="     flex gap-4 list-none   items-center ">
          <ul className="flex gap-4 list-none   items-center ">
            <li className="cursor-pointer font-bold text-blue-600">
              <a href="#home">Home</a>
            </li>
            <li className="cursor-pointer font-bold text-blue-600">
              <a href="#services">Services</a>
            </li>
            <li className="cursor-pointer font-bold text-blue-600">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* main */}

      <main className="p-8" id="main-content">
        <section>
          <h1 className="text-4xl  text-gray-50 font-bold">
            Premium Pet Boarding
          </h1>

          <p className="mt-4 max-w-xl text-gray-200">
            Book a safe and comfortable stay for your pet while you are away.
          </p>

          <button
            ref={bookingBtnRef}
            onClick={onBooking}
            className="mt-6 inline-block cursor-pointer rounded-md bg-white px-4 py-2 text-black"
          >
            Book a stay
          </button>
        </section>
      </main>

      {/* modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/20    p-4">
          <div
            ref={modalRef}
            id="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            className="w-full max-w-lg rounded-xl bg-black text-white p-6  shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between focus:outline-2 outline-blue-500">
              <h2
                ref={modalTitleRef}
                id="modal-title"
                className="text-xl font-semibold"
              >
                Book your pet’s stay
              </h2>

              <button
                aria-label="close"
                onClick={closeModal}
                className="cursor-pointer rounded bg-gray-900 px-3 py-1"
              >
                X
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name">Owner name</label>
                <input
                  id="name"
                  aria-describedby="name-error-msg"
                  aria-invalid={!!errors.ownerName}
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                />
                {errors.ownerName && (
                  <p id="name-error-msg" className="mt-1 text-sm text-red-600">
                    {errors.ownerName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error-msg"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                />
                {errors.email && (
                  <p id="email-error-msg" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="petName">Pet name</label>
                <input
                  id="petName"
                  aria-invalid={!!errors.petName}
                  aria-describedby="petName-error-msg"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
                />
                {errors.petName && (
                  <p
                    id="petName-error-msg"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.petName}
                  </p>
                )}
              </div>

              <div>
                <fieldset
                  className="mt-2 flex gap-4"
                  aria-describedby="petType-error-msg"
                >
                  <legend>Choose Your Pet Type</legend>
                  <div>
                    <input
               type="radio"
                      name="petType"
                      value="dog"
                      id="dog"
                      onChange={handleChange}
                    />
                    <label htmlFor="dog">Dog</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cat"
                      name="petType"
                      value="cat"
                      onChange={handleChange}
                    />
                    <label htmlFor="cat">Cat</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      name="petType"
                      value="other"
                      id="other"
                      onChange={handleChange}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </fieldset>

                {errors.petType && (
                  <p
                    id="petType-error-msg"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.petType}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="start-date">Start date</label>
                <input
                  type="date"
                  id="start-date"
                  name="startDate"
                  aria-describedby="startDate-error-msg"
                  aria-invalid={!!errors.startDate}
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2  [&::-webkit-calendar-picker-indicator]:hidden"
                />
                {errors.startDate && (
                  <p
                    id="startDate-error-msg"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="end-date">End date</label>
                <input
                  type="date"
                  name="endDate"
                  id="end-date"
                  value={form.endDate}
                  onChange={handleChange}
                  aria-describedby="endDate-error-msg"
                  aria-invalid={!!errors.endDate}
                  className="w-full rounded border px-3 py-2  [&::-webkit-calendar-picker-indicator]:hidden"
                />
                {errors.endDate && (
                  <p
                    id="endDate-error-msg"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.endDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="specialNote">Special notes</label>
                <textarea
                  id="specialNote"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="min-h-24 w-full rounded border px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer rounded-md border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 border border-white text-white"
                >
                  Confirm booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
