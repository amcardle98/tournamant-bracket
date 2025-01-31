function shuffle(array: Player[]) {
  var copy = [],
    n = array.length,
    i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}

function calculateByeSingleElimination(players: number) {
  const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(players)));
  const numberOfByes = nextPowerOfTwo - players;
  return numberOfByes;
}

export const tournamentUtils = {
  shuffle,
  calculateByeSingleElimination,
};
