import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendarWrapper = styled.div`
  max-width: 560px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: left;
  gap: var(--space-1);

  .react-calendar {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
    background: var(--bg-card);
  }

  .react-calendar__navigation {
    justify-content: center;
    border-bottom: 1px solid var(--border-light);
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
    min-height: 62px;
    border-radius: var(--radius-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6px;
    transition: var(--transition);
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
    background: var(--accent-soft) !important;
  }

  .react-calendar__tile.has-book:hover {
    background: var(--accent-soft) !important;
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
  }

  /* 오늘 */
  .react-calendar__tile.is-today abbr {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--accent-name);
    color: var(--text-light);
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 책 표지 */
  .tile-cover-wrapper {
    margin-top: 4px;
  }

  .tile-cover {
    width: 28px;
    height: 40px;
    border-radius: var(--radius-sm);
    object-fit: cover;
    box-shadow: var(--shadow-sm);
  }

  .tile-cover img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  .tile-badg {
    position: absolute;
    top: 6px;
    right: 6px;

    min-width: 18px;
    height: 18px;
    padding: 0 5px;

    background: var(--accent-name);
    color: #fff;

    font-size: 11px;
    font-weight: 700;

    border-radius: 999px;

    display: flex;
    align-items: center;
    justify-content: center;
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
  top: 11%;
  right: 5%;
  background: var(--accent-name);
  color: var(--text-light);
  width: 90px;
  border-radius: var(--radius-pill);
  font-size: var(--font-xs);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--accent-hover);
  }
`;

export const StyledCalendarInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-top: 1px solid var(--border-light);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  padding: var(--space-2) 0;
`;

export const StyledInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-xs);
  color: var(--text-muted);
`;

export const StyledInfoDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`;
