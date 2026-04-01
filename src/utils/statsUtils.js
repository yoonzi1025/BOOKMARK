export const getBooksTotalStats = (records) => {
  return {
    total: records.length,
    done: records.filter((book) => book.readingStatus === "done").length,
    reading: records.filter((book) => book.readingStatus === "reading").length,
    want: records.filter((book) => book.readingStatus === "want").length,
    stopped: records.filter((book) => book.readingStatus === "stopped").length,
  };
};

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
    labels: Object.keys(monthlyCount).map((month) => `${month}월`),
    datasets: [
      {
        label: "완독 권수",
        data: Object.values(monthlyCount),
        backgroundColor: [
          "#f3d86f",
          "#f1d15a",
          "#ffc107",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
          "#f3d86f",
        ],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };
};

export const getReadingStatusData = (records) => {
  // 상태별 계산

  const statusCount = {
    done: 0,
    reading: 0,
    want: 0,
    stopped: 0,
  };

  records.forEach((book) => {
    const status = book.readingStatus;

    if (statusCount[status] !== undefined) {
      statusCount[status] += 1;
    }
  });

  return {
    labels: ["완독", "읽는 중", "보고싶어요", "중단"],
    datasets: [
      {
        label: "독서 상태",
        data: [
          statusCount.done,
          statusCount.reading,
          statusCount.want,
          statusCount.stopped,
        ],
        backgroundColor: [
          "#5c6ac4",
          "rgb(217, 222, 245)",
          "#eef1ff",
          "#e5e5e5",
        ],
        borderWidth: 0,
      },
    ],
  };
};

export const getMonthlyAverage = (records) => {
  // 완독만 필터
  const doneRecords = records.filter(
    (record) => record.readingStatus === "done" && record.endDate
  );

  if (doneRecords.length === 0) return 0;

  // 가장 빠른 날짜
  const firstDate = new Date(
    Math.min(...doneRecords.map((r) => new Date(r.endDate)))
  );

  // 가장 늦은 날짜
  const lastDate = new Date(
    Math.max(...doneRecords.map((r) => new Date(r.endDate)))
  );

  // 총 개월 수 계산
  const months =
    (lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
    (lastDate.getMonth() - firstDate.getMonth()) +
    1;

  if (months === 0) return doneRecords.length;

  return (doneRecords.length / months).toFixed(1);
};
