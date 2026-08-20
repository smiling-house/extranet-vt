import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DateRangePicker } from "react-dates";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./DatePickerComponent.scss"; // Ensure this import is correct
import dayjs from "dayjs";
import moment from "moment";

const DatePickerComponent = ({ arrivalDate, departDate, fullCalendar, onChange, disabled }) => {
  const location = useLocation();
  const isPropertyPath = location.pathname.includes('property');
  // Booked = allotment explicitly zero/false (number 0, "0", false) — matches
  // VT-FE. Some feeds ship allotment as a string, which a strict `=== 0` let
  // through, leaving those days pickable.
  const isDayBooked = (e) =>
    e?.allotment === 0 || e?.allotment === "0" || e?.allotment === false;
  const blockedDates = fullCalendar ? fullCalendar.filter(isDayBooked).map((x) => x.date.substring(0, 10)) : [];

  // ── changeover (cta/ctd) + sentinel min-stay ──────────────────────────────
  // cta/ctd are PERMISSIONS: "ON" = allowed, only an explicit off-value closes
  // the day. Without this the picker offered arrivals the PMS rejects outright:
  // RU marks whole peak weeks closed to changeover while leaving allotment at 1,
  // so a Saturday-to-Saturday chalet looked bookable on any day of the week.
  // Lockstep with VT-Front's Util/calendarAvailability.js isFlagOff.
  const isFlagOff = (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "boolean") return !value;
    if (typeof value === "number") return value === 0;
    const v = String(value).trim().toLowerCase();
    return v === "off" || v === "false" || v === "0" || v === "no";
  };
  const _cal = Array.isArray(fullCalendar) ? fullCalendar : [];
  // Degenerate-flag guard: some feeds stamp EVERY day OFF, which carries no
  // signal — honouring it would black out the whole calendar.
  const _ctaDegenerate = _cal.length > 0 && _cal.every((e) => isFlagOff(e?.cta));
  const _ctdDegenerate = _cal.length > 0 && _cal.every((e) => isFlagOff(e?.ctd));
  const ctaOffDates = _ctaDegenerate ? [] : _cal.filter((e) => isFlagOff(e?.cta)).map((x) => x.date.substring(0, 10));
  const ctdOffDates = _ctdDegenerate ? [] : _cal.filter((e) => isFlagOff(e?.ctd)).map((x) => x.date.substring(0, 10));
  // A per-day minStay at or beyond the 365-night ceiling is not a minimum, it is
  // a "do not book" sentinel (Emerald Stay ships 999 on closed dates while
  // leaving allotment at 1). Ordinary weekly/monthly minimums are far below it.
  const UNSATISFIABLE_MIN_STAY = 365;
  const sentinelDates = _cal
    .filter((e) => (Number(e?.minStay) || 0) >= UNSATISFIABLE_MIN_STAY)
    .map((x) => x.date.substring(0, 10));
  const [startDate, setArrivalDate] = useState(null);
  const [minNights, setMinNights] = useState(0);
  const [endDate, setDepartDate] = useState(null);
  const [firstBlock, setFirstBlock] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const getOrientation = () => {
    return window.matchMedia("(max-width: 768px)").matches ? "vertical" : "horizontal";
  };

  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    console.log(isPropertyPath); // Logs the value of isPropertyPath
  }, [isPropertyPath]);

  useEffect(() => {
    setMinNights(localStorage.getItem("minNights"));
  }, []);

  const changeDates = () => {
    if (arrivalDate && departDate) {
      const updatedArrivDate = moment.isMoment(arrivalDate)
        ? arrivalDate
        : moment(arrivalDate);
      const updatedDepartDate = moment.isMoment(departDate)
        ? departDate
        : moment(departDate);
      setArrivalDate(updatedArrivDate);
      setDepartDate(updatedDepartDate);

      if (!updatedArrivDate.isValid()) {
        setArrivalDate(null);
      } else {
        setArrivalDate(updatedArrivDate);
      }

      if (!updatedDepartDate.isValid()) {
        setDepartDate(null);
      } else {
        setDepartDate(updatedDepartDate);
      }
    }
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    const dateFromValid = dayjs(startDate).isValid();
    const dateToValid = dayjs(endDate).isValid();

    setArrivalDate(startDate);
    setDepartDate(endDate);

    if (startDate === null || endDate === null) {
      localStorage.removeItem("dateFrom");
      localStorage.removeItem("dateTo");
    } else {
      localStorage.setItem("dateFrom", startDate);
      localStorage.setItem("dateTo", endDate);
    }

    if (fullCalendar && dateFromValid) {
      UntilFirstBlock(startDate, endDate);
      if (firstBlock && !dayjs(startDate).isBefore(dayjs(firstBlock))) {
        return; // Exit early if the endDate is reset
      }
    } else {
      setFirstBlock(null);
    }
    onChange(startDate, endDate);
  };

  useEffect(() => {
    changeDates();
  }, [arrivalDate, departDate]);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [isPropertyPath]);

  const UntilFirstBlock = (startDate, endDate) => {
    if (fullCalendar) {
      const firstDay = dayjs(startDate).format("DD-MM-YYYY");
      console.log("find first block after date:", firstDay);
      const firstBlock = fullCalendar.findIndex((element) => dayjs(startDate).isBefore(element.date) && !element.allotment);
      if (firstBlock > -1) {
        const block = fullCalendar[firstBlock];
        console.log("first block is", dayjs(block.date).format("DD-MM-YYYY"));
        setFirstBlock(block.date);
      }
    } else if (!startDate && !endDate) {
      setFirstBlock(null);
    }
  };

  const shouldDisableDate = (day) => {
    const today = dayjs();
    const dayIs = dayjs(day);
    const currentDate = dayIs.format("YYYY-MM-DD");
    if ((day.isBefore(today, "day")) || blockedDates.includes(currentDate) ||day.isBefore(startDate, "day") ) {
      return true;
    }
    // Sentinel min-stay closes the day outright, whichever end is being picked.
    if (sentinelDates.includes(currentDate)) {
      return true;
    }
    // Changeover applies per END: closed-to-arrival only blocks the check-in
    // day, closed-to-departure only the check-out day. `focusedInput` tells us
    // which the user is choosing; before either is focused, gate on arrival.
    if (focusedInput === "endDate") {
      if (ctdOffDates.includes(currentDate)) return true;
    } else if (ctaOffDates.includes(currentDate)) {
      return true;
    }
    if (firstBlock && startDate) {
      const blockDay = dayjs(firstBlock);
      if (blockDay.isBefore(day)) {
        return true;
      }
    }
    if (startDate ) {
      const maxNights=parseInt(localStorage.getItem("maxNights"))||365
      const diffDays = Math.ceil((day -startDate) / (1000 * 60 * 60 * 24));
      if (diffDays > maxNights) {
        return true
    }
      // Per-day minimum stay: a departure closer than the CHECK-IN day's minStay is not
      // selectable. Honors whatever the PMS set per day (e.g. 30 for a long-term-only villa).
      // The global `minimumNights` guard is inert here (localStorage.minNights is never
      // stamped on the extranet), so this block is the real min-stay enforcement.
      const arrKey = dayjs(startDate).format("YYYY-MM-DD");
      const arrEntry = (fullCalendar || []).find((e) => (e?.date || "").substring(0, 10) === arrKey);
      const arrMin = Number(arrEntry?.minStay) || 0;
      if (arrMin > 0 && diffDays > 0 && diffDays < arrMin) {
        return true;
      }
    return false;
  }
}

  // Why a day is unselectable, on hover. Without this a greyed-out Saturday-only
  // chalet just looks broken — the guest sees dead cells and no reason.
  // Mirrors VT-Front's dayTooltip.
  const dayTooltip = (day) => {
    const key = dayjs(day).format("YYYY-MM-DD");
    const entry = _cal.find((e) => (e?.date || "").substring(0, 10) === key);
    const parts = [];
    if (blockedDates.includes(key)) parts.push("Booked");
    if (sentinelDates.includes(key)) parts.push("Not available");
    else {
      if (ctaOffDates.includes(key)) parts.push("No check-in on this day");
      if (ctdOffDates.includes(key)) parts.push("No check-out on this day");
      const ms = Number(entry?.minStay) || 0;
      if (ms > 1) parts.push(`Minimum stay: ${ms} nights`);
    }
    return parts.join(" · ");
  };

  // Tooltip layer only — react-dates' own selection logic is untouched.
  const renderDayContents = (day) => {
    const t = dayTooltip(day);
    return t ? <span title={t}>{day.format("D")}</span> : day.format("D");
  };

  const dateInputStyle = {
    padding: isPropertyPath ? '0' : '0 10px'
  };

  // Property page uses the SAME react-dates picker as VT-FE so blocked dates
  // (allotment 0) are greyed / not selectable — native <input type="date">
  // could only enforce a min date and let blocked days be picked.
  return (
    <div className={isPropertyPath ? "propertyDatePicker" : ""}>
      <DateRangePicker
        className="datepicker"
        startDate={startDate}
        minimumNights={isPropertyPath ? parseInt(minNights) : 1}
        endDate={endDate}
        numberOfMonths={1}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        isOutsideRange={() => false}
        showClearDates
        customArrowIcon={null}
        customCloseIcon={<CloseTwoToneIcon fontSize="medium" />}
        isDayBlocked={shouldDisableDate}
        renderDayContents={renderDayContents}
        startDatePlaceholderText="Arrive"
        endDatePlaceholderText="Depart"
        startDateId={isPropertyPath ? "property-arrivedate" : "arrivedate"}
        endDateId={isPropertyPath ? "property-departdate" : "departdate"}
        displayFormat="DD.MM.YYYY"
        orientation={orientation}
        disabled={disabled}  
      />
      <style>
        {`
          .DateInput {
            display: flex !important;
            width: 100% !important;
            border-radius: 4px !important;
            padding: ${dateInputStyle.padding} !important;
          }
        `}
      </style>
    </div>
  );
};

export default DatePickerComponent;
