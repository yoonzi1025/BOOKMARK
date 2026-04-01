import React, { useContext, useState } from "react";
import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledDate,
  StyledCalendarInfo,
  StyledInfoItem,
  StyledInfoDot,
} from "./CalendarStyle";
import moment from "moment";
import { RecordStateContext } from "../../context/records/RecordProvider";
import CalendarModal from "./CalendarModal";
import { getDayBooks } from "../../utils/calendarUtils";

const ReadingCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const records = useContext(RecordStateContext);

  // value = 클릭한 날짜
  const handleDateChange = (value) => {
    setDate(value);
    setSelectedDate(value);
    setOpen(true);
  };

  // const handleTodayClick = () => {
  //   const today = new Date();
  //   setActiveStartDate(today);
  //   setDate(today);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        formatShortWeekday={(locale, date) => moment(date).format("ddd")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        activeStartDate={activeStartDate || undefined}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        /* 날짜 칸에 클래스 주기 (has-book, is-today) */
        tileClassName={({ date: tileDate, view }) => {
          if (view !== "month") return "";

          const dayBooks = getDayBooks({ records, date: tileDate });

          const isToday =
            tileDate.getFullYear() === today.getFullYear() &&
            tileDate.getMonth() === today.getMonth() &&
            tileDate.getDate() === today.getDate();

          let className = "";

          if (dayBooks.length > 0) className += " has-book";
          if (isToday) className += " is-today";

          return className.trim();
        }}
        /* 날짜 칸 안에 내용 넣기 (책 표지 이미지) */
        tileContent={({ date: tileDate, view }) => {
          if (view !== "month") return null;

          const dayBooks = getDayBooks({ records, date: tileDate });
          if (dayBooks.length === 0) return null;

          return (
            <div className="tile-cover-wrapper">
              <div className="tile-cover">
                <img src={dayBooks[0].cover} alt={dayBooks[0].title} />
              </div>
              <div className="tile-badge">{dayBooks.length}</div>
            </div>
          );
        }}
      />
      <StyledCalendarInfo>
        <StyledInfoItem>
          <StyledInfoDot style={{ border: "1.5px solid #2f3e9e" }} />
          완독한 날
        </StyledInfoItem>
        <StyledInfoItem>
          <StyledInfoDot style={{ background: "#2f3e9e" }} />
          오늘
        </StyledInfoItem>
      </StyledCalendarInfo>
      {/* 
      <StyledDate onClick={handleTodayClick}>Today</StyledDate> */}
      {open && selectedDate && (
        <CalendarModal
          date={selectedDate}
          dayBooks={getDayBooks({ records, date: selectedDate })}
          onClose={handleClose}
        />
      )}
    </StyledCalendarWrapper>
  );
};

export default ReadingCalendar;
