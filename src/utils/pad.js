const pad = (strings, ...values) => {
  return strings.reduce((acc, str, index) => {
    const value =
      values[index] === undefined
        ? ""
        : values[index].toString().padStart(2, "0");
    return acc + str + value;
  }, "");
};

export default pad;
