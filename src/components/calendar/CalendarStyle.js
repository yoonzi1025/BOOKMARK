import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendarWrapper = styled.div`
  width: 445px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 50px auto;
  gap: 5px;

  /* 페이지 타이틀 */
  .page-title {
    font-size: 24px;
    color: #60605a;
    text-align: center;
  }

  .page-title p {
    color: #908a8a;
    font-size: 12px;
    margin: 5px 0;
  }

  .react-calendar {
    width: 445px;
    border: 1px solid #c4c4c4;
    padding: 3% 5%;
    background-color: white;
  }

  .react-calendar__navigation {
    justify-content: center;
    border-bottom: 1px solid #dfdfdf;
    position: relative;
  }

  .react-calendar__navigation__label__labelText {
    color: #3f3f3f;
  }

  .react-calendar__navigation__arrow {
    background-color: transparent;
    color: #7c97fe;
  }

  .react-calendar__navigation button {
    font-weight: 600;
    font-size: 1rem;
  }

  .react-calendar__navigation button:hover {
    background-color: transparent;
    color: #7c97fe;
  }

  .react-calendar__navigation button:active,
  .react-calendar__navigation button:focus {
    background-color: transparent;
    outline: none;
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
    pointer-events: none;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 700;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff0000;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: #2e7af2;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    color: #424242;
  }

  .react-calendar__month-view__days__day--neighboringMonth abbr {
    color: #bdbdbd !important;
  }

  /* 날짜 타일 */
  .react-calendar__tile {
    position: relative;
    background-color: transparent !important;
    min-height: 55px;
    padding-top: 6px;
    border-radius: 10px;
    transition: all 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .react-calendar__tile:hover {
    background-color: transparent !important;
    cursor: default;
  }

  .react-calendar__tile--active {
    background: none !important;
    color: #1a1a1a;
  }

  /* 완독한 날 */
  .react-calendar__tile.has-book {
    background: #fffdf5 !important;
  }

  .react-calendar__tile.has-book:hover {
    background: #fffdf5 !important;
    background-color: #fff3cc !important;
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(255, 193, 7, 0.15);
    cursor: pointer;
  }

  /* 오늘 */
  .react-calendar__tile.is-today abbr {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #ffc107;
    color: #fff;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* 책 표지 */
  .tile-cover-wrapper {
    margin-top: 4px;
    display: flex;
    justify-content: center;
    width: 100%;
    flex: 1;
  }

  .tile-cover {
    width: 28px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  }

  .react-calendar__tile--now {
    background: none;
    position: relative;
    z-index: 1;
  }

  .react-calendar__tile--now abbr {
    color: white;
    position: relative;
    z-index: 2;
  }

  // .react-calendar__tile--now::after {
  //   content: "";
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   width: 30px;
  //   height: 30px;
  //   border-radius: 50%;
  //   background-color: #ffc107;
  //   transform: translate(-50%, -50%);
  // }

  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: white;
    padding: 0;
  }
`;

export const StyledCalendar = styled(Calendar)``;

export const StyledDate = styled.button`
  position: absolute;
  top: 20%;
  right: 5%;
  background-color: #ffc107;
  color: white;
  width: 90px;
  text-align: center;
  line-height: 1.6rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  z-index: 1;
  border: none;
  transition: background 0.18s;

  &:hover {
    background: #e6a800;
  }
`;

export const StyledCalendarInfo = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border: 1px solid #c4c4c4;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 12px 12px;
  padding: 10px 0 12px;
`;

export const StyledInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #aaa;
`;

export const StyledInfoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`;
