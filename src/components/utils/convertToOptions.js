const convertToOptions = (arr) => {
  const newOptions = [];
  arr.forEach((obj) => {
    newOptions.push({ value: obj._id, text: obj.title });
  });
  return newOptions;
};

export default convertToOptions;
