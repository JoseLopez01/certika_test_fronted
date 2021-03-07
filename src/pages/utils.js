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
};

export { noBlank };