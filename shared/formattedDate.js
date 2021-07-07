const getFormattedDate = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();

  month = month.length > 1 ? month : '0' + month;
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}

export default getFormattedDate