const fs = require("fs");
const filteredDigits = extractNumberFromString();
const total = addAllDigits();

function extractNumberFromString() {
  const formatedTextFile = fs
    .readFileSync("./trebuchet.txt", "utf-8")
    .split("\n");

  return formatedTextFile.map(string => 
    string.split('').filter(char => !Number.isNaN(+char))
  )
};

function addAllDigits() {
  const digits = filteredDigits.map(el =>
    +el[0] + el[el.length - 1]
  );

  return digits.reduce((acc, curr) => +acc + +curr, 0)
};

console.log({ total });
