export function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const d = new Date();

  return (today = monthNames[d.getMonth()] + ' ' + dd + ', ' + yyyy);
}

export function getCurrentTime() {
  const d = new Date();
  const h = d.getHours();
  const min = d.getMinutes();
  return h + ':' + min;
}
