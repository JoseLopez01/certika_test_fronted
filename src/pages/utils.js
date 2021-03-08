function noBlank(data) {
  let dataArray = Object.entries(data),
    errors = [];
  for (let field of dataArray) {
    let [name, value] = field;
    if (!value) {
      errors.push(name);
    }
  }
  return errors;
}

function isAValidDate(date) {
  return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(date);
}

function isAValidHour(hour) {
  return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(hour);
}

function isAValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function formatDate(date) {
  return date.split("T")[0];
}

function formatHour(hour) {
  const splited = hour.split(":");
  return `${splited[0]}:${splited[1]}`;
}

export { noBlank, isAValidDate, isAValidHour, isAValidEmail, formatDate, formatHour };
