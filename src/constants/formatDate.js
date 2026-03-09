export const formatDate = (targetDate) => {
  if (!targetDate) return "";

  const d = new Date(targetDate);

  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
