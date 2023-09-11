export function calculateByeSingleElimination(players: number) {
    const nextPowerOfTwo = Math.pow(2, Math.ceil(Math.log2(players)));
    const numberOfByes = nextPowerOfTwo - players;
    return numberOfByes;
}