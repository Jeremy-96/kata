const fs = require('fs');

function main() {
  const newCardsStructure = generateNewCardsStructure();
  const result = compareWinnerWithScratched(newCardsStructure);

  console.log({ result });
};

function generateNewCardsStructure() {
  const input= fs.readFileSync('../scratchards.txt', 'utf-8').split('\n');

  return input.map((card) => {
      const separatedLineIdAndNumbers = card.split(':'); 
      const cardId = separatedLineIdAndNumbers[0];
      const numbers = separatedLineIdAndNumbers[1].split('|');
      
      return {
        id: cardId,
        winner: numbers[0].trim(),
        scratched: numbers[1].trim()
      }
  });
};

function compareWinnerWithScratched(cards) {
 return cards.map((card, index) => {
      let matchingNumbers = [];
      let replaceValueByIndex = [];
      let points = 0

      const scratched = card.scratched
        .split(' ')
        .filter(value => value !== '');
      const winner = card.winner
        .split(' ')
        .filter(value => value !== '');

      scratched.forEach(number => {
        if (winner.includes(number)) {
          matchingNumbers.push(number);
          replaceValueByIndex = matchingNumbers.map((value, index) => index + 1);

          replaceValueByIndex.forEach(value => {
            if (value <= 2) {
              points = value;
            } else if (value > 2) {
              points = value * 2;
            }
          })
        }
      });
    

    return {
      id: card.id,
      points
    }
  });
};

main();