import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/testable2.ts";

describe("Untestable 2: a dice game", () => {
  test("returns 101 if dices are the same", () => {
    const fakeDiceRoll = () => 1;
    expect(diceHandValue(fakeDiceRoll)).equal(101)
  });

  test("returns bigger dice number if dice's differ", () => {
    const diceRolls = [2, 5];
    const rollDice = () => {
      return diceRolls.pop();
    }
    expect(diceHandValue(rollDice)).equal(5)
  })

  test("rolling dice is in range of 1-6", () => {
    const ROLL_AMOUNT = 1000;
    const rolls = [];
    for (let i = 0; i < ROLL_AMOUNT; i++) {
      rolls.push(diceRoll());
    }
    expect(rolls.filter((rolled) => rolled >= 1 && rolled <= 6).length).equal(rolls.length);
  })
});
