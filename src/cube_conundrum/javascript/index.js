const fs = require('fs');
const input = '../cube_conundrum.txt';
const maximumColors = {
  red: 12,
  green: 4,
  blue: 9
};

function main() {
  const output = readFile();
  const sortedGamesColors = sortColorsOfGames(output);
  const gameAvailabilities = checkGameAvailabilities(sortedGamesColors, maximumColors);

  console.log(gameAvailabilities);
};

function readFile() {
  return fs.readFileSync(input, 'utf-8');
};

function sortColorsOfGames(output) {
  let sortedColorsGamesBySet = [];

  const games = output.split('\n');
  const newGamesStructure = games.map((line) => {
    const game = line.split(':');

    return {
      id: game[0],
      values: game[1].split(';')
    }
  });

  sortedColorsGamesBySet = newGamesStructure.map(game => { return { id: game.id, colors: [] }});

  newGamesStructure.map((game, index) => {
    const colorsSplitted = game.values.map(set => set.split(','));
    let totalColorsBySet = { red: 0, green: 0, blue: 0 };

    colorsSplitted.forEach(set => {
      set.forEach(color => {
        if (color.includes('red')) {
          const exctractNumber = color.split('red')[0].trim();
          totalColorsBySet.red += +exctractNumber;
        } else if (color.includes('green')) {
          const exctractNumber = color.split('green')[0].trim();
          totalColorsBySet.green += +exctractNumber;
        } else if (color.includes('blue')) {
          const exctractNumber = color.split('blue')[0].trim();
          totalColorsBySet.blue += +exctractNumber;
        }
      });
    });

    sortedColorsGamesBySet[index].colors.push(totalColorsBySet);
  });

  return sortedColorsGamesBySet;
};

function checkGameAvailabilities(games, limits) {
  let availabilities = games.map(game => { 
     return { id: game.id, available: false, colors: game.colors[0] }});

  availabilities.forEach(game => {
    if (game.colors.red > limits.red || game.colors.green > limits.green || game.colors.blue > limits.blue) {
      game.available = false
    } else {
      game.available = true;
    }
  })

return availabilities;
};

main();