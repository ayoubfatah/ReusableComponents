"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // Custom styles

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const PrevIcon = () => {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.42444 12.3314C7.78274 11.9911 7.78274 11.4393 7.42444 11.099L2.42698 6.35229L7.42444 1.60561C7.78274 1.26528 7.78274 0.713492 7.42444 0.373165C7.06613 0.0328382 6.48519 0.0328382 6.12689 0.373165L0.480648 5.73606C0.122336 6.0764 0.122336 6.6282 0.480648 6.96855L6.12689 12.3314C6.48519 12.6718 7.06613 12.6718 7.42444 12.3314Z"
        fill="#1A1A1A"
        fillOpacity="0.61"
      />
    </svg>
  );
};
const NextIcon = () => {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.234375"
        y="0.399902"
        width="37.905"
        height="37.905"
        rx="18.9525"
        fill="#0069FF"
        fillOpacity="0.08"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.716 25.3316C15.3577 24.9913 15.3577 24.4396 15.716 24.0992L20.7135 19.3525L15.716 14.6059C15.3577 14.2655 15.3577 13.7137 15.716 13.3734C16.0743 13.0331 16.6552 13.0331 17.0136 13.3734L22.6598 18.7363C23.0181 19.0766 23.0181 19.6284 22.6598 19.9688L17.0136 25.3316C16.6552 25.672 16.0743 25.672 15.716 25.3316Z"
        fill="#0069FF"
      />
    </svg>
  );
};

type CalendarCompProps = {
  date: Value;
  handleChange: (value: Value) => void;
};

export default function CalendarComp({
  date,
  handleChange,
}: CalendarCompProps) {
  // const holidays = ["2024-12-25", "2024-01-01"];

  return (
    <div>
      <Calendar
        view="month"
        prevLabel={<PrevIcon />}
        nextLabel={<NextIcon />}
        locale="en-US"
        // tileClassName={({ date }) =>
        //   holidays.includes(date.toISOString().split("T")[0]) ? "holiday" : null
        // }

        minDate={new Date()}
        onChange={handleChange}
        value={date}
      />
    </div>
  );
}

/*
  Below are all the props that the `react-calendar` component can accept,
  commented out for easy reference and future use.

  You can uncomment and configure these props as needed to customize your calendar.

  --- Prop Categories ---

  1. Value and Date Control Props:
     These props manage the selected date(s) and control the selectable date range.
*/
// value={value}              // Date | Date[] | null: The currently selected date(s).  (REQUIRED)
// defaultValue={new Date()}   // Date | Date[] | null:  Initial date(s) if value is not provided.
// onChange={setValue}          // Function: Called when the user changes the date. Receives the new date or date range. (REQUIRED)
// minDate={new Date()}        // Date:  Minimum selectable date. Dates before this are disabled.
// maxDate={new Date("2025-12-31")} // Date: Maximum selectable date. Dates after this are disabled.
// minDetail="month"          // 'month' | 'year' | 'decade' | 'century':  Minimum detail view to start with.
// maxDetail="century"        // 'month' | 'year' | 'decade' | 'century': Maximum detail view available for navigation.
// navigationAriaLabel="Change month" // string: Aria-label for the navigation label.
// navigationLabel={({ date, view, label }) => label} // Function | React.ReactNode: Custom label for the navigation.
// prevLabel="<"              // React.ReactNode: Custom label for the previous navigation button.
// nextLabel=">"              // React.ReactNode: Custom label for the next navigation button.
// prev2Label="<<"             // React.ReactNode: Custom label for the previous-previous navigation button (e.g., for year view).
// next2Label=">>"             // React.ReactNode: Custom label for the next-next navigation button (e.g., for year view).
// showNavigation={true}       // boolean: Whether to show navigation controls (prev/next month buttons).
// showNeighboringMonth={false} // boolean: Whether to show days from previous/next months in the month view.
// showFixedNumberOfWeeks={false} // boolean: If true, always show 6 weeks in month view, padding with days from neighboring months if needed.

