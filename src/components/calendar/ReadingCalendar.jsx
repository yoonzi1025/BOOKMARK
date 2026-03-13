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
import { BooksStateContext } from "../../context/books/BooksProvider";
import { RecordStateContext } from "../../context/records/RecordProvider";
import CalendarModal from "./CalendarModal";
import { getDayBooks } from "../../utils/calendar-utils";

const ReadingCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const books = useContext(BooksStateContext);
  const records = useContext(RecordStateContext);

  // value = 클릭한 날짜
  const handleDateChange = (value) => {
    setDate(value);
    setSelectedDate(value);
    setOpen(true);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledCalendarWrapper>
      <div className="page-wrap">
        <div className="page-title">
          <h1>Reading Board</h1>
          <p>날짜를 클릭해 기록 된 책을 확인하세요.</p>
        </div>
      </div>
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
          const dayBooks = getDayBooks({ books, records, date: tileDate });

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

          const dayBooks = getDayBooks({ books, records, date: tileDate });

          if (dayBooks.length === 0) return null;

          return (
            <>
              <div className="tile-cover-wrapper">
                <img
                  className="tile-cover"
                  src={dayBooks[0].cover}
                  alt={dayBooks[0].title}
                />
              </div>
            </>
          );
        }}
      />
      <StyledCalendarInfo>
        <StyledInfoItem>
          <StyledInfoDot
            style={{ background: "#fff8e1", border: "1.5px solid #ffc107" }}
          />
          완독한 날
        </StyledInfoItem>
        <StyledInfoItem>
          <StyledInfoDot style={{ background: "#ffc107" }} />
          오늘
        </StyledInfoItem>
      </StyledCalendarInfo>

      <StyledDate onClick={handleTodayClick}>Today</StyledDate>
      {open && selectedDate && (
        <CalendarModal date={selectedDate} onClose={handleClose} />
      )}
    </StyledCalendarWrapper>
  );
};

export default ReadingCalendar;
