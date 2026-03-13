export const getMonthlyDoneData = (records) => {
  const monthlyCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };

  records.forEach((record) => {
    if (record.readingStatus === "done" && record.endDate) {
      const month = new Date(record.endDate).getMonth() + 1;
      monthlyCount[month] += 1;
    }
  });

  return {
    labels: Object.keys(monthlyCount).map((month) => `${month} 월`),
    datasets: [
      {
        label: "완독 권수",
        data: Object.values(monthlyCount),
        backgroundColor: "rgba(255, 193, 7, 0.6)",
      },
    ],
  };
};