/*
  2. Localization Props:
     These props allow you to adapt the calendar to different languages, regions, and calendar systems.
*/
// locale="en-US"             // string:  Locale for formatting dates and text. (e.g., 'en-US', 'fr-FR', 'ar-EG')
// calendarType="gregory"     // 'gregory' | 'iso8601' | 'hebrew' | 'persian' | 'arabic': Type of calendar to use.
// formatDay={(locale, date) => String(date.getDate())} // Function: Custom formatting for day numbers in the month view.
// formatMonthYear={(locale, date) => new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date)} // Function: Custom formatting for month and year in the navigation label.
// formatMonth={(locale, date) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)} // Function: Custom formatting for months in year view.
// formatYear={(locale, date) => new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date)} // Function: Custom formatting for years in decade view.
// formatShortWeekday={(locale, date) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)} // Function: Custom formatting for weekday names (e.g., "Mon").
// formatLongWeekday={(locale, date) => new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date)}  // Function: Custom formatting for weekday names (e.g., "Monday").
// formatShortMonth={(locale, date) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)}   // Function: Custom formatting for month names (e.g., "Jan").
// formatLongMonth={(locale, date) => new Intl.DateTimeFormat(locale, { month: 'long' }).format(date)}    // Function: Custom formatting for month names (e.g., "January").
// formatDayOfMonth={(locale, date) => new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date)} // Function: Custom formatting for day of month (e.g., "1").
// formatFullDate={(locale, date) => new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date)} // Function: Custom formatting for full date.
// formatAbbr={(locale, date) => new Intl.DateTimeFormat(locale, { month: 'narrow' }).format(date)} // Function: Custom formatting for abbreviated month names (e.g., "J").

/*
  3. Styling and Customization Props:
     These props are for changing the appearance of the calendar.
*/
// className="my-custom-calendar" // string | string[] | Set<string> | object:  CSS class(es) to apply to the main calendar container.
// style={{ maxWidth: '400px' }} // React.CSSProperties: Inline styles for the main calendar container.
// tileClassName={({ date, view }) => view === 'month' && holidays.includes(date.toISOString().split("T")[0]) ? 'holiday' : null} // Function | string | string[] | Set<string> | object: CSS class(es) for individual day tiles. Can be dynamic based on date and view.
// tileContent={({ date, view }) => view === 'month' && holidays.includes(date.toISOString().split("T")[0]) ? <p>Holiday</p> : null} // Function | React.ReactNode:  Content to render inside each day tile.
// showWeekNumbers={false}        // boolean: Whether to display week numbers alongside the month view.
// weekNumbersClassName="week-number-col" // string | string[] | Set<string> | object: CSS class(es) for the week numbers column.
// dateClassName={({ date, view }) => view === 'month' && date.getDate() === 15 ? 'special-date' : null} // Function | string | string[] | Set<string> | object:  Dynamically add class names to date tiles.
// dateContent={({ date, view }) => view === 'month' && date.getDate() === 15 ? <p>Special</p> : null} // Function | React.ReactNode: Dynamically add content to date tiles.

/*
  4. View Control Props:
     These props manage the calendar's current view and navigation.
*/
// view="month"                 // 'month' | 'year' | 'decade' | 'century':  Initial view to display.
// defaultView="month"          // 'month' | 'year' | 'decade' | 'century': Default view if view is not controlled.
// onViewChange={() => {}}       // Function: Called when the view changes (e.g., month to year view).
// activeStartDate={new Date()} // Date: The date that determines the initially visible view.
// onActiveStartDateChange={() => {}} // Function: Called when the active start date changes (e.g., when navigating months).
// viewCalendarType="gregory"   // 'gregory' | 'iso8601' | 'hebrew' | 'persian' | 'arabic': Calendar type to use for display, independent of `calendarType`.
// onChangeActiveStartDate={() => {}} // Function: Called when the active start date is about to change.
// onNavigate={() => {}}           // Function: Called when navigation occurs (e.g., month change).
// onViewTypeChange={() => {}}      // Function: Called when the view type changes (e.g., month to year).
// onDrillDownView={() => {}}       // Function: Called when drilling down into a view.
// onDrillUpView={() => {}}         // Function: Called when drilling up from a view.

