// 문자열로 변환된 날짜를 구현 (API / input / DB용)
export const getStringedDate = (targetDate) => {
  if (!targetDate) return "";

  const date = new Date(targetDate);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
};

// UI 표시용
export const getDisplayDate = (targetDate) => {
  if (!targetDate) return "";

  const date = new Date(targetDate);

  if (isNaN(date)) return "";

  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
};
