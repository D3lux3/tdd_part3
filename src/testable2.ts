export function diceRoll() {
    const min = 1;
    const max = 6;
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

export function diceHandValue(diceRoll: () => number) {
    const die1 = diceRoll();
    const die2 = diceRoll();
    return die1 === die2 ? 100 + die1 : Math.max(die1, die2);
}
