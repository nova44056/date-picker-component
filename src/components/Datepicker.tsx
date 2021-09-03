import React from "react";
import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import css from "./DatePicker.module.css";
import "./jQueryDatepicker.css";
import { BsCalendar } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

interface Props {}

export const DatePicker: React.FC<Props> = () => {
  const [id, _setId] = React.useState<string>(uuidv4());
  const [error, setError] = React.useState<string>("");
  React.useLayoutEffect(() => {
    $(`#start_date_${id}`).datepicker({
      dateFormat: "MM dd yy",
      onClose: () => {
        setError("");
      },
    });
  }, [id]);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div className={css.wrapper}>
        <input
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={(e) => {
            const date = e.target.value.split(" ");
            if (date && !isValidDate(date)) {
              const todayDate = new Date();
              setError(
                `Invalid date. Must be in format ${
                  MONTH[todayDate.getMonth() + 1]
                } ${todayDate.getDate()} ${todayDate.getFullYear()}. MM DD YYYY`
              );
            } else {
              setError("");
            }
          }}
          className={css.input}
          autoComplete="off"
          type="text"
          name="start_date"
          id={`start_date_${id}`}
        />
        <label className={css.label} htmlFor={`start_date_${id}`}>
          <BsCalendar />
        </label>
      </div>
      {error && (
        <div className={css.tooltip}>
          <CgDanger />
          <span className={css.tooltiptext}>{error}</span>
        </div>
      )}
    </div>
  );
};

const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const parentElement = e.currentTarget.parentElement as HTMLElement;
  if (!parentElement.classList.contains(css.focused)) {
    parentElement.classList.add(css.focused);
  }
};

const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
  const parentElement = e.currentTarget.parentElement as HTMLElement;
  if (parentElement.classList.contains(css.focused)) {
    parentElement.classList.remove(css.focused);
  }
};

const isValidMonth = (month: string): boolean => {
  if (MONTH.includes(month)) return true;
  return false;
};

const isValidDay = (day: string): boolean => {
  const _day = parseInt(day);
  const todayDate = new Date();
  const thisMonthLastday = new Date(
    todayDate.getFullYear(),
    todayDate.getMonth() + 1,
    0
  ).getDate();
  if (!isNaN(_day)) {
    if (_day > 0 && _day < thisMonthLastday) return true;
    return false;
  }
  return false;
};

const isValidYear = (month: string): boolean => {
  // regex to check the string contains 4 digit which is number
  const regex = new RegExp(/\d{4}$/);
  if (regex.test(month)) return true;
  return false;
};

const isValidDate = (date: string[]) => {
  if (date[0]) if (!isValidMonth(date[0])) return false;
  if (date[1]) if (!isValidDay(date[1])) return false;
  if (date[2]) if (!isValidYear(date[2])) return false;
  return true;
};

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
