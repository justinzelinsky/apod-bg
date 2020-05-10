const firstApodDate = new Date('1995-05-16');
const lastApodDate = new Date();

const defaultEndDate = formatDate(lastApodDate);
const defaultStartDate = formatDate(firstApodDate);

function formatDate(date) {
  const year = date.getUTCFullYear();

  let month = (1 + date.getUTCMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getUTCDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}

function getRandomDate(startDate, endDate) {
  const start = new Date(startDate);
  if (start < firstApodDate) {
    console.error(
      `Invalid start date ${startDate} supplied. Please use a date in the format YYYY-MM-DD that is not before 1995-05-16`
    );
    return null;
  }

  const end = new Date(endDate);
  if (end > lastApodDate) {
    console.error(
      `Invalid end date ${endDate} supplied. Please use a date in the format YYYY-MM-DD that is not after today.`
    );
    return null;
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  const randomDate = formatDate(
    new Date(startTime + Math.random() * (endTime - startTime))
  );

  return randomDate;
}

module.exports = {
  defaultEndDate,
  defaultStartDate,
  formatDate,
  getRandomDate,
};
