const fs = require('fs');

function main() {
  const file = fs.readFileSync('./gear_ratios.txt', 'utf-8');
  const result = resolveGearRatiosSchema(file);

  console.log({ result });
};

function resolveGearRatiosSchema(input) {
  let sum = 0;
  let numberSequence = [];
  let numberToAdd = 0;
  let isSymbol = false;

  const fileInOneLine = input.split('\n').join('');
  const result = Array.from(fileInOneLine).forEach((char, index) => {
    isSymbol = char !== '.' && isNaN(char);

    if (!isNaN(char)) {
      numberSequence.push({char, index, isVerified: false});
    } else if (char == '.') {
      if (!isNaN(fileInOneLine[index - 1])) {
        numberSequence.forEach((number, i) => {
          if ((fileInOneLine[number.index + 9] !== '.' && isNaN(fileInOneLine[number.index + 9]) && fileInOneLine[number.index + 9]) || (fileInOneLine[number.index - 9] !== '.' && isNaN(fileInOneLine[number.index - 9]) && fileInOneLine[number.index - 9])) {
            number.isVerified = true;
          } else if ((fileInOneLine[number.index + 10] !== '.' && isNaN(fileInOneLine[number.index + 10]) && fileInOneLine[number.index + 10]) || (fileInOneLine[number.index - 10] !== '.' && isNaN(fileInOneLine[number.index - 10]) && fileInOneLine[number.index - 10])) {
            number.isVerified = true;
          } else if ((fileInOneLine[number.index + 11] !== '.' && isNaN(fileInOneLine[number.index + 11]) && fileInOneLine[number.index + 11]) || (fileInOneLine[number.index - 11] !== '.' && isNaN(fileInOneLine[number.index - 11]) && fileInOneLine[number.index - 11])) {
            number.isVerified = true;
          }
        });

        const isAPieceOfPuzzle = numberSequence.some(number => number.isVerified);

        if (isAPieceOfPuzzle) {
          numberToAdd = parseInt(numberSequence.map(number => number.char).join(''));
          sum += numberToAdd;
          numberSequence = [];
        }
      } else {
        numberSequence = [];
      }
    } else if (isSymbol && numberSequence.length && !isNaN(fileInOneLine[index - 1])) {
      numberToAdd = parseInt(numberSequence.map(number => number.char).join(''));
      sum += numberToAdd;
      numberSequence = [];
    }
  });

  return sum;
};

main();