const normaliseString = string => {
  const string1 = string.replace(/\n/g, "");
  const string2 = string1.replace("Results", "");
  const string3 = string2.replace(/\ /g, "-");
  let arr = [];
  let buffer = "";
  for (const character of [...string3]) {
    if (character === "-") {
      if (buffer.length) {
        arr = [...arr, buffer];
        buffer = "";
      }
      continue;
    }
    buffer = buffer + character;
  }
  return arr;
};
exports.normaliseString = normaliseString;