/*
  5. Date Range Selection Props:
     For enabling date range selection.
*/
// selectRange={false}          // boolean:  Enable date range selection. If true, `value` will be Date[].
// returnValue="start"          // 'start' | 'end' | 'range':  Determines what value `onChange` returns when selecting a range.

/*
  6. Drill Down and View Navigation Props (Interaction):
     Props related to user interaction and view changes.
*/
// drillUpButtonLabel="Year View" // React.ReactNode: Label for the button to drill up to the next higher view (e.g., from month to year).
// drillDownButtonLabel="Month View" // React.ReactNode: Label for the button to drill down to the next lower view (e.g., from year to month).
// nextView="month"             // 'month' | 'year' | 'decade' | 'century':  View to switch to when drilling down (e.g., clicking on a year in year view).
// prevView="century"             // 'month' | 'year' | 'decade' | 'century': View to switch to when drilling up.
// onClickDay={(value, event) => { console.log('Clicked day:', value); }} // Function: Called when a day tile is clicked.
// onClickMonth={(value, event) => { console.log('Clicked month:', value); }} // Function: Called when a month tile is clicked in year view.
// onClickYear={(value, event) => { console.log('Clicked year:', value); }}   // Function: Called when a year tile is clicked in decade view.
// onClickDecade={(value, event) => { console.log('Clicked decade:', value); }} // Function: Called when a decade tile is clicked in century view.
// onDrillDown={() => {}}         // Function: Called when drilling down to a lower view.
// onDrillUp={() => {}}           // Function: Called when drilling up to a higher view.

/*
  7. Accessibility (ARIA) Props:
     Props for improving accessibility for users with disabilities.
*/
// tileDisabled={({ date, view }) => view === 'month' && date.getDay() === 0} // Function:  Disable specific tiles based on date and view.
// tileAriaLabel={({ date, view }) => view === 'month' ? `Day ${formatDate(date, 'MMMM d, yyyy')}` : null} // Function | string: Aria-label for each tile.
// ariaLabel="Calendar"           // string: Aria-label for the calendar component itself.
// ariaLive="polite"            // 'off' | 'polite' | 'assertive':  Aria-live attribute for accessibility announcements.
// dayAriaLabel={(date) => `Date: ${formatDate(date, 'MMMM d, yyyy')}`} // Function | string: Aria-label for day tiles.
// monthAriaLabel={(date) => `Month: ${formatDate(date, 'MMMM')}`}     // Function | string: Aria-label for month tiles.
// yearAriaLabel={(date) => `Year: ${formatDate(date, 'yyyy')}`}       // Function | string: Aria-label for year tiles.
// decadeAriaLabel={(date) => `Decade: ${getDecadeLabel(date)}`}       // Function | string: Aria-label for decade tiles.

/*
  8. Advanced/Internal Props (Use with Caution):
     These are for very specific use cases or internal overrides.
*/
// minDateTransform={(date) => date} // Function: Transform the minimum date before using it.
// maxDateTransform={(date) => date} // Function: Transform the maximum date before using it.
// activeStartDateTransform={(date) => date} // Function: Transform the active start date.
// tileRef={null}               // React.Ref<HTMLElement>: Ref to the tile element (advanced use cases).
// renderChildren={null}          // (children: React.ReactNode) => React.ReactNode: Function to render children, mostly for internal use/advanced customization.
// __tileOverride={null}          // Function: Advanced tile override for very specific customization needs.
// __navigationOverride={null}    // Function: Advanced navigation override.
// __monthViewOverride={null}     // Function: Advanced month view override.
// __yearViewOverride={null}      // Function: Advanced year view override.
// __decadeViewOverride={null}    // Function: Advanced decade view override.
// __centuryViewOverride={null}   // Function: Advanced century view override.
