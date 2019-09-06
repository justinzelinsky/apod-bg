const formatDate = date => {
  const year = date.getUTCFullYear();

  let month = (1 + date.getUTCMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getUTCDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return `${year}-${month}-${day}`;
};

module.exports = {
  formatDate
};
