import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";

let startDate;
let endDate;

const CalenderComp = () => {
  const [calendar, setCalendar] = useState("");

  const [open, setOpen] = useState(false);
  const refOne = useRef(null);
  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  startDate = format(range[0].startDate, "yyyy-MM-dd");
  endDate = format(range[0].endDate, "yyyy-MM-dd");

  useEffect(() => {
    // set current date on component Load
    setCalendar(format(new Date(), "MM/dd/yyyy"));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  function handleSelect(date) {
    console.log(
      `${format(range[0].startDate, "MM-dd-yyyy")} to ${format(
        range[0].endDate,
        "MM-dd-yyyy"
      )}`
    );
    setCalendar(format(date, "MM-dd-yyyy")); // native Date object
  }

  return (
    <div
      className="calendar-wrap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input
        value={
          range[0]
            ? `${format(range[0].startDate, "MM-dd-yyyy")} to ${format(
                range[0].endDate,
                "MM-dd-yyyy"
              )}`
            : ""
        }
        readOnly
        className="inputBox"
        style={{
          border: "1px solid black",
          width: 225,
          margin: "20px",
        }}
        placeholder={!range[0] && "Click to Select a date"}
        data-testid="calendar-input" // add data-testid attribute
        onClick={() => setOpen((open) => !open)}
      />

      <div
        ref={refOne}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {open && (
          <DateRange
            onChange={(item) => {
              console.log(
                `${format(item.selection.startDate, "MM-dd-yyyy")} to ${format(
                  item.selection.endDate,
                  "MM-dd-yyyy"
                )}`
              );
              setRange([item.selection]);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
            data-testid="calendar-element" // add data-testid attribute
          />
        )}
      </div>
    </div>
  );
};
export {CalenderComp, startDate, endDate};
